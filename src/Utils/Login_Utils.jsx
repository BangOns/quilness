import { ThisQuestions } from "../../Quest";
import { localStorageSetUser, localStorageUser } from "./LocalStorage";

export async function Check_User({ name }) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = localStorageUser();
      if (data) {
        resolve({ success: true, data });
      } else {
        const UserCandidate = {
          name,
          points: 0,
          Level: [],
        };
        localStorageSetUser(UserCandidate);
        resolve({ success: true, data: UserCandidate });
      }
    }, [1000]);
  });
}

export function CreateInitialLevel(validate) {
  const Level1 = {
    tingkat: 1,
    open: true,
    success: false,
    jawabanUser: [],
  };
  validate.data.Level = [Level1];
  localStorageSetUser(validate.data);
  for (let i in ThisQuestions) {
    if (i > 0) {
      ThisQuestions[i].open = false;
      ThisQuestions[i].success = false;
    } else {
      ThisQuestions[i].open = true;
      ThisQuestions[i].success = false;
    }
  }
}
