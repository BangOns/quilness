import React from "react";

import Levels from "../Components/Home/Levels";
import Navbar from "../Components/Navbar";
import ProfileUser from "../Components/Home/ProfileUser";
import { ThisQuestions } from "../../Quest";
import Bg_Circle_Profile from "../Components/Bg-Circle-Profile";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const updatedQuestions = ThisQuestions.map((items, i) => {
    if (user.Level && user.Level[i]) {
      return {
        ...items,
        open: user.Level[i].open,
        success: user.Level[i].success,
      };
    }
    return items;
  });

  return (
    <>
      <Navbar />
      <article className="w-full h-[calc(100vh-5rem)] flex justify-center items-center max-sm:px-4 font-alametric">
        <Bg_Circle_Profile pages={"home"} />
        <section className="w-full sm:w-1/2 lg:w-1/3 h-3/4 px-3 bg-white rounded-t-[2rem] rounded-bl-[4rem] rounded-br-none z-10">
          <ProfileUser users={user ? user : ""} />
          <section className="w-full h-auto  flex justify-center gap-4 items-center flex-wrap">
            {updatedQuestions.map((items, i) => (
              <Levels key={i} items={items} />
            ))}
          </section>
        </section>
      </article>
    </>
  );
}
