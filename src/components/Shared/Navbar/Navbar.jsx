import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {  useState } from "react";
import { Link, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/coverage", label: "Coverage" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user)
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  

  // ${isSticky ? 'fixed top-0 left-0 right-0 z-100 shadow-lg' : ''}

  return (
    <div className={`fixed top-0 w-full bg-base-300 glass-card border-0 shadow-sm transition-all duration-300 z-50`}>
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-charcoal">
                    S
                  </span>
                </div>
                <span className="font-display text-xl font-semibold">
                  StyleDecor
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition relative ${
                    location.pathname === link.href ? 'text-primary' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {link.label}

                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">

                {/* AUTH BUTTONS → Only on large screens */}
                {!user && (
                  <div className="hidden md:flex items-center gap-3">
                    <Link to="/login" className="btn btn-primary rounded-xl">
                      Login
                    </Link>
                    <Link to="/signup" className="btn btn-primary rounded-xl">
                      Get Start
                    </Link>
                  </div>
                )}

                {/* MENU ICON → For small & md screens */}
                {!user && (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex md:hidden p-3 border border-neutral-300 rounded-full cursor-pointer"
                  >
                    <AiOutlineMenu />
                  </div>
                )}

                {/* User avatar dropdown (only when logged in) */}
                {user && (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                  >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                      <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user.photoURL || avatarImg}
                        alt="profile"
                        height="30"
                        width="30"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* DROPDOWN MENU */}
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col cursor-pointer"
                  >
                    {/* Mobile Navigation */}
                    <div className="block md:hidden">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold block"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {/* Logged-in Items */}
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>

                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Get Start
                        </Link>
                      </>
                    )}
                  </motion.div>
                </div>
              )}

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
