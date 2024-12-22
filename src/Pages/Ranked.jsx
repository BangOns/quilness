import React, { Fragment } from "react";
import Navbar from "../Components/Navbar";
import { IconsImport } from "../Utils/IconsImport";
import { ImageImport } from "../Utils/ImageImport";
import Wrong_Answer from "../Components/Ranked/WrongAnswer";
import { Link, useParams } from "react-router-dom";
import Bg_Circle_Profile from "../Components/Bg-Circle-Profile";
import { localStorageUser } from "../Utils/LocalStorage";
import { useFilterWrongAnswer } from "../hook/useFilterWrongAnswer";
import { ThisQuestions } from "../../Quest";
import List_Question from "../Components/Quest/List_Question";

export default function Ranked() {
  const { id } = useParams();
  const user = localStorageUser();
  const wrongQuestions = useFilterWrongAnswer({
    Question: ThisQuestions,
    UserAnswer: user.Level,
  });

  return (
    <>
      <Navbar />
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
        <section className="w-full sm:w-1/2 lg:w-1/3 h-full px-3 ">
          <article className="w-full flex justify-between items-center">
            <p className="font-medium font-sans w-full text-white  text-sm sm:text-base">
              Wrong Answer
            </p>
            <div className="w-full flex gap-2 items-center justify-end">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-3 h-3 bg-white rounded-full border border-white"
                ></div>
              ))}
            </div>
          </article>
          <article className="w-full p-3 bg-white rounded-md flex flex-col gap-4 mt-2 font-poppins font-semibold">
            {wrongQuestions.every((item) => !item.wrongAnswer.length) ? (
              <p className="text-center">Keren Kamu Benar Semua</p>
            ) : (
              <>
                {wrongQuestions.map((item, index) => (
                  <section className="w-full px-5  space-y-2" key={index}>
                    <h3>Pertanyaan Tingkat SD</h3>
                    {item.wrongAnswer.map((data, index) => (
                      <article
                        className="bg-purple-600 shadow-lg p-3 space-y-2 text-white rounded-md"
                        key={index}
                      >
                        <p className="">
                          {data.pertanyaan} {data.jawaban}
                        </p>
                        <article className="w-full flex flex-col mt-3 gap-5">
                          {/* {item.pilihan.map((data, index) => (
            <List_Question
              choices={item.jawabanPlayer}
              level={item.level}
              key={index}
              index={index}
              disabled={true}
              thisQuest={data}
            />
          ))} */}
                        </article>
                        <section className="w-full space-y-2">
                          <p>
                            Penjelasan : <br /> {data.penjelasan}
                          </p>
                          <p>
                            Link :{" "}
                            <Link to={"/"} className="text-sky-300 underline">
                              Link terkait
                            </Link>
                          </p>
                        </section>
                      </article>
                    ))}
                  </section>
                ))}
              </>
            )}
          </article>
        </section>
      </article>
    </>
  );
}
