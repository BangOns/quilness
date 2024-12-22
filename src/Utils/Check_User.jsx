import { UserCandidate } from "../../User";
import { localStorageSetUser, localStorageUser } from "./LocalStorage";

export default async function Check_User({ name }) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = localStorageUser();
      if (data) {
        const BeforeUserCandidate = JSON.parse(data);
        resolve({ success: true, data: BeforeUserCandidate });
      } else {
        UserCandidate.name = name;
        UserCandidate.points = 0;
        UserCandidate.Level = [];
        localStorageSetUser(UserCandidate);
        resolve({ success: true, data: UserCandidate });
      }
    }, [1000]);
  });
}
