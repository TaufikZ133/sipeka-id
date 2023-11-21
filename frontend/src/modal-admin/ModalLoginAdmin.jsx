//Entry Point
import React from "react";
//Asset
import success from "../assets/success.png";

export default function ModalLoginAdmin(props) {
  return (
    <div className="Modal h-screen w-screen font-montserrat fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white animate-fade rounded-xl shadow-lg w-[32rem]">
        <div className="px-4"></div>
        <div className="p-3">
          <img className="mx-auto w-[224px] h-[197]" src={[]} alt="" />
          <h2 className="text-center font-semibold text-[24px] m-2 mt-9">
            Login Berhasil !
          </h2>
          <div>
          <img className="px-10 py-5" src={success} alt="success" />
          </div>
          <div className="text-center mx-auto text-[15px] leading-[20px] text-gray-400">
          </div>
        </div>
        <div className="flex justify-end items-center pb-5">
          <button
            onClick={props.onLogin}
            className="justify-center mx-auto my-5 bg-blue-500 rounded-[8px] w-[416px] h-[48px] pt-3 pb-3 text-white mt-11 shadow-xl text-[16px] font-semibold leading-[20px]"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
