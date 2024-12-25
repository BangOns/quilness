/**
 * @param {number} step //step of question
 * @param {string} choices //choices of question
 * @param {boolean} submitmodals //submit modals
 * @param {boolean} errorStep //error step
 * @param {array} allAnswer //Seluruh jawaban user yang telah dijawab per level
 */

import { ThisQuestions } from "../../Quest";
import {
  localStorageRemoveUser,
  localStorageSetUser,
  localStorageUser,
} from "./LocalStorage";

export const initialState = {
  step: 0,
  choices: "",
  ShowSubmitmodals: false,
  errorStep: false,
  allAnswer: [],
};

export function reducerQuestion(state, action) {
  switch (action.type) {
    case "NextStep":
      return { ...state, step: state.step + 1, errorStep: false, choices: "" };
    case "PrevStep":
      return { ...state, step: state.step - 1, errorStep: false, choices: "" };
    case "Setchoices":
      return { ...state, choices: action.payload };
    case "ShowSubmitmodals":
      return { ...state, ShowSubmitmodals: action.payload };
    case "errorStep":
      return { ...state, errorStep: action.payload };
    case "allAnswer":
      return { ...state, allAnswer: action.payload };
    default:
      return state;
  }
}

export function PushAnswer({ allAnswer, step, choices }) {
  const checkAnswerByIndex = allAnswer.findIndex(
    (answer) => answer.id === step + 1
  );
  if (checkAnswerByIndex !== -1) {
    const updatedAnswers = [...allAnswer];
    updatedAnswers[checkAnswerByIndex].jawaban = choices;
    return updatedAnswers;
  } else {
    return [...allAnswer, { id: step + 1, jawaban: choices }];
  }
}

export function NextLevelAndAddAnswerUser({ questId, UserData, navigate, id }) {
  const GetIndexQuestion = ThisQuestions.findIndex(
    (items) => items.level === parseInt(questId)
  );
  console.log(UserData);

  if (GetIndexQuestion !== -1) {
    UserData.Level[GetIndexQuestion].success = true;
    if (GetIndexQuestion < ThisQuestions.length - 1) {
      const nextLevel = {
        tingkat: ThisQuestions[GetIndexQuestion + 1].level,
        open: true,
        success: false,
        jawabanUser: [],
      };
      UserData.Level = [...UserData.Level, nextLevel];
    }
    localStorageSetUser(UserData);
    if (GetIndexQuestion < ThisQuestions.length - 1) {
      navigate(`/home/${id}`);
    } else if (GetIndexQuestion >= ThisQuestions.length - 1) {
      navigate(`/home/${id}/results`);
    }
  }
}

export function PrivateQuestions({ questid, id, navigate }) {
  const getUser = localStorageUser();
  const privateLevel =
    parseInt(questid) > ThisQuestions.length || parseInt(questid) < 1
      ? false
      : getUser.Level?.find((item) => item.tingkat === parseInt(questid));

  if (!privateLevel || (privateLevel.open && privateLevel.success)) {
    navigate(`/home/${id}`);
  }
  if (getUser.name !== id) {
    navigate(`/`);
    localStorageRemoveUser();
  }
}
