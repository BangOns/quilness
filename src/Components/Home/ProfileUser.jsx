import React from "react";
import { IconsImport } from "../../Utils/IconsImport";

export default function ProfileUser({ users }) {
  return (
    <header className="w-full flex flex-col items-center -mt-16">
      <div
        className={`w-24 h-24 overflow-hidden rounded-full flex justify-center items-end bg-purple-500
        `}
      >
        <img
          src={IconsImport.IconsMen}
          alt="profile"
          className="w-24 h-24 -mb-2"
        />
      </div>
      <div className="mt-5">
        <h1 className="text-xl sm:text-3xl font-inter font-bold">
          {users.name}{" "}
        </h1>
      </div>
    </header>
  );
}
