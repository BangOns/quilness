import React from "react";

export default function List_Question({
  pages,
  choices,
  choicesSet,
  thisQuest,
  index,
  disabled,
}) {
  return (
    <section className="w-full flex gap-3 items-center">
      <input
        type="radio"
        id={index}
        checked={choices === thisQuest}
        name={`thisQuest${thisQuest.id}`}
        className="p-2 w-5 h-5 cursor-pointer"
        value={thisQuest}
        disabled={disabled}
        onChange={(e) => choicesSet(e.target.value)}
      />
      <label htmlFor={index} className="text-sm cursor-pointer">
        {thisQuest}{" "}
        {pages === "rank" && choices === thisQuest ? "(jawabanmu)" : ""}
      </label>
    </section>
  );
}
