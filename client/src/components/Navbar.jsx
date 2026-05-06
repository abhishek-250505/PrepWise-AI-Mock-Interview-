import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
function Navbar({ onShowAuth }) {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("prepwise-auth");
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sticky top-0 z-[120] bg-white glassmorphism border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-900">PrepWise AI</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button
            onClick={() => {
              if (!userData) {
                onShowAuth();
                return;
              }
              setShowCreditPopup(!showCreditPopup);
              setShowUserPopup(false);
            }}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-all duration-200 shadow-soft sm:px-4"
          >
            <BsCoin size={18} className="text-yellow-500" />
            <span className="hidden sm:inline">{userData?.credits || 0} Credits</span>
            <span className="sm:hidden">{userData?.credits || 0}</span>
          </button>

          {showCreditPopup && (
            <div
              className="absolute right-0 mt-3 w-64 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white p-5 shadow-xl z-[130]"
            >
              <p className="text-sm text-gray-600 mb-4">
                Need more credits to continue interviews?
              </p>
              <button
                onClick={() => navigate("/pricing")}
                className="w-full bg-gradient-primary text-white py-2 rounded-lg text-sm hover:shadow-soft transition-all duration-200"
              >
                Buy more credits
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              if (!userData) {
                onShowAuth();
                return;
              }
              setShowUserPopup(!showUserPopup);
              setShowCreditPopup(false);
            }}
            className="w-10 h-10 bg-gradient-primary text-white rounded-full flex items-center justify-center font-semibold hover:shadow-soft transition-all duration-200"
          >
            {userData ? (
              userData?.name.slice(0, 1).toUpperCase()
            ) : (
              <FaUserAstronaut size={16} />
            )}
          </button>

          {showUserPopup && (
            <div
              className="absolute right-0 mt-3 w-56 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white p-4 shadow-xl z-[130]"
            >
              <p className="mb-3 border-b border-gray-100 pb-3 text-sm font-bold text-primary-500">
                {userData?.name}
              </p>
              <button
                onClick={() => {
                  setShowUserPopup(false);
                  navigate("/history");
                }}
                className="w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary-500"
              >
                Interview History
              </button>
              <button
                onClick={() => {
                  setShowUserPopup(false);
                  navigate("/about");
                }}
                className="w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary-500"
              >
                About Project
              </button>
              <button
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <HiOutlineLogout size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
