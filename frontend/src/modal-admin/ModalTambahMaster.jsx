import axios from "axios";
import React, { useState } from "react";
//Asset
import close from "../assets/close.png";

export default function ModalTambahMaster(props) {
  const [namaJabatan, setNamaJabatan] = useState("");
  const [gajiPerbulan, setGajiPerbulan] = useState(0);
  const [tunjanganTetap, setTunjanganTetap] = useState(0);
  const [tunjanganTidakTetap, setTunjanganTidakTetap] = useState(0);
  const gajipokok = gajiPerbulan? (parseInt(gajiPerbulan) + parseInt(tunjanganTetap) + parseInt(tunjanganTidakTetap)) : (0)
  const hitungPph21 = gajipokok? (parseInt(gajipokok) * 0.05) : (gajipokok)
  const totalPendapatanBersih = hitungPph21? (gajipokok - parseInt(hitungPph21)) : (hitungPph21)
  const denda = 0;
  const gajiPerhari = gajiPerbulan ? gajiPerbulan / 25 : 0;

  const TambahMasterGaji = async (e) => {
    e.preventDefault()
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/master-gaji", {
        jabatan: namaJabatan,
        gaji_perbulan: gajiPerbulan,
        gaji_perhari: gajiPerhari,
        tunjangan_tetap: tunjanganTetap,
        tunjangan_tidak_tetap: tunjanganTidakTetap,
        pph21: hitungPph21,
        denda: denda,
        pendapatan_bersih: totalPendapatanBersih,
      });
      alert("Data Master Berhasil di Tambahkan");
      props.close()
      props.getData()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-50 h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 py-10">
      <div className="bg-white animate-fade rounded-xl shadow-lg h-[23rem]">
        <div className="p-5 border-b border-gray-400 font-semibold">
          Tambah Master Data Gaji
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
              <table className="min-w-full md:table ">
                <tbody className="block md:table-row-group">
                  <tr className="md:border-none block md:table-row absolute md:top-auto -left-full md:left-auto  md:relative">
                    <td className="pl-4">
                      <h5 className="font-semibold text-[13px] leading-[20px]">
                        Jabatan
                      </h5>
                      <input
                        className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                        placeholder="Masukan Jabatan"
                        type="text"
                        value={namaJabatan}
                        onChange={(e) => setNamaJabatan(e.target.value)}
                      />
                    </td>
                    <td className="pl-4">
                      <h5 className="font-semibold text-[13px] leading-[20px]">
                        Gaji Perbulan
                      </h5>
                      <input
                        className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                        placeholder="Masukan Gaji Perbulan"
                        type="number"
                        min="1"
                        value={gajiPerbulan}
                        onChange={(e) => setGajiPerbulan(e.target.valueAsNumber)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-4">
                      <h5 className="font-semibold text-[13px] leading-[20px]">
                        Tunjangan Tetap
                      </h5>
                      <input
                        className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                        placeholder="Masukan Tunjangan Tetap"
                        type="number"
                        min="1"
                        value={tunjanganTetap}
                        onChange={(e) => setTunjanganTetap(e.target.valueAsNumber)}
                      />
                    </td>
                    <td className="pl-4">
                      <h5 className="font-semibold text-[13px] leading-[20px]">
                        Tunjangan Tidak Tetap
                      </h5>
                      <input
                        className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                        placeholder="Masukan Tunjangan Tidak Tetap"
                        type="number"
                        min="1"
                        value={tunjanganTidakTetap}
                        onChange={(e) => setTunjanganTidakTetap(e.target.valueAsNumber)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={TambahMasterGaji}
              disabled={namaJabatan === 0 || gajiPerbulan === 0}
              className=" bg-blue-500 hover:bg-blue-800 disabled:bg-gray-400 mt-5 mr-5 float-right rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
            >
              Tambah Baru
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
