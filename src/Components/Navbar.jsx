import React, { useState } from "react";
import Logo from "./Logo";
import { IconsImport } from "../Utils/IconsImport";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modals_Alert from "./Modals/Modals_Alert";
import { localStorageRemoveUser } from "../Utils/LocalStorage";

export default function Navbar() {
  const { id } = useParams();
  const [modalsSignOut, modalsSignOutSet] = useState(false);

  const locationIndex = useLocation().pathname.split("/");
  const activeLocation =
    useLocation().pathname.split("/")[locationIndex.length - 1];
  const navigate = useNavigate();
  function handleModals() {
    modalsSignOutSet(true);
  }
  function handleSignOutWithModals() {
    modalsSignOutSet(false);
    localStorageRemoveUser();
    navigate(`/`);
  }
  return (
    <>
      <nav className="w-full font-alametric flex justify-between items-center px-4 ">
        <Logo />
        <div className="flex gap-5 items-center  z-30 sm:items-end">
          <Link
            to={`/home/${id}`}
            className={`text-lg font-poppins  ${
              activeLocation === id ? "text-cyan-500" : "text-white"
            } hover:text-cyan-500 max-sm:text-sm cursor-pointer`}
          >
            Home
          </Link>

          <img
            src={IconsImport.IconsOut}
            alt="out"
            className="w-9 h-9 cursor-pointer"
            onClick={handleModals}
          />
        </div>
      </nav>
      {modalsSignOut && (
        <Modals_Alert
          pages={"signout"}
          handleCloseModals={modalsSignOutSet}
          handleClickDone={handleSignOutWithModals}
        />
      )}
    </>
  );
}
