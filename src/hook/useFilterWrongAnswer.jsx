import { useMemo } from "react";

export function useFilterWrongAnswer({ Question, UserAnswer }) {
  const SystemFilterWrongAnswer = Question.map((items, indexLevel) => {
    if (items.level === UserAnswer[indexLevel].tingkat) {
      // Filter jawaban yang salah
      const wrongAnswer = items.dataPertanyaan.filter(
        (quest, indexJawaban) =>
          quest.jawaban !==
          UserAnswer[indexLevel].jawabanUser[indexJawaban].jawaban
      );

      // Tambahkan jawaban user ke jawaban yang salah
      const addUserAnswer = wrongAnswer.map((wrongItem) => {
        const filterAnswerUser = UserAnswer[indexLevel].jawabanUser.find(
          (answer) => wrongItem.id === answer.id
        )?.jawaban;
        return {
          ...wrongItem,
          jawabanUser: filterAnswerUser,
        };
      });

      return {
        id: items.level,
        wrongAnswer: addUserAnswer,
      };
    }

    // Kembalikan null jika level tidak cocok
    return null;
  }).filter(Boolean); // Hapus nilai null dari hasil pemetaan
  const FilterWrongAnswer = useMemo(
    () => SystemFilterWrongAnswer,
    [SystemFilterWrongAnswer]
  );

  return FilterWrongAnswer;
}
