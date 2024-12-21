import { UserCandidate } from "../../User";

export default async function Check_User({ name }) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = localStorage.getItem("user");
      if (data) {
        const BeforeUserCandidate = JSON.parse(data);
        resolve({ success: true, data: BeforeUserCandidate });
      } else {
        UserCandidate.name = name;
        UserCandidate.points = 0;
        UserCandidate.Level = [];
        localStorage.setItem("user", JSON.stringify(UserCandidate));
        resolve({ success: true, data: UserCandidate });
      }
    }, [1000]);
  });
}
