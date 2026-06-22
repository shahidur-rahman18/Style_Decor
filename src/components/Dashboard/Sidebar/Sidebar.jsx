import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import Analytics from "../Statistics/Analytics";
import CommonMenu from "./Menu/CommonMenu";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  if (isRoleLoading) return <LoadingSpinner />;
  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className="bg-base-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src='/frontend/public/logo-styledecor.png' alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-100 shadow-2xl w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-base-100 mx-auto">
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
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
              <CommonMenu></CommonMenu>
              <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
              />

              {/* Role-Based Menu */}

              {/* Role-Based Menu */}
              {role === "customer" && <CustomerMenu />}
              {role === "seller" && <SellerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-[#F3EDE2]  hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5 text-red-500" />

              <span className="mx-4 font-medium text-red-500">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
