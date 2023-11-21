//Entry Point
import React from "react";
//Asset
import success from "../assets/success.png";

export default function template(props) {
  return (
    <div className="h-screen w-screen font-montserrat fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white animate-fade rounded-xl shadow-lg w-[32rem] p-5">
          <h2 className="text-center font-semibold text-[24px] p-3">
            Berhasil !
          </h2>
          <div>
          <img className="p-5" src={success} alt="success" />
          </div>
        <div className="flex">
          <button
            onClick={props.close}
            className="mx-auto mb-5 bg-blue-500 hover:bg-blue-600 rounded-[8px] w-[416px] h-[48px] text-white shadow-xl text-[16px] font-semibold transition ease-in-out delay-150 hover:scale-[1.080] duration-300"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
