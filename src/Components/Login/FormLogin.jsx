import React, { useEffect, useState } from "react";
import { Check_User, CreateInitialLevel } from "../../Utils/Login_Utils";
import { useNavigate } from "react-router-dom";
import { ThisQuestions } from "../../../Quest";
import {
  localStorageSetUser,
  localStorageUser,
} from "../../Utils/LocalStorage";

export default function FormLogin() {
  const navigate = useNavigate();
  const [errorValidate, errorValidateSet] = useState(false);
  const [loadData, loadDataSet] = useState(false);
  const [userData, userDataSet] = useState({
    name: "",
  });
  function handelChange(e) {
    const { name, value } = e.target;
    userDataSet({ ...userData, [name]: value });
    errorValidateSet(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name } = userData;
    loadDataSet(true);
    const validate = await Check_User({ name });
    try {
      if (validate.success) {
        CreateInitialLevel(validate);
        navigate(`/home/${validate.data.name}`);
        errorValidateSet(false);
      } else {
        errorValidateSet(true);
      }
    } catch (error) {
      errorValidateSet(true);
    } finally {
      loadDataSet(false);
    }
  }
  useEffect(() => {
    const data = localStorageUser();
    if (data) {
      navigate(`/home/${data.name}`);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-1/2 flex flex-col justify-evenly font-poppins font-medium sm:justify-between sm:h-1/2 bg-white rounded-t-2xl sm:rounded-2xl py-5 px-4 z-10"
    >
      <div className="w-full ">
        <label htmlFor="nama" className="block font-light pb-2">
          Nama Lengkap
        </label>
        <input
          id="nama"
          required
          type="text"
          name="name"
          className="w-full rounded-md py-4 px-3 bg-gray-200 outline-none"
          placeholder="Masukkan Nama Lengkap"
          value={userData.name}
          onChange={handelChange}
        />
      </div>
      {errorValidate && <p className="text-red-500 text-sm py-1">Nama Salah</p>}
      <div className="w-full mt-3">
        <button
          type="submit"
          disabled={loadData}
          className={`bg-[#6739ba] py-2 w-full disabled:bg-[#6739ba]/50  rounded text-white hover:bg-[#6739ba]/50`}
        >
          Masuk
        </button>
      </div>
    </form>
  );
}
