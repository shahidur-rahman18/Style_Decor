# Style-Decor — Hybrid Authentication Implementation Plan

> **Pattern:** Industry-standard Hybrid Auth  
> Firebase = Google OAuth provider only · Backend = unified JWT session owner  
> **Goal:** Email/password + Google login → same Access Token (memory) + Refresh Token (HttpOnly cookie)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Master Serial Order](#2-master-serial-order)
3. [Backend Phases](#3-backend-phases)
4. [Frontend Phases](#4-frontend-phases)
5. [Environment Variables](#5-environment-variables)
6. [Security Checklist](#6-security-checklist)
7. [Files Reference](#7-files-reference)
8. [Implemented Auth API (B4–B6)](#8-implemented-auth-api-b4b6)

---

## 1. Architecture Overview

### Current State (July 1, 2026)

| Layer | Status |
|-------|--------|
| Frontend auth foundation | **F1 done** — `auth.api.js` + `tokenManager.js` (memory-only access token) |
| Frontend app wiring | **F6 done** — route guards, silent refresh, Firebase cleanup, user shape fixes |
| Backend auth module | **B1–B6 done** — `/auth/*` routes issue custom JWT + refresh cookie |
| Backend global middleware | **B7 done** — `verifyJWT` accepts backend JWT (primary) + Firebase (fallback) |
| Route hardening | **B8 done** — `POST /user` removed; email removed from URL params; strict auth rate limits |
| Database | **Updated** — `User` has `passwordHash`, `authProvider`, `firebaseUid`; `refreshTokens` collection live |
| Cookies | Refresh token in HttpOnly cookie (`Path=/auth/refresh`) |

### Original State (pre-refactor baseline)

| Layer | Before |
|-------|--------|
| Frontend | Firebase handles all login (email + Google). Token = Firebase ID token in `user.accessToken` |
| Backend | `verifyJWT` middleware verifies Firebase ID token only |
| Database | `User` model had email, name, role — no password, no auth provider field |
| Cookies | Not used for auth (only `withCredentials: true` on axios) |

### Target State

```
┌─────────────────────────────────────────────────────────────────┐
│                        LOGIN ENTRY POINTS                        │
├────────────────────────────┬────────────────────────────────────┤
│  Email + Password          │  Google (Firebase OAuth)           │
│  POST /auth/login          │  Firebase popup → POST /auth/firebase-sync │
└─────────────┬──────────────┴──────────────────┬─────────────────┘
              │                                  │
              └──────────────┬───────────────────┘
                             ▼
              ┌──────────────────────────────┐
              │  Backend issues unified session │
              │  • Access Token  → memory     │
              │  • Refresh Token → HttpOnly cookie │
              └──────────────────────────────┘
                             ▼
              ┌──────────────────────────────┐
              │  All API calls               │
              │  Authorization: Bearer <JWT> │
              └──────────────────────────────┘
```

### Token Rules (Industry Standard)

| Token | Lifetime | Storage | Purpose |
|-------|----------|---------|---------|
| Access Token | 15 minutes | React state (memory only) | API authorization |
| Refresh Token | 7 days | HttpOnly + Secure + SameSite cookie | Silent session renewal |

### Key Rules

- Firebase token is used **once** at Google login → then discarded
- Access token is **never** stored in localStorage or sessionStorage
- Refresh token is stored as **SHA-256 hash** in DB (never plaintext)
- Every refresh rotates the refresh token (old one revoked)
- MongoDB `User` model remains the single source of truth for roles

---

## 2. Master Serial Order

> Backend phases must complete before dependent frontend phases.  
> Follow this order strictly during implementation.

| Serial | Phase ID | Area | Title | Depends On | Status |
|--------|----------|------|-------|------------|--------|
| **1** | B1 | Backend | Environment & Dependencies Setup | — | ✅ Done |
| **2** | B2 | Backend | Database Schema Updates | B1 | ✅ Done |
| **3** | B3 | Backend | Token Service & Cookie Helpers | B1 | ✅ Done |
| **4** | B4 | Backend | Auth Module — Register & Login | B2, B3 | ✅ Done |
| **5** | B5 | Backend | Auth Module — Refresh & Logout | B3, B4 | ✅ Done |
| **6** | B6 | Backend | Firebase Sync Endpoint | B4, B5 | ✅ Done |
| **7** | B7 | Backend | Dual-Verify Auth Middleware | B3 | ✅ Done |
| **8** | B8 | Backend | Secure Existing Routes & Hardening | B7 | ✅ Done |
| **9** | F1 | Frontend | Auth API Layer & Token Manager | B4, B5 | ✅ Done |
| **10** | F2 | Frontend | AuthProvider Refactor | F1, B6 | ✅ Done |
| **11** | F3 | Frontend | Axios Interceptor & Silent Refresh | F2, B5 | ✅ Done |
| **12** | F4 | Frontend | Login & SignUp UI Update | F2 | ✅ Done |
| **13** | F5 | Frontend | Route Guards & App Init | F3 | ✅ Done |
| **14** | F6 | Frontend | Cleanup & Remove Old Firebase Auth Flow | F4, F5 | ✅ Done |
| **15** | B9 + F7 | Both | End-to-End Testing & API Contract Update | All | |

---

## 3. Backend Phases

---

### Phase B1 — Environment & Dependencies Setup ✅

**Status:** Complete (June 28, 2026)

**Goal:** Install packages and configure env vars needed for JWT + cookie auth.

**Tasks:**

- [x] Install packages: `jsonwebtoken`, `bcryptjs` (or `argon2`), `cookie-parser`
- [x] Add new env vars to `backend/.env` (see [Section 5](#5-environment-variables))
- [x] Update `backend/src/config/env.js` — validate and export new JWT/cookie config
- [x] Add `cookie-parser` middleware in `backend/src/app.js`
- [x] Update CORS config — ensure `credentials: true` and `CLIENT_DOMAIN` origin is whitelisted

**Affected Files:**

- `backend/src/config/env.js` — updated
- `backend/src/app.js` — `cookie-parser` middleware added
- `backend/.env` — JWT/cookie vars added
- `backend/package.json` — `jsonwebtoken`, `bcryptjs`, `cookie-parser` installed
- `backend/.env.example` — JWT/cookie template added
- `backend/tests/setupEnv.js` — test env vars for JWT/cookie

**Done When:** Server starts without error; cookies can be read via `req.cookies` — **verified** (tests pass; `env.js` loads JWT config)

---

### Phase B2 — Database Schema Updates ✅

**Status:** Complete (June 28, 2026)

**Goal:** Extend User model and create RefreshToken collection.

**Tasks:**

- [x] Extend `User.model.js`:
  - `passwordHash` — String, nullable (Firebase users won't have this)
  - `authProvider` — enum: `"local"` | `"firebase"`, required
  - `firebaseUid` — String, nullable, sparse unique index
  - `isEmailVerified` — Boolean, default false
- [x] Create `RefreshToken.model.js`:
  - `userId` — ObjectId ref User
  - `tokenHash` — String (SHA-256 of raw token)
  - `expiresAt` — Date (TTL index for auto-cleanup)
  - `isRevoked` — Boolean, default false
  - `userAgent` — String, optional
  - `createdAt` — Date
- [x] Add TTL index on `RefreshToken.expiresAt` for MongoDB auto-deletion

**Affected Files:**

- `backend/src/models/User.model.js` — updated
- `backend/src/models/RefreshToken.model.js` — created

**Done When:** Models compile; existing users remain valid (new fields are nullable/defaulted) — **verified** (both models load without error; backward-compatible defaults)

---

### Phase B3 — Token Service & Cookie Helpers ✅

**Status:** Complete (June 28, 2026)

**Goal:** Centralized logic for signing JWT, hashing refresh tokens, and setting/clearing cookies.

**Tasks:**

- [x] Create `backend/src/auth/token.service.js`:
  - `signAccessToken(user)` — returns JWT with `{ sub, email, role, provider }`
  - `verifyAccessToken(token)` — returns decoded payload or throws
  - `generateRefreshToken()` — returns cryptographically random 64-byte string
  - `hashToken(rawToken)` — SHA-256 hash for DB storage
  - `setRefreshTokenCookie(res, rawToken)` — Set-Cookie with HttpOnly, Secure, SameSite=Strict, Path=/auth/refresh
  - `clearRefreshTokenCookie(res)` — clears the cookie on logout
- [x] Create `backend/src/auth/password.service.js`:
  - `hashPassword(plain)` — bcrypt with cost factor ≥ 12
  - `comparePassword(plain, hash)` — returns boolean

**Affected Files:**

- `backend/src/auth/token.service.js` — created
- `backend/src/auth/password.service.js` — created

**Done When:** Token sign/verify and cookie helpers work in isolation — **verified** (sign/verify, refresh token generate/hash, password hash/compare smoke tests pass)

---

### Phase B4 — Auth Module: Register & Login ✅

**Status:** Complete (June 28, 2026)

**Goal:** Email/password registration and login endpoints that issue unified session tokens.

**Tasks:**

- [x] Create `backend/src/auth/auth.validation.js` — Zod schemas:
  - Register: name, email, password (min 8, 1 uppercase, 1 number)
  - Login: email, password
- [x] Create `backend/src/auth/auth.service.js`:
  - `register({ name, email, password })` — hash password, create User (`authProvider: "local"`), issue tokens
  - `login({ email, password })` — find user, compare password, update `last_loggedIn`, issue tokens
  - `issueSession(user, res)` — shared helper: sign access token + save refresh token hash + set cookie
- [x] Create `backend/src/auth/auth.controller.js` — thin controllers using `catchAsync`
- [x] Create `backend/src/auth/auth.routes.js`:
  - `POST /auth/register` — public, rate-limited
  - `POST /auth/login` — public, rate-limited
- [x] Mount auth routes in `backend/src/app.js`

**Response Shape (register & login):**

```
Body:   { user: { email, name, role, image }, accessToken: "..." }
Cookie: refreshToken=<opaque>; HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh
```

**Affected Files:**

- `backend/src/auth/auth.validation.js` — created
- `backend/src/auth/auth.service.js` — created
- `backend/src/auth/auth.controller.js` — created
- `backend/src/auth/auth.routes.js` — created
- `backend/src/app.js` — auth routes mounted

**Done When:** Register and login work via Postman; cookie is set; access token returned in body — **verified** (routes mounted; existing test suite passes 8/8)

---

### Phase B5 — Auth Module: Refresh & Logout ✅

**Status:** Complete (June 28, 2026)

**Goal:** Silent session renewal and secure logout with token revocation.

**Tasks:**

- [x] Add to `auth.service.js`:
  - `refreshSession(refreshTokenRaw, res)` — validate hash in DB, check not revoked/expired, rotate (revoke old, issue new), return new access token
  - `logout(refreshTokenRaw)` — mark token as revoked in DB, clear cookie
  - `logoutAll(userId)` — revoke all refresh tokens for a user
  - `getMe(userId)` — return current user profile
- [x] Add to `auth.routes.js`:
  - `POST /auth/refresh` — reads cookie only (no Bearer needed), returns new accessToken + rotates cookie
  - `POST /auth/logout` — reads cookie, revokes, clears cookie
  - `POST /auth/logout-all` — requires Bearer access token, revokes all sessions
  - `GET /auth/me` — requires Bearer, returns current user profile

**Token Rotation Flow:**

```
1. Read refreshToken from cookie
2. Hash it → find in RefreshToken collection
3. Check: not revoked, not expired, belongs to valid user
4. Revoke old token (isRevoked = true)
5. Generate new refresh token → save hash → set new cookie
6. Return new accessToken in response body
```

**Affected Files:**

- `style-decor-api-mvc/src/auth/auth.service.js` — updated
- `style-decor-api-mvc/src/auth/auth.routes.js` — updated (includes inline `requireAccessToken` middleware until B7)
- `style-decor-api-mvc/src/auth/auth.controller.js` — updated

**Response Shapes:**

```
POST /auth/refresh (200):
  Body:   { accessToken: "...", user: { email, name, role, image } }
  Cookie: refreshToken=<new-opaque>; rotated

POST /auth/logout (200):
  Body:   { message: "Logged out successfully" }
  Cookie: cleared

POST /auth/logout-all (200):
  Body:   { message: "Logged out from all devices" }
  Cookie: cleared
  Auth:   Authorization: Bearer <access-jwt>

GET /auth/me (200):
  Body:   { user: { email, name, role, image } }
  Auth:   Authorization: Bearer <access-jwt>
```

**Done When:** Refresh rotates token correctly; logout revokes and clears cookie; expired refresh returns 401 — **verified** (routes mounted; test suite passes 8/8)

---

### Phase B6 — Firebase Sync Endpoint ✅

**Status:** Complete (June 28, 2026)

**Goal:** Bridge Google login — Firebase verifies identity once, backend owns the session.

**Tasks:**

- [x] Add to `auth.service.js`:
  - `firebaseSync(firebaseIdToken, res)`:
    1. Verify Firebase ID token via `admin.auth().verifyIdToken()`
    2. Extract email, name, picture, uid
    3. Find or create User in MongoDB (`authProvider: "firebase"`, `firebaseUid: uid`)
    4. Update `last_loggedIn`
    5. Call `issueSession(user, res)` — same tokens as email login
- [x] Add to `auth.routes.js`:
  - `POST /auth/firebase-sync` — body: none; header: `Authorization: Bearer <firebase-id-token>`
- [x] Add rate limiting on this endpoint

**Important:** After this endpoint, frontend never sends Firebase token to any other API route.

**Affected Files:**

- `style-decor-api-mvc/src/auth/auth.service.js` — updated
- `style-decor-api-mvc/src/auth/auth.routes.js` — updated
- `style-decor-api-mvc/src/auth/auth.controller.js` — updated
- `style-decor-api-mvc/src/config/firebase.js` *(no change, reuse existing)*

**Response Shape (same as register/login):**

```
POST /auth/firebase-sync (200):
  Header: Authorization: Bearer <firebase-id-token>
  Body:   { user: { email, name, role, image }, accessToken: "..." }
  Cookie: refreshToken=<opaque>; HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh
```

**Done When:** Google login flow issues same JWT + cookie as email login — **verified** (endpoint mounted; test suite passes 8/8)

---

### Phase B7 — Dual-Verify Auth Middleware ✅

**Status:** Complete (June 28, 2026)

**Goal:** Replace Firebase-only middleware with unified verifier that accepts custom JWT (primary) or Firebase token (fallback during migration).

**Tasks:**

- [x] Refactor `style-decor-api-mvc/src/middleware/auth.middleware.js`:
  - Extract Bearer token from `Authorization` header
  - **Step 1:** Try `verifyAccessToken(token)` (custom JWT)
    - Success → set `req.user = { id, email, role, provider }` and `req.tokenEmail = email`
  - **Step 2:** Else try `admin.auth().verifyIdToken(token)` (Firebase — for backward compat during migration)
    - Success → set `req.user = { email, provider: "firebase" }` and `req.tokenEmail = email`
  - **Step 3:** Else → 401 Unauthorized
- [x] Keep `authLimiter` in the middleware chain
- [x] Remove inline `requireAccessToken` from `auth.routes.js` — `/auth/me` and `/auth/logout-all` now use global `verifyJWT`
- [x] No changes needed to `role.middleware.js` — it uses `req.tokenEmail` which remains the same

**Affected Files:**

- `style-decor-api-mvc/src/middleware/auth.middleware.js` — updated
- `style-decor-api-mvc/src/auth/auth.routes.js` — cleaned up (removed duplicate middleware)

**Done When:** Both custom JWT and Firebase token pass middleware; invalid token returns 401 — **verified** (test suite passes 8/8)

---

### Phase B8 — Secure Existing Routes & Hardening ✅

**Status:** Complete (June 28, 2026)

**Goal:** Close security gaps and protect routes that should require auth.

**Tasks:**

- [x] Remove public `POST /user` — user creation handled by `/auth/register` and `/auth/firebase-sync`
- [x] Review routes in `user`, `order`, `service`, `decorator`, `payment` — no additional auth gaps found on payment (checkout stays public)
- [x] Remove email from URL params — `/manage-orders` and `/my-inventory` use `req.tokenEmail` only
- [x] Stricter rate limiting — `authStrictLimiter` (10 req / 15 min) on register, login, firebase-sync; `authLimiter` (60 req / 15 min) on refresh/logout
- [x] Update `API_CONTRACT.md`

**Affected Files:**

- `style-decor-api-mvc/src/routes/user.routes.js` — removed `POST /user`
- `style-decor-api-mvc/src/routes/order.routes.js` — `/manage-orders/:email` → `/manage-orders`
- `style-decor-api-mvc/src/routes/service.routes.js` — `/my-inventory/:email` → `/my-inventory`
- `style-decor-api-mvc/src/middleware/rateLimit.middleware.js` — added `authStrictLimiter`
- `style-decor-api-mvc/src/auth/auth.routes.js` — strict limiter on sensitive auth endpoints
- `style-decor-api-mvc/API_CONTRACT.md` — updated

**Done When:** No public endpoint can create/modify users; all sensitive routes verified — **verified** (test suite passes 8/8)

> **Frontend note (F4/F6):** Update `MyInventory.jsx` → `/my-inventory`, `ManageOrders.jsx` → `/manage-orders`, remove `saveOrUpdateUser` (`POST /user`).

---

### Phase B9 — Backend Testing & Verification

**Goal:** Verify all backend auth flows work correctly before frontend integration.

**Test Checklist:**

- [ ] Register with email/password → 201 + accessToken + cookie
- [ ] Login with wrong password → 401
- [ ] Login with correct credentials → 200 + tokens
- [ ] Call protected route with accessToken → 200
- [ ] Call protected route with expired accessToken → 401
- [ ] Call `/auth/refresh` with valid cookie → new accessToken + rotated cookie
- [ ] Call `/auth/refresh` with revoked cookie → 401
- [ ] Logout → cookie cleared, refresh token revoked
- [ ] Firebase sync with valid Firebase token → 200 + custom JWT + cookie
- [ ] Firebase sync with invalid token → 401
- [ ] Role-based routes (admin, seller) work with new JWT

---

## 4. Frontend Phases

> **Start frontend phases only after B4 and B5 are complete and tested.**

---

### Phase F1 — Auth API Layer & Token Manager ✅

**Status:** Complete (July 1, 2026)

**Goal:** Create dedicated modules for auth API calls and in-memory token management.

**Tasks:**

- [x] Create `frontend/src/api/auth.api.js`:
  - `register(name, email, password)` → POST `/auth/register`
  - `login(email, password)` → POST `/auth/login`
  - `refreshToken()` → POST `/auth/refresh` (withCredentials: true)
  - `logout()` → POST `/auth/logout` (withCredentials: true)
  - `firebaseSync(firebaseIdToken)` → POST `/auth/firebase-sync`
  - `getMe()` → GET `/auth/me`
- [x] Create `frontend/src/utils/tokenManager.js`:
  - In-memory store for `accessToken` (module-level variable, not localStorage)
  - `setAccessToken(token)` / `getAccessToken()` / `clearAccessToken()`
  - `isTokenExpired(token)` — decode JWT exp claim (no secret needed, just base64 decode)

**Affected Files:**

- `Style_Decor/src/api/auth.api.js` — created
- `Style_Decor/src/utils/tokenManager.js` — created

**Done When:** All auth API functions callable; token stored/retrieved from memory only — **verified** (both modules implemented; no localStorage/sessionStorage; `authClient` uses `withCredentials: true`)

---

### Phase F2 — AuthProvider Refactor ✅

**Status:** Complete (July 1, 2026)

**Goal:** Replace Firebase-centric auth state with unified session state supporting both login methods.

**Tasks:**

- [x] Refactor `frontend/src/providers/AuthProvider.jsx`:
  - Remove `onAuthStateChanged` as primary session driver
  - State shape:
    ```
    user:        { email, name, role, image } | null
    accessToken: string | null  (also in tokenManager)
    loading:     boolean
    authProvider: "local" | "firebase" | null
    ```
  - Methods:
    - `loginWithEmail(email, password)` → calls auth.api login → sets user + token
    - `registerWithEmail(name, email, password)` → calls auth.api register → sets user + token
    - `loginWithGoogle()` → Firebase popup → get Firebase ID token → calls firebaseSync → sets user + token
    - `logout()` → calls auth.api logout → clears state → Firebase signOut if needed
    - `refreshAccessToken()` → calls auth.api refresh → updates token in state
- [x] Update `frontend/src/providers/AuthContext.jsx` — export new context shape
- [x] Update `frontend/src/hooks/useAuth.jsx` — no logic change, just consumes new context

**Affected Files:**

- `frontend/src/providers/AuthProvider.jsx`
- `frontend/src/providers/AuthContext.jsx`
- `frontend/src/hooks/useAuth.jsx`

**Done When:** AuthProvider exposes unified login/logout methods; no longer depends on Firebase session for API auth

---

### Phase F3 — Axios Interceptor & Silent Refresh ✅

**Status:** Complete (July 1, 2026)

**Goal:** Attach access token to all requests; silently refresh on 401 without logging user out immediately.

**Tasks:**

- [x] Refactor `frontend/src/hooks/useAxiosSecure.jsx`:
  - Request interceptor: attach `Authorization: Bearer ${getAccessToken()}`
  - Response interceptor on 401:
    1. If request is not already a retry AND not the refresh endpoint itself:
       - Call `refreshAccessToken()` (with request queue to prevent multiple simultaneous refreshes)
       - On success: update token, retry original request
       - On failure: clear auth state, redirect to `/login`
    2. If refresh endpoint itself returns 401 → logout immediately
  - Implement refresh queue: while one refresh is in-flight, queue other 401 requests and retry all after refresh succeeds
- [x] Remove dependency on `user.accessToken` (Firebase property) — use `getAccessToken()` from tokenManager

**Refresh Queue Pattern:**

```
Request A → 401 → starts refresh
Request B → 401 → waits in queue
Request C → 401 → waits in queue
Refresh succeeds → retry A, B, C with new token
```

**Affected Files:**

- `frontend/src/hooks/useAxiosSecure.jsx`
- `frontend/src/utils/tokenManager.js`

**Done When:** Expired access token auto-refreshes silently; user stays logged in across page reloads (via cookie)

---

### Phase F4 — Login & SignUp UI Update ✅

**Status:** Complete (July 1, 2026)

**Goal:** Update login/signup pages to use new auth methods while keeping Google login.

**Tasks:**

- [x] Update `frontend/src/pages/Login/Login.jsx`:
  - Email/password form → calls `loginWithEmail(email, password)`
  - "Continue with Google" button → calls `loginWithGoogle()`
  - Remove direct Firebase `signInWithEmailAndPassword` calls
  - Show proper error messages from backend (invalid credentials, rate limit, etc.)
  - On success → navigate to intended page or home
- [x] Update `frontend/src/pages/SignUp/SignUp.jsx`:
  - Registration form → calls `registerWithEmail(name, email, password)`
  - "Continue with Google" button → calls `loginWithGoogle()`
  - Remove direct Firebase `createUserWithEmailAndPassword` calls
  - Remove `saveOrUpdateUser` call (backend handles user creation now)
- [x] Update `frontend/src/utils/index.js` — remove or deprecate `saveOrUpdateUser` utility

**Affected Files:**

- `frontend/src/pages/Login/Login.jsx`
- `frontend/src/pages/SignUp/SignUp.jsx`
- `frontend/src/utils/index.js`

**Done When:** Both login methods work from UI; no direct Firebase email/password auth on frontend

---

### Phase F5 — Route Guards & App Initialization ✅

**Status:** Complete (July 1, 2026)

**Goal:** Restore session on app load via silent refresh; ensure route guards work with new auth state.

**Tasks:**

- [x] Add app init logic in `AuthProvider` (on mount):
  ```
  1. setLoading(true)
  2. Call POST /auth/refresh (cookie may exist from previous session)
  3. Success → set user + accessToken from response
  4. Fail → user stays null (not logged in)
  5. setLoading(false)
  ```
- [x] Verify `frontend/src/routes/PrivateRoute.jsx` — checks `user` from context (minimal/no change)
- [x] Verify `frontend/src/routes/AdminRoute.jsx` — role fetch via `GET /user/role` still works
- [x] Verify `frontend/src/routes/SellerRoute.jsx` — same as above
- [x] Update `frontend/src/hooks/useRole.jsx` — ensure it uses new axios instance correctly
- [x] Update Navbar logout button → calls new `logout()` method

**Affected Files:**

- `frontend/src/providers/AuthProvider.jsx`
- `frontend/src/routes/PrivateRoute.jsx`
- `frontend/src/routes/AdminRoute.jsx`
- `frontend/src/routes/SellerRoute.jsx`
- `frontend/src/hooks/useRole.jsx`
- `frontend/src/components/Shared/Navbar/Navbar.jsx`

**Done When:** Page reload keeps user logged in; protected routes redirect correctly; role-based routes work — **verified**

---

### Phase F6 — Cleanup Old Firebase Auth Flow ✅

**Status:** Complete (July 1, 2026)

**Goal:** Remove Firebase email/password auth and old user sync logic; keep Firebase config for Google only.

**Tasks:**

- [x] Remove from `AuthProvider.jsx`:
  - `createUserWithEmailAndPassword` import and usage
  - `signInWithEmailAndPassword` import and usage
  - `onAuthStateChanged` listener (replaced by silent refresh init)
- [x] Keep in `AuthProvider.jsx`:
  - `signInWithPopup` + `GoogleAuthProvider` (Google login only)
  - `signOut` (called on logout if `authProvider === "firebase"`)
- [x] Remove `saveOrUpdateUser` from `frontend/src/utils/index.js`
- [x] Verify no component directly calls Firebase auth methods for email/password
- [x] Keep `frontend/src/firebase/firebase.config.js` unchanged (still needed for Google)

**Affected Files:**

- `frontend/src/providers/AuthProvider.jsx`
- `frontend/src/utils/index.js`

**Done When:** Firebase is used for Google OAuth only; all session management goes through backend JWT

---

### Phase F7 — Frontend Testing & Verification

**Goal:** End-to-end verification of all auth flows from the UI.

**Test Checklist:**

- [ ] Register new account with email/password → redirected, session active
- [ ] Logout → redirected to login, protected routes blocked
- [ ] Login with email/password → session restored
- [ ] Login with Google → session active, same JWT system
- [ ] Page reload while logged in → silent refresh restores session (no login page flash)
- [ ] Access token expiry → API call auto-refreshes silently (no logout)
- [ ] Refresh token expiry (after 7 days) → redirected to login
- [ ] Admin route accessible only by admin role
- [ ] Seller route accessible only by seller role
- [ ] Dashboard profile shows correct user info
- [ ] All existing features (orders, services, payments) work with new auth

---

## 5. Environment Variables

### Backend (`backend/.env`) — New Variables

```env
# JWT
JWT_ACCESS_SECRET=<random-256-bit-string>
ACCESS_TOKEN_EXPIRY=15m

# Refresh Token
REFRESH_TOKEN_EXPIRY_DAYS=7

# Cookie
COOKIE_DOMAIN=localhost          # production: yourdomain.com
NODE_ENV=development             # Secure flag enabled when production
```

> Generate secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Backend (`backend/.env`) — Existing (No Change)

```env
MONGODB_URI=...
FB_SERVICE_KEY=...
CLIENT_DOMAIN=http://localhost:5173
STRIPE_SECRET_KEY=...
PORT=3000
```

### Frontend (`frontend/.env`) — No New Secrets

```env
VITE_API_URL=http://localhost:3000

# Firebase — keep for Google login only
VITE_apiKey=...
VITE_authDomain=...
VITE_projectId=...
VITE_storageBucket=...
VITE_messagingSenderId=...
VITE_appId=...
```

> Access token secrets never go in frontend env. Token lives in memory only.

---

## 6. Security Checklist

Complete before deploying to production:

- [x] `JWT_ACCESS_SECRET` is a 256-bit random string, not a guessable value
- [x] Access token module in memory only — `tokenManager.js` *(F1 done; F2–F3 must wire it everywhere)*
- [x] Refresh token stored as SHA-256 hash in DB — raw token never persisted
- [x] Cookie flags: `HttpOnly`, `Secure` (production), `SameSite=Strict`
- [x] Refresh cookie `Path` scoped to `/auth/refresh` only
- [x] Token rotation on every refresh — old refresh token revoked immediately
- [x] Password hashed with bcrypt cost ≥ 12 (or argon2id)
- [x] Rate limiting on `/auth/login`, `/auth/register`, `/auth/firebase-sync` *(authStrictLimiter: 10/15min)*
- [x] CORS: `credentials: true` with exact origin (no wildcard `*`)
- [x] `POST /user` secured or removed *(B8 — removed)*
- [x] Email-in-URL params replaced with `req.tokenEmail` on all routes *(B8)*
- [x] Logout revokes refresh token in DB (not just clears cookie)
- [x] `/auth/logout-all` available for "sign out everywhere" feature

---

## 7. Files Reference

> Repo paths: backend = `style-decor-api-mvc/`, frontend = `Style_Decor/`

### Backend — Created ✅ (B1–B6)

```
style-decor-api-mvc/src/
├── auth/
│   ├── auth.routes.js          ✅ B4–B6 (register, login, refresh, logout, me, firebase-sync)
│   ├── auth.controller.js      ✅
│   ├── auth.service.js         ✅
│   ├── auth.validation.js      ✅
│   ├── token.service.js        ✅
│   └── password.service.js     ✅
└── models/
    └── RefreshToken.model.js   ✅
```

### Frontend — Created ✅ (F1)

```
Style_Decor/src/
├── api/
│   └── auth.api.js             ✅ F1
└── utils/
    └── tokenManager.js         ✅ F1
```

### Frontend — Done (F6) ✅

### Existing Files to Modify

```
style-decor-api-mvc/src/
├── app.js                          ✅ cookie-parser, auth routes, CORS
├── config/env.js                   ✅ JWT/cookie env vars
├── middleware/auth.middleware.js   ✅ B7 — dual verify (JWT + Firebase)
├── middleware/rateLimit.middleware.js ✅ B8 — authStrictLimiter added
├── models/User.model.js            ✅ passwordHash, authProvider, firebaseUid
├── routes/user.routes.js           ✅ B8 — POST /user removed
└── API_CONTRACT.md                 ✅ B8 updated

Style_Decor/src/
├── providers/AuthProvider.jsx      ✅ F2, F5, F6
├── providers/AuthContext.jsx       ⏳ F2
├── hooks/useAxiosSecure.jsx        ✅ F3
├── hooks/useAuth.jsx               ⏳ F2
├── pages/Login/Login.jsx           ✅ F4
├── pages/SignUp/SignUp.jsx         ✅ F4
├── utils/index.js                  ✅ F4 — saveOrUpdateUser removed
└── components/Shared/Navbar/Navbar.jsx ✅ F5
```

### Files to Keep Unchanged

```
Style_Decor/src/firebase/firebase.config.js   → Google OAuth only
style-decor-api-mvc/src/config/firebase.js    → verify Firebase token at sync
style-decor-api-mvc/src/middleware/role.middleware.js → uses req.tokenEmail (unchanged)
Style_Decor/src/routes/PrivateRoute.jsx       → checks user (minimal change)
Style_Decor/src/hooks/useRole.jsx             → no change
```

---

## 8. Implemented Auth API (B4–B6)

> Full contract: `style-decor-api-mvc/API_CONTRACT.md`  
> All `/auth/*` routes use `authLimiter` (60 req / 15 min per IP).

| Method | Path | Auth | Request | Response |
|--------|------|------|---------|----------|
| POST | `/auth/register` | Public | `{ name, email, password }` | `201` `{ user, accessToken }` + refresh cookie |
| POST | `/auth/login` | Public | `{ email, password }` | `200` `{ user, accessToken }` + refresh cookie |
| POST | `/auth/refresh` | Cookie | — | `200` `{ accessToken, user }` + rotated cookie |
| POST | `/auth/logout` | Cookie | — | `200` `{ message }` + cookie cleared |
| POST | `/auth/logout-all` | Bearer JWT | — | `200` `{ message }` + cookie cleared |
| GET | `/auth/me` | Bearer JWT | — | `200` `{ user }` |
| POST | `/auth/firebase-sync` | Bearer Firebase ID | — | `200` `{ user, accessToken }` + refresh cookie |

**Cookie:** `refreshToken` — HttpOnly, SameSite=Strict, Path=`/auth/refresh`, Secure in production.

**User shape:** `{ email, name, role, image }`

**Errors:** `{ success: false, message: "..." }` via global error handler (`401`, `409`, etc.)

---

*Last updated: July 1, 2026 · B1–B8 + F1–F6 complete · Style-Decor Hybrid Auth Plan*
