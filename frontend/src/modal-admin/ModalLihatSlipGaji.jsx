import React from "react";
import moment from "moment";
import "moment/locale/id";
//Asset
import close from "../assets/close.png";

export default function ModalLihatSlipGaji(props) {
  return (
    <div className="z-50 h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 py-10">
      <div className="bg-white animate-fade rounded-xl shadow-lg pb-10 w-2/5">
        <div className="p-5 border-b border-gray-400 font-semibold">
          Daftar Slip Gaji {props.data[0].nama}
          <img
            onClick={props.close}
            alt="close"
            className="cursor-pointer float-right transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.5] duration-300"
            src={close}
          />
        </div>
        <div className="p-5">
        <div className="tabel-slipGaji overflow-y-scroll w-full h-[20rem]">
          <table className="w-full block md:table divide-x select-none">
            <thead className="block md:table-header-group">
              <tr className="md:border-none block md:table-row absolute md:top-auto md:left-auto md:relative h-[4rem]">
                <th className="bg-gray-100 rounded-tl-2xl text-black font-semibold text-[13px] md:border-none text-left block md:table-cell p-5">
                  No
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-center block md:table-cell px-10">
                  Bulan Penggajian
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Gaji Pokok
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Tunjangan Tetap
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Tunjangan Tidak Tetap
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Total Pendapatan
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  PPH21
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Denda Pelanggaran
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Total Pemotongan
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Penerimaan Bersih
                </th>
                <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell px-5">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group md:border-none font-[420] text-[15px]">
              {props.data
                .map((slipgaji, index) => (
                  <tr
                    className="even:bg-white odd:bg-[#CBDBF4] h-[4rem]"
                    key={slipgaji.id}
                  >
                    <td className="p-3 md:border-none text-left block md:table-cell pl-6">
                      {index + 1}
                    </td>
                    <td className="md:border-none text-center block md:table-cell">
                      {moment(slipgaji.bulan_penggajian).format("MMMM YYYY")}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pr-5">
                      {slipgaji.gaji_pokok}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {slipgaji.tunjangan_tetap}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {slipgaji.tunjangan_tidak_tetap}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {slipgaji.total_pendapatan}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {slipgaji.pph21}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {slipgaji.denda_pelanggaran}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {slipgaji.total_pengurangan}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-5">
                      {slipgaji.penerimaan_bersih}
                    </td>
                    <td className="p-3 md:border-none text-left block md:table-cell pl-10">
                      {slipgaji.keterangan}
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
