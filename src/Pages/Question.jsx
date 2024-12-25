import React, { useEffect, useReducer } from "react";
import List_Question from "../Components/Quest/List_Question";
import { useNavigate, useParams } from "react-router-dom";
import { ThisQuestions } from "../../Quest";
import cekJawabanDanHitungSkor from "../Utils/Sum_Point";
import PostPoint_User from "../Utils/PostPoint_User";
import Modals_Alert from "../Components/Modals/Modals_Alert";

import {
  initialState,
  NextLevelAndAddAnswerUser,
  PrivateQuestions,
  PushAnswer,
  reducerQuestion,
} from "../Utils/Question_Utils";

export default function Question() {
  const [state, dispatch] = useReducer(reducerQuestion, initialState); // method untuk menampung jawaban user
  const { id, questid } = useParams();
  const navigate = useNavigate();

  const QuestionLevel = ThisQuestions.find(
    (items) => items.level === parseInt(questid)
  );

  function handleNextStep(e) {
    e.preventDefault();
    // Jika Jawaban Kosong
    if (state.choices === "") {
      dispatch({ type: "errorStep", payload: true });
      return;
    }
    // Menambahkan Jawaban ke dalam state allAnswer
    const UpdateDataJawaban = PushAnswer({
      allAnswer: state.allAnswer,
      step: state.step,
      choices: state.choices,
    });

    dispatch({ type: "allAnswer", payload: UpdateDataJawaban });

    //  validasi jika step sudah selesai dikerjakan
    if (state.step < QuestionLevel.dataPertanyaan.length - 1) {
      dispatch({ type: "NextStep" });
    } else {
      dispatch({ type: "ShowSubmitmodals", payload: true });
    }
  }

  // Kembali ke step sebelumnya
  function handlePrevStep() {
    dispatch({ type: "errorStep", payload: false });
    if (state.step >= 1) {
      dispatch({ type: "PrevStep" });
    } else {
      navigate(`/home/${id}`);
    }
  }

  async function handleSubmitWithModals() {
    // CeK Jawaban dan Hitung Skor User
    let TotalSkor = await cekJawabanDanHitungSkor(
      state.allAnswer,
      QuestionLevel.dataPertanyaan
    );
    // Menambahkan Skor User ke dalam data user
    const UserData = PostPoint_User({ TotalSkor, questid });
    // Pindah ke level selanjutnya
    NextLevelAndAddAnswerUser({ questId: questid, UserData, navigate, id });
  }

  // Mengambil jawaban sebelumnya jika ada
  useEffect(() => {
    const getAnswerPrev = state.allAnswer.find(
      (items) => items.id === state.step + 1
    );
    dispatch({
      type: "Setchoices",
      payload: getAnswerPrev ? getAnswerPrev.jawaban : "",
    });
  }, [state.step]);

  // Privacy untuk Question setiap step nya
  useEffect(() => {
    PrivateQuestions({ questid, id, navigate });
  }, [id, questid, navigate]);
  return (
    <>
      <main className="w-full h-screen bg-[#EFEBF9] max-sm:text-sm flex items-center font-poppins justify-center px-4">
        <article className="w-full sm:w-3/4 lg:w-1/3 h-3/4 flex flex-col justify-start gap-10 ">
          <section className="w-full h-1/5 bg-white rounded-xl">
            <div className="w-full h-1/6 bg-purple-700 rounded-t-xl"></div>
            <header className="w-full px-4 py-3 ">
              <h1 className="font-bold mb-2">Tema {questid}</h1>
              <p className=" text-red-500 text-xs">
                * Menunjukkan Pertanyaan yang wajib di isi
              </p>
            </header>
          </section>
          <section className=" h-auto">
            <div className="w-full h-auto pb-4  bg-white rounded-xl">
              <header className="w-full h-10 bg-purple-700 rounded-t-xl px-4 text-white flex items-center  ">
                <h2>
                  {state.step + 1}/{QuestionLevel?.dataPertanyaan.length}
                </h2>
              </header>
              <section className="px-4 py-3 w-full ">
                <header className="w-full flex justify-between">
                  <p className="text-sm w-4/5">
                    {QuestionLevel?.dataPertanyaan[state.step].pertanyaan}{" "}
                    <span className="text-red-500">*</span>
                  </p>
                  <p className="text-slate-400 text-xs w-auto   flex items-center">
                    50 poin
                  </p>
                </header>
                <article className="w-full flex flex-col mt-3 gap-5">
                  {QuestionLevel?.dataPertanyaan[state.step].pilihan.map(
                    (items, index) => (
                      <List_Question
                        pages={"quest"}
                        choices={state.choices}
                        choicesSet={(value) =>
                          dispatch({ type: "Setchoices", payload: value })
                        }
                        id={questid}
                        key={index}
                        index={index}
                        disabled={false}
                        thisQuest={items}
                      />
                    )
                  )}
                </article>
              </section>
              {state.errorStep && (
                <p className="px-4 text-red-500 text-sm">
                  Mohon Di isi terlebih dahulu
                </p>
              )}
            </div>
            <div className="w-full flex justify-center gap-4 mt-5 ">
              <button
                type="button"
                className="w-full py-3 bg-white text-purple-500 font-bold rounded-md shadow-md hover:shadow-xl transition-all"
                onClick={handlePrevStep}
              >
                Kembali
              </button>
              <button
                className="w-full py-3 bg-white text-purple-500 font-bold rounded-md shadow-md hover:shadow-xl transition-all"
                onClick={handleNextStep}
              >
                Selanjutnya
              </button>
            </div>
          </section>
        </article>
      </main>
      {state.ShowSubmitmodals && (
        <Modals_Alert
          pages={"question"}
          handleCloseModals={() =>
            dispatch({ type: "ShowSubmitmodals", payload: false })
          }
          handleClickDone={handleSubmitWithModals}
        />
      )}
    </>
  );
}
