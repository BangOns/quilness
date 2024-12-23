import React from "react";
import { IconsImport } from "../Utils/IconsImport";
import { ImageImport } from "../Utils/ImageImport";
import Wrong_Answer from "../Components/Results/WrongAnswer";
import Bg_Circle_Profile from "../Components/Bg-Circle-Profile";
import { localStorageUser } from "../Utils/LocalStorage";
import { useFilterWrongAnswer } from "../hook/useFilterWrongAnswer";
import { ThisQuestions } from "../../Quest";
import TrophyCheck from "../Utils/Check_Trophy";

export default function Results() {
  const user = localStorageUser();
  const wrongQuestions = useFilterWrongAnswer({
    Question: ThisQuestions,
    UserAnswer: user.Level,
  });

  return (
    <article className="w-full h-full mt-[5rem] mb-6 flex flex-col justify-center items-center  font-alametric ">
      <section className="w-full grid place-items-center  px-3 relative ">
        <Bg_Circle_Profile pages={"rank"} />
        <div
          className="w-full sm:w-1/2 lg:w-1/3 h-full bg-white rounded-xl px-3 z-10
          rounded-t-[2rem] rounded-bl-[4rem]
          
          "
        >
          <header className="w-full flex flex-col items-center -mt-16">
            <div className="w-24 h-24 overflow-hidden rounded-full flex justify-center items-end bg-purple-500">
              <img
                src={IconsImport.IconsMen}
                alt="profile"
                className="w-24 h-24 -mb-2"
              />
            </div>
            <div className="mt-5">
              <h1 className="text-xl sm:text-3xl font-inter_bold">
                {user.name}{" "}
                <span className="font-inter font-bold text-purple-400">
                  ({user.points} Poin)
                </span>
              </h1>
            </div>
          </header>
          <section className="w-full h-3/4 flex flex-col  justify-start gap-6 items-center font-inter  rounded-2xl mt-2 p-4">
            <div className=" text-center h-1/2 flex flex-col justify-end">
              <img src={ImageImport.Trophy} alt="trophy" />
            </div>
            <div className="w-full text-center">
              <p className="text-purple-500 font-bold tracking-wider">
                {TrophyCheck(user.points)}
              </p>
            </div>
            {/* {RankUser + 1 <= 3 ? (
                <div className="w-full text-center">
                  <h3 className="font-bold ">Selamat Anda</h3>
                  <p className="text-purple-500 font-bold tracking-wider">
                    Diterima Kerja
                  </p>
                </div>
              ) : (
                <div className="w-full text-center">
                  <h3 className="font-bold ">Mohon Maaf</h3>
                  <p className="text-red-500 font-bold tracking-wider">
                    Anda Gagal Diterima
                  </p>
                </div>
              )} */}
          </section>
        </div>
      </section>
      <section className="w-full sm:w-1/2 lg:w-1/3 h-20 sm:h-14 sm:text-center p-4 my-9 bg-yellow-300 rounded-none sm:rounded-2xl">
        <p className="font-medium font-sans text-center  sm:text-sm xl:text-base ">
          Tetap Semangat jangan menyerah untuk coba lagi :){" "}
        </p>
      </section>
      <Wrong_Answer wrongQuestions={wrongQuestions} />
    </article>
  );
}
