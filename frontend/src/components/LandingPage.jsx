import React from "react";
import { useNavigate } from "react-router-dom";
//Asset
import cover from "../assets/cover.png"
//Card
import Card from "./Card";


export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  }

  return (
    <div className="bg-white h-screen w-screen relative">
      <div className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-6 bg-opacity-0">
        <p className="flex-none text-xl font-semibold dark:text-white bg-blue-500 p-2 mx-10 px-4 rounded-xl">
          SI
        </p>
        <nav
          className="max-w-[85rem] w-full mx-auto sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex-none text-xl font-semibold"></div>
          <div className="flex flex-row items-center text-[18px] gap-10 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
            <p className="font-medium text-black dark:text-black dark:hover:text-white" aria-current="page">
              Home
            </p>
            <p
              className="font-medium cursor-pointer text-white hover:text-black"
              onClick={register}
            >
              Register
            </p>
          </div>
        </nav>
      </div>
      <div>
        <img className="absolute top-0 right-0" src={cover} alt="cover" />
      </div>
      <div className="w-1/2 h-3/4 items-center">
        <table className="mt-28 ml-20">
          <tbody className="">
            <tr>
              <td className="text-blue-500 font-semibold text-[2.5rem]">
                Selamat Datang
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-[27px]">
                Di Sistem Informasi Manajemen Karyawan
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-[27px]">
                Silahkan Lakukan Login untuk memulai pekerjaan anda
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={handleLogin} className="font-semibold text-[16px] w-[100px] h-[50px] rounded-[14px] pt-3 pb-3 mt-5 text-white shadow-xl transition ease-in-out delay-150 bg-emerald-500 hover:-translate-y-1 hover:scale-125 hover:bg-blue-500 duration-300">
                  Masuk
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Card />
      </div>
  );
}
