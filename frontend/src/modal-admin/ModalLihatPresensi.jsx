import React from "react";
import moment from "moment";
import "moment/locale/id";
//Asset
import close from "../assets/close.png";

export default function ModalLihatPresensi(props) {
  const index = props.data.length -1
  return (
    <div className="z-50 h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 py-10">
      <div className="bg-white animate-fade rounded-xl shadow-lg pb-10">
        <div className="p-5 border-b border-gray-400 font-semibold">
          Daftar Presensi {props.data[index].nama}
          <img
            onClick={props.close}
            alt="close"
            className="cursor-pointer float-right transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.5] duration-300"
            src={close}
          />
        </div>
        <div className="p-5">
          <div className="tabel-presensi overflow-y-scroll h-[20rem]">
            <table className="w-full block md:table divide-x select-none">
              <thead className="block md:table-header-group">
                <tr className="md:border-none block md:table-row absolute md:top-auto md:left-auto md:relative h-[4rem]">
                  <th className="bg-gray-100 rounded-tl-2xl text-black font-semibold text-[13px] md:border-none text-left block md:table-cell p-5">
                    No
                  </th>
                  <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                    Nama
                  </th>
                  <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                    Jenis Kehadiran
                  </th>
                  <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                    Keterangan
                  </th>
                  <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                    Tanggal dan Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group md:border-none font-[420] text-[15px]">
                {props.data.map((presensi, index) => (
                  <tr
                    className="even:bg-white odd:bg-[#CBDBF4] h-[4rem]"
                    key={presensi.id}
                  >
                    <td className="p-3 md:border-none text-left block md:table-cell pl-6">
                      {index + 1}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {presensi.nama}
                    </td>
                    <td className={presensi.jenis_presensi.length === 5 ? "inline-block py-2.5 w-[5rem] ml-5 mt-2.5 rounded-xl text-center text-white bg-green-500 font-semibold" : "inline-block py-2.5 w-[5rem] ml-5 mt-2.5 rounded-xl text-center text-white bg-red-500 font-semibold"}>
                      {presensi.jenis_presensi}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {presensi.keterangan}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {moment(presensi.createdAt).format("DD MMMM YYYY, hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
