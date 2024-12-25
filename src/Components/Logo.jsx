import React from "react";
import { IconsImport } from "../Utils/IconsImport";
import { useLocation, useParams } from "react-router-dom";

export default function Logo() {
  const { id } = useParams();

  return (
    <header className=" flex h-28 items-center justify-center gap-2  z-10">
      <img
        src={IconsImport.LogoQuilness}
        alt="logo"
        width={id ? 100 : 200}
        height={id ? 100 : 200}
      />
    </header>
  );
}
