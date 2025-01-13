import React from "react";
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className="bg-red-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-orange-300 text-3xl font-bold"> Quiz App</h1>

        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-teal-500 text-xl font-bold" : "text-gray-300 "
            }
          >
            Setup Quiz
          </NavLink>

          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              isActive ? "text-teal-500 text-xl font-bold " : "text-gray-300 "
            }
          >
            Quiz
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive ? "text-teal-500 text-xl font-bold " : "text-gray-300 "
            }
          >
            Leaderboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
