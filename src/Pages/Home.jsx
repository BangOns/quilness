import React from "react";

import Levels from "../Components/Home/Levels";
import ProfileUser from "../Components/Home/ProfileUser";
import { ThisQuestions } from "../../Quest";
import Bg_Circle_Profile from "../Components/Bg-Circle-Profile";
import { localStorageUser } from "../Utils/LocalStorage";

// Fungsi didefinisikan untuk mengambil data question yang telah diselesaikan / update
function getUpdateQuestion(user) {
  return ThisQuestions.map((items, i) => {
    if (user.Level && user.Level[i]) {
      return {
        ...items,
        open: user.Level[i].open,
        success: user.Level[i].success,
      };
    }
    return items;
  });
}
export default function Home() {
  const user = localStorageUser();

  const updatedQuestions = getUpdateQuestion(user);

  return (
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
  );
}
