import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { MdLogout } from "react-icons/md";
import { dropDownFadeInOut } from "../animations";

const Header = () => {
  const { userData, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full flex items-center justify-center py-4">
      <div className="w-full md:w-3/4 p-3 bg-gray-100 rounded-lg flex items-center justify-between">
        <p>GeeksForGeeks</p>
        <div className="flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full relative cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={userData?.photoURL}
              className="w-full h-full object-cover rounded-full"
              alt=""
              referrerPolicy="no-referrer"
            />

            {/* drop down box */}
            <AnimatePresence>
              {open && (
                <motion.div
                  {...dropDownFadeInOut}
                  onMouseLeave={() => setOpen(false)}
                  className="w-72 rounded-md bg-white shadow-md p-4 absolute top-14 right-0 flex items-center flex-col justify-center gap-4"
                >
                  <div className="text-center">
                    <h2 className="text-xl text-gray-600">
                      {userData?.displayName}
                    </h2>
                    <p className="text-base text-gray-400">{userData?.email}</p>
                  </div>

                  {/* routes */}

                  <div
                    onClick={logOut}
                    className="flex items-center w-full justify-center gap-2 bg-gray-50 hover:bg-gray-100 hover:shadow-md p-2"
                  >
                    <MdLogout />
                    Logout
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
