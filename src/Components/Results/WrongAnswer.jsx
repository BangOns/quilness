import React from "react";
import { Link } from "react-router-dom";
import List_Question from "../Quest/List_Question";

export default function Wrong_Answer({ wrongQuestions }) {
  return (
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
                <h3>Pertanyaan Tema {item.id}</h3>
                {item.wrongAnswer.map((data, index) => (
                  <article
                    className="bg-purple-600 shadow-lg p-3 space-y-2 text-white rounded-md"
                    key={index}
                  >
                    <p className="">
                      {data.pertanyaan} {data.jawaban}
                    </p>
                    <article className="w-full flex flex-col mt-3 gap-5">
                      {data.pilihan.map((pilihan, index) => (
                        <List_Question
                          pages={"rank"}
                          choices={data.jawabanUser}
                          level={item.level}
                          key={index}
                          index={index}
                          disabled={true}
                          thisQuest={pilihan}
                        />
                      ))}
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
  );
}
