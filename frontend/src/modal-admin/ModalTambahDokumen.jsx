import axios from "axios";
import React, { useState } from "react";
//Asset
import close from "../assets/close.png";

export default function ModalTambahDokumen(props) {
  const [namaDokumen, setNamaDokumen] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");

  const TambahDokumen = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL+"/dokumen", {
        nama_dokumen: namaDokumen,
        jenis_dokumen: jenisDokumen,
      });
      alert("Dokumen Berhasil di Tambahkan");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="z-50 h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 py-10">
      <div className="bg-white animate-fade rounded-xl shadow-lg h-[20rem]">
        <div className="p-5 border-b border-gray-400 font-semibold">
          Tambah Dokumen
          <img
            onClick={props.close}
            alt="close"
            className="cursor-pointer float-right transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.5] duration-300"
            src={close}
          />
        </div>
        <div>
          <form className="mx-5 w-[766px] h-[204px]">
            <div className="flex justify-center items-center mt-5 ml-2">
              <table className="min-w-full md:table mt-4 ">
                <tbody className="block md:table-row-group">
                  <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                    <td className="pl-4">
                      <h5 className="font-semibold text-[13px] leading-[20px]">
                        Nama Dokumen
                      </h5>
                      <input
                        className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                        placeholder="Masukan Nama Dokumen"
                        type="text"
                        value={namaDokumen}
                        onChange={(e) => setNamaDokumen(e.target.value)}
                      />
                    </td>
                    <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                      <td className="pl-4">
                        <h5 className="font-semibold text-[13px] leading-[20px]">
                          Jenis Dokumen
                        </h5>
                        <select
                          className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                          placeholder="Pilih Jenis Dokumen"
                          type="text"
                          value={jenisDokumen}
                          onChange={(e) => setJenisDokumen(e.target.value)}
                        >
                          <option value="[Default]" defaultValue hidden>
                            Silahkan Pilih...
                          </option>
                          <option value="Surat Keterangan">Surat Keterangan</option>
                          <option value="Surat Izin">Surat Izin</option>
                          <option value="Surat Keputusan">Surat Keputusan</option>
                          <option value="Surat Perjanjian">Surat Perjanjian</option>
                        </select>
                      </td>
                    </tr>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={TambahDokumen}
              disabled={namaDokumen.length === 0 || jenisDokumen.length === 0}
              className=" bg-blue-500 hover:bg-blue-800 disabled:bg-gray-400 mt-10 mr-5 float-right rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
            >
              Tambah Baru
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
