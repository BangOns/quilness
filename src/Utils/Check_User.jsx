import { UserCandidate } from "../../User";

export default async function Check_User({ name, code }) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      UserCandidate = {
        name: name,
        points: 0,
      };

      if (checkUser) {
        resolve({ success: true, data: checkUser });
      } else {
        reject({ success: false });
      }
    }, [1000]);
  });
}
