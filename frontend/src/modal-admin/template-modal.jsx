import React from "react";

export default function templateModal(props) {
  return (
    <div className="z-50 h-screen w-screen fixed left-0 top-0 flex justify-center bg-black bg-opacity-50 py-10">
      <div className="bg-white animate-fade rounded-xl shadow-lg w-[50rem]">
        <div className="p-5 border-b border-gray-400 font-semibold">
          Tambah Slip Gaji Untuk Karyawan
        </div>
      </div>
    </div>
  );
}
