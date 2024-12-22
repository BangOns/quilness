import { localStorageSetUser, localStorageUser } from "./LocalStorage";

export default function PostPoint_User(data) {
  const GetUserByLocalStorage = localStorageUser();
  const getIndexLevel = GetUserByLocalStorage.Level.findIndex(
    (item) => item.tingkat === parseInt(data.questid)
  );
  GetUserByLocalStorage.Level[getIndexLevel].jawabanUser = [
    ...data.TotalSkor.jawabanUser,
  ];
  GetUserByLocalStorage.points += data.TotalSkor.nilai;
  return GetUserByLocalStorage;
}
