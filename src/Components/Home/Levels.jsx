import React, { useState } from "react";
import { IconsImport } from "../../Utils/IconsImport";
import { Link, useParams } from "react-router-dom";

export default function Levels({ items }) {
  const { id } = useParams();
  const [LevelLocked, LevelLockedSet] = useState({
    unlocked: items.open,
    success: items.success,
  });

  return (
    <div className="w-28 h-28 sm:w-36 sm:h-36 xl:w-40 xl:h-40 grid place-items-center ">
      <Link
        to={`/quest/${id}/${items.level}`}
        className={`
          levels
          ${
            LevelLocked.unlocked ? "bg-[#c9f2e9]" : "bg-[#6b7280]"
          } grid place-items-center ${
          LevelLocked.unlocked
            ? LevelLocked.success
              ? "cursor-default pointer-events-none"
              : "cursor-pointer"
            : "cursor-default pointer-events-none "
        } `}
      >
        <div
          className={`w-2/3 h-2/3 rounded-full ${
            LevelLocked.unlocked ? "bg-[#7DE4CF]" : "bg-gray-600"
          }  grid place-items-center`}
        >
          <div
            className={`w-2/4 h-2/4 
            
            ${LevelLocked.unlocked ? "bg-white" : "bg-gray-700"}
            rounded-full grid place-items-center`}
          >
            {LevelLocked.unlocked ? (
              <p className="block  text-lg rounded-full text-[#7DE4CF]">
                {items.level}
              </p>
            ) : (
              <img src={IconsImport.IconsLocked} alt="locked" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
