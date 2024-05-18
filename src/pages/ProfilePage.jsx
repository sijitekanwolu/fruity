import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { CiLogout } from "react-icons/ci";
import { BiBold } from "react-icons/bi";

const ProfilePage = () => {
  const { user, logout, userName, role } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    setDarkMode(currentTheme === "light");
    document.body.setAttribute("data-theme", currentTheme);
  }, []);

  const handleToggle = () => {
    const newTheme = darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setTimeOfDay("GOOD MORNING!!");
    } else if (currentTime >= 12 && currentTime < 15) {
      setTimeOfDay("GOOD AFTERNOON!!");
    } else if (currentTime >= 15 && currentTime < 21) {
      setTimeOfDay("GOOD AFTERNOON!!");
    } else {
      setTimeOfDay("GOOD NIGHT!!");
    }
  }, []);

  return (
    <>
      {role === "admin" ? (
        <>
          <div className="flex flex-col bg-profile h-screen">
            <div className="flex p-5">
              <Link to={"/"}>
                <button className="btn btn-square btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <div className="card w-96 backdrop-blur-sm shadow-xl border mt-14">
                <div className="flex justify-between m-2">
                  <button className="btn btn-outline">
                    <label className="swap swap-rotate">
                      {/* this hidden checkbox controls the state */}
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={handleToggle}
                      />

                      {/* sun icon */}
                      <svg
                        className="swap-on fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>

                      {/* moon icon */}
                      <svg
                        className="swap-off fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>
                    </label>
                  </button>
                  <button
                    className="btn btn-outline btn-error tooltip tooltip-bottom"
                    data-tip="Logout"
                  >
                    <CiLogout size={20} color="FE0000" />
                  </button>
                </div>
                <figure className="px-10 pt-10 ">
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxr_FyexDzwaI1UhVhiXDm2Fd4IyVVwbRJw&usqp=CAU"
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h4 className="text-xs text-white">{timeOfDay}</h4>
                  <div className="flex">
                    <h2 className="card-title text-2xl text-white">
                      {userName}
                    </h2>
                  </div>

                  <p className="text-sm -mt-2 text-white">Admin</p>
                  <div className="card-actions mt-5">
                    <Link to={"/admin"}>
                      <button className="btn btn-outline btn-secondary">
                        Admin
                      </button>
                    </Link>

                    <Link to={"/histori"}>
                      <button className="btn btn-outline btn-info">
                        History
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col bg-profile h-screen">
            <div className="flex p-5">
              <Link to={"/"}>
                <button className="btn btn-square btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <div className="card w-96 backdrop-blur-sm shadow-xl border mt-14">
                <div className="flex justify-end m-2">
                  <button className="btn btn-outline">
                    <label className="swap swap-rotate">
                      {/* this hidden checkbox controls the state */}
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={handleToggle}
                      />

                      {/* sun icon */}
                      <svg
                        className="swap-on fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>

                      {/* moon icon */}
                      <svg
                        className="swap-off fill-current h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>
                    </label>
                  </button>
                  <button
                    className="btn btn-outline btn-error tooltip tooltip-bottom"
                    data-tip="Logout"
                  >
                    <CiLogout size={20} color="FE0000" />
                  </button>
                </div>
                <figure className="px-10 pt-10 ">
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxr_FyexDzwaI1UhVhiXDm2Fd4IyVVwbRJw&usqp=CAU"
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="text-lg text-white">{timeOfDay}</h2>
                  <h2 className="card-title  text-white">{userName}</h2>
                  <Link to={"/histori"}>
                    <button className="btn btn-outline btn-info">
                      History
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
