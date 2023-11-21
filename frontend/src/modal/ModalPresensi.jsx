//Entry Point
import React from "react";
import moment from "moment";
import "moment/locale/id";
//Asset
import nofile from "../assets/nofile.png";

export default function ModalPresensi({ data, closeModal }) {
  return (
    <div className="h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white animate-fade rounded-xl shadow-lg w-auto p-5">
        <div className="p-3">
          <h2 className="text-center font-semibold text-[24px] m-2">
            Daftar Kehadiran Anda
          </h2>
          <div className="text-center mx-auto text-[15px] leading-[20px]">
            <div className="overflow-y-scroll w-full h-[25rem]">
              <table className="w-full block md:table divide-x select-none">
                <thead className="block md:table-header-group">
                  <tr className="md:border-none block md:table-row absolute md:top-auto md:left-auto md:relative h-[4rem]">
                    <th className="bg-white text-[#AAAAAA] font-semibold text-[15px] md:border-none text-left block md:table-cell pl-5">
                      No
                    </th>
                    <th className="bg-white text-[#AAAAAA] font-semibold text-[15px] md:border-none text-left block md:table-cell pl-3">
                      Nama
                    </th>
                    <th className="bg-white text-[#AAAAAA] font-semibold text-[15px] md:border-none text-left block md:table-cell pl-5">
                      Jenis Kehadiran
                    </th>
                    <th className="bg-white text-[#AAAAAA] font-semibold text-[15px] md:border-none text-left block md:table-cell pl-5">
                      Keterangan
                    </th>
                    <th className="bg-white text-[#AAAAAA] font-semibold text-[15px] md:border-none text-left block md:table-cell pl-5">
                      Tanggal dan Waktu
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group md:border-none font-[420] text-[15px]">
                  {data.map((datas, index) => (
                    <tr
                      className="even:bg-white odd:bg-[#CBDBF4] h-[4rem]"
                      key={datas.id}
                    >
                      <td className="p-3 md:border-none text-left block md:table-cell pl-6">
                        {index + 1}
                      </td>
                      <td className="p-3 md:border-none text-left block md:table-cell pr-5">
                        {datas.nama}
                      </td>
                      <td
                        className={
                          datas.jenis_presensi.length === 5
                            ? "inline-block py-2.5 w-[5rem] px-3 mt-2.5 rounded-xl text-center text-white bg-green-500 font-semibold"
                            : "inline-block py-2.5 w-[5rem] mt-2.5 rounded-xl text-center text-white bg-red-500 font-semibold"
                        }
                      >
                        {datas.jenis_presensi}
                      </td>
                      <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                        {datas.keterangan}
                      </td>
                      <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                        {moment(datas.createdAt).format(
                          "DD MMMM YYYY, hh:mm A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mx-auto items-center text-center mt-10">
                {data.length === 0 && (
                  <>
                    <img
                      src={nofile}
                      alt="nofile"
                      className="mx-auto w-[13rem] h-[13rem]"
                    ></img>
                    <p className="font-montserrat font-semibold mb-9 text-[#AAAAAA] leading-[20px] text-[13px] mt-3">
                      Belum ada file yang di upload
                    </p>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center pb-5">
          <button
            onClick={closeModal}
            className="justify-center mx-auto my-5 bg-blue-500 hover:bg-blue-700 rounded-[8px] w-[416px] h-[48px] text-white shadow-xl text-[16px] font-semibold leading-[20px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
