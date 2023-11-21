import React from "react";
import { useNavigate } from "react-router-dom";
//Asset
import close from "../assets/close.png";
import admin from "../assets/admin.png";
import user from "../assets/user.png"

export default function ModalRole(props) {
  const navigate = useNavigate();

  const handleKaryawan = (e) => {
    e.preventDefault();
    navigate("/login-karyawan");
  };
  const handleAdmin = (e) => {
    e.preventDefault();
    navigate("/login-admin");
  };

  return (
    <div className="z-50 h-screen w-screen font-montserrat fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white animate-fade rounded-xl shadow-lg w-[45rem]">
      <div className="p-5 border-b border-gray-400 font-semibold">Pilih Role Login
          <img
            onClick={props.handleClose}
            alt="close"
            className="cursor-pointer float-right transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.5] duration-300"
            src={close}
          />
        </div>
        <div className="gap-[3rem] flex-wrap flex justify-center items-center py-[3rem]">
          <div className="w-60 p-2 mx-4 bg-white border-2 border-gray-400 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img className="h-40 mx-auto object-cover rounded-xl mt-2" src={user} alt="x" />
            <div className="flex justify-end items-center pb-5">
              <button
                onClick={handleKaryawan}
                className="justify-center mx-auto bg-blue-500 rounded-[8px] w-[416px] h-[48px] text-white mt-5 shadow-xl text-[16px] font-semibold leading-[20px]"
              >
                Karyawan
              </button>
            </div>
          </div>
          <div className="w-60 p-2 bg-white border-2 border-gray-400 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img className="h-40 mx-auto object-cover rounded-xl mt-2" src={admin} alt="x" />
            <div className="flex justify-end items-center pb-5">
              <button
                onClick={handleAdmin}
                className="justify-center mx-auto bg-red-500 rounded-[8px] w-[416px] h-[48px] text-white mt-5 shadow-xl text-[16px] font-semibold leading-[20px]"
              >
                Admin
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}
