import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//Asset
import arrowtwhiteImg from "../assets/arrowtwhite.png";

export default function KaryawanDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const SIDEBAR_WIDTH = 300;

  return (
    // Content Of Sidebar
    <section className="flex">
      <div
        style={{ width: open ? SIDEBAR_WIDTH : 80 }}
        className={`min-h-screen text-white duration-300 bg-[#1C1F2D]`}
      >
        <div>
          <div className="py-4 flex justify-end p-3">
            <div className="mr-[2rem]">
              <img
                size={26}
                alt=""
                className={`text-white cursor-pointer absolute ${
                  !open && "rotate-180"
                }`}
                src={arrowtwhiteImg}
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
        </div>

        <div>
          <ul className="m-auto">
            <li className="flex items-center mr-5 p-2 rounded-md mt-2">
              <span
                className={`text-base text-gray-200 flex-1 font-montserrat font-semibold text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                <h5 className="text-center">Sistem Informasi</h5>
                <h5 className="text-center text-blue-500 pt-2">Manajemen Karyawan</h5>
              </span>
            </li>
            <br></br>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              <h5
                onClick={() => navigate("/dashboard")}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Sewa Lapangan
              </h5>
            </li>

            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2M5 5h8m-8 5h8m-8 4h8"
                />
              </svg>
              <h5
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Riwayat Transaksi
              </h5>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="w-full left-20"
        style={{
          width: open ? `calc(100% - ${SIDEBAR_WIDTH}px)` : `calc(100% - 80px)`,
        }}
      >
        {/* Content of Dashboard Karyawan */}
        <div className="content-karyawan">
          <div className="w-full h-screen bg-gray-300">
            <div className="bg-white h-[60px] w-full flex items-center px-5 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border-t-2 border-gray-200">
              <div>
                <div className="w-[12rem] text-black text-[16px] font-semibold p-3 ">
                  Selamat Datang
                </div>
              </div>
              <div className="w-screen"></div>
              <div>
                <button
                  onClick={[]}
                  className=" bg-red-500 hover:bg-red-800  rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-2 "
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="bg-white text-center p-2 font-bold rounded-[12px] mx-[1rem] mt-[2rem] shadow-2xl">
              <p className="mt-5">Selamat Datang Di Halaman Dashboard Karyawan</p>
              <div className="flex justify-center items-center pb-5 mt-10">
                <div className="overflow-y-scroll w-full h-[25rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
