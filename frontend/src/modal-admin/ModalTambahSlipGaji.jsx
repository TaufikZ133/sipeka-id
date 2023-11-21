import axios from "axios";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaRupiahSign } from "react-icons/fa6";
//Asset
import close from "../assets/close.png";
//Modal
import ModalBerhasil from "./ModalBerhasil";

export default function ModalTambahSlipGaji(props) {
  const gajiId = props.myCurrentId;
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  const [activePemasukan, setActivePemasukan] = useState(true);
  const [activePemotongan, setActivePemotongan] = useState(false);
  const [activePenerimaan, setActivePenerimaan] = useState(false);
  const [bulanPenggajian, setBulanPenggajian] = useState("");
  const [gajiPokok, setGajiPokok] = useState();
  const [tunjanganTetap, setTunjanganTetap] = useState();
  const [tunjanganTidakTetap, setTunjanganTidakTetap] = useState();
  const [pph21, setPph21] = useState("");
  const [dendaPelanggaran, setDendaPelanggaran] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [totalPendapatanBaru, setTotalPendapatanBaru] = useState();
  const [totalPenguranganBaru, setTotalPenguranganBaru] = useState();
  const [totalPenerimaanBaru, setTotalPenerimaanBersih] = useState();
  const [showModalBerhasil, setShowModalBerhasil] = useState(false);
  const pratinjauPendapatan =
    parseInt(gajiPokok) +
    parseInt(tunjanganTetap) +
    parseInt(tunjanganTidakTetap);
  const PratinjauPengurangan = parseInt(pph21) + parseInt(dendaPelanggaran);
  const PratinjauPenerimaan = totalPendapatanBaru - totalPenguranganBaru;

  const TambahSlipGaji = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/gaji", {
        bulan_penggajian: formatter.format(bulanPenggajian),
        gaji_pokok: formatter.format(gajiPokok),
        tunjangan_tetap: formatter.format(tunjanganTetap),
        tunjangan_tidak_tetap: formatter.format(tunjanganTidakTetap),
        total_pendapatan: formatter.format(totalPendapatanBaru),
        pph21: formatter.format(pph21),
        denda_pelanggaran: formatter.format(dendaPelanggaran),
        total_pengurangan: formatter.format(totalPenguranganBaru),
        penerimaan_bersih: totalPenerimaanBaru,
        keterangan: keterangan,
        gajiId: gajiId,
      });
      setShowModalBerhasil(false);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleClickPemasukan = () => {
    setActivePemasukan(true);
    setActivePemotongan(false);
    setActivePenerimaan(false);
  };

  const HandleClickPemotongan = () => {
    setActivePemotongan(true);
    setActivePemasukan(false);
    setActivePenerimaan(false);
  };

  const HandleClickPenerimaan = () => {
    setActivePemotongan(false);
    setActivePemasukan(false);
    setActivePenerimaan(true);
  };

  function HitungTotalPendapatan() {
    setTotalPendapatanBaru(gajiPokok + tunjanganTetap + tunjanganTidakTetap);
    console.log(gajiPokok + tunjanganTetap + tunjanganTidakTetap);
  }

  function HitungTotalPengurangan() {
    setTotalPenguranganBaru(pph21 + dendaPelanggaran);
    console.log(pph21 + dendaPelanggaran);
  }

  function HitungPenerimaanBersih() {
    const KonvertRupiah = (
      totalPendapatanBaru - totalPenguranganBaru
    ).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "symbol",
    });
    setTotalPenerimaanBersih(KonvertRupiah);
    setShowModalBerhasil(true);
  }

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));
    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  // const valueLembur = (e) => {
  //   const newValue = Math.min(20000000, parseInt(e.target.value));
  //   setLembur(newValue);
  // }

  return (
    <section>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className=" bg-white rounded-[16px] shadow-lg pb-10 animate-fade">
          <div className="p-5 border-b border-gray-400 font-semibold">
            Tambah Slip Gaji
            <img
              onClick={props.close}
              alt="close"
              className="cursor-pointer float-right transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.5] duration-300"
              src={close}
            />
          </div>
          <div className="flex justify-center items-center mt-5 ml-6">
            <table className="min-w-full md:table">
              <tbody className="block md:table-row-group ">
                <tr className=" block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                  <td className="pl-4 border-r-2 border-gray-200">
                    <h5 className="font-montserrat font-semibold text-[13px] leading-[20px]">
                      NAMA
                    </h5>
                    <input
                      className="rounded-[6px] select-none bg-white flex mt-1 mb-5 "
                      placeholder="Belum di Update"
                      type="text"
                      value={props.data.nama}
                      disabled
                    />
                  </td>
                  <td className="pl-4 border-r-2 border-gray-200">
                    <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                      JABATAN
                    </h5>
                    <input
                      className="rounded-[6px] select-none bg-white flex  mt-1 mb-5"
                      placeholder="Belum di Update"
                      type="text"
                      value={props.data.jabatan}
                      disabled
                    />
                  </td>
                  <td className="pl-4">
                    <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                      NOMER HP
                    </h5>
                    <input
                      className="rounded-[6px] select-none bg-white flex mt-1 mb-5"
                      placeholder="Belum di Update"
                      type="text"
                      value={props.data.nomer_hp}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-4 mt-3 select-none border-r-2 border-gray-200 ">
                    <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                      NIK
                    </h5>
                    <input
                      className="rounded-[6px] select-none bg-white flex mt-1 mb-5"
                      placeholder="Belum di Update"
                      type="text"
                      value={props.data.nik}
                      disabled
                    />
                  </td>
                  <td className="pl-4 border-r-2 border-gray-200">
                    <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                      DEPARTEMEN
                    </h5>
                    <input
                      className="rounded-[6px] select-none bg-white flex mt-1 mb-5"
                      placeholder="Belum di Update"
                      type="text"
                      value={props.data.departemen}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Tabs id="controlled-tabs">
            <TabList className="my-4 ml-7 flex sm:flex-row sm:justify-left sm:items-left font-semibold text-[14px] ">
              {/* Tab Handle Pemasukan */}
              <Tab
                onClick={HandleClickPemasukan}
                className={
                  activePemasukan
                    ? "cursor-pointer select-none py-1 pr-2 border-b-2 border-blue-500 hover:border-blue-600 flex mx-5"
                    : "cursor-pointer select-none py-1 pr-2 border-b-2 border-gray-200 hover:border-blue-600 flex mx-5"
                }
              >
                Pemasukan
              </Tab>
              {/* Tab Handle Pengurangan */}
              <Tab
                onClick={HandleClickPemotongan}
                className={
                  activePemotongan
                    ? "cursor-pointer select-none py-1 pr-2 border-b-2 border-blue-500 hover:border-blue-600 flex mx-5"
                    : "cursor-pointer select-none py-1 pr-2 border-b-2 border-gray-200 hover:border-blue-600 flex mx-5"
                }
              >
                Pemotongan
              </Tab>
              {/* Tab Handle Penerimaan Bersuh */}
              <Tab
                onClick={() => {
                  HandleClickPenerimaan();
                  HitungTotalPendapatan();
                  HitungTotalPengurangan();
                }}
                className={
                  activePenerimaan
                    ? "cursor-pointer select-none py-1 pr-2 border-b-2 border-blue-500 hover:border-blue-600 flex mx-5"
                    : "cursor-pointer select-none py-1 pr-2 border-b-2 border-gray-200 hover:border-blue-600 flex mx-5"
                }
              >
                Penerimaan Bersih
              </Tab>
            </TabList>
            {/* Tab Pemasukan */}
            <TabPanel>
              <div>
                <form className="mx-5">
                  <div className="flex justify-center items-center mt-5 ml-2">
                    <table className="min-w-full md:table mt-4 ">
                      <tbody className="block md:table-row-group">
                        <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                          <td className="pl-4">
                            <h5 className="font-semibold text-[13px] leading-[20px]">
                              Gaji Pokok
                            </h5>
                            <div className="relative">
                              <input
                                className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10"
                                type="number"
                                min="1"
                                value={gajiPokok}
                                onChange={(e) =>
                                  setGajiPokok(e.target.valueAsNumber)
                                }
                              />
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                          <td className="pl-4">
                            <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                              Tunjangan Tetap
                            </h5>
                            <div className="relative">
                              <input
                                className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10"
                                type="number"
                                minLength="0"
                                maxLength="6"
                                value={tunjanganTetap}
                                onKeyDown={preventMinus}
                                onPaste={preventPasteNegative}
                                onChange={(e) =>
                                  setTunjanganTetap(e.target.valueAsNumber)
                                }
                              />
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-4">
                            <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                              Tunjangan Tidak Tetap
                            </h5>
                            <div className="relative">
                              <input
                                className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10"
                                placeholder=""
                                type="number"
                                min="1"
                                value={tunjanganTidakTetap}
                                onChange={(e) =>
                                  setTunjanganTidakTetap(e.target.valueAsNumber)
                                }
                              />
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                          <td className="pl-4">
                            <h5 className="font-montserrat font-semibold text-[13px] leading-[20px]">
                              Total Pendapatan
                            </h5>
                            <div className="relative">
                              <p className="bg-blue-100 cursor-not-allowed rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10 pt-3">
                                {pratinjauPendapatan? pratinjauPendapatan : "0"}
                              </p>
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </TabPanel>
            {/* Tab Pemotongan */}
            <TabPanel>
              <div>
                <form className="mx-5">
                  <div className="flex justify-center items-center mt-5 ml-2">
                    <table className="min-w-full md:table mt-4 ">
                      <tbody className="block md:table-row-group">
                        <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                          <td className="pl-4">
                            <h5 className="font-semibold text-[13px] leading-[20px]">
                              PPH21
                            </h5>
                            <div className="relative">
                              <input
                                className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10"
                                placeholder=""
                                type="number"
                                value={pph21}
                                onChange={(e) =>
                                  setPph21(e.target.valueAsNumber)
                                }
                              />
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                          <td className="pl-4">
                            <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                              Denda Pelanggaran
                            </h5>
                            <div className="relative">
                              <input
                                className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10"
                                placeholder=""
                                type="number"
                                value={dendaPelanggaran}
                                onChange={(e) =>
                                  setDendaPelanggaran(e.target.valueAsNumber)
                                }
                              />
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-4">
                            <h5 className=" font-montserrat font-semibold text-[13px] leading-[20px]">
                              Total Pengurangan
                            </h5>
                            <div className="relative">
                              <input
                                className="bg-red-100 cursor-not-allowed rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10"
                                placeholder=""
                                type="number"
                                disabled
                                value={PratinjauPengurangan}
                              />
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </TabPanel>
            {/* Tab Penerimaan Bersih */}
            <TabPanel>
              <div>
                <form className="mx-5 w-[766px] h-[204px]">
                  <div className="flex justify-center items-center mt-5 ml-2">
                    <table className="min-w-full md:table mt-4 ">
                      <tbody className="block md:table-row-group">
                        <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                          <td className="pl-4">
                            <h5 className="font-semibold text-[13px] leading-[20px]">
                              Penerimaan Bersih
                            </h5>
                            <div className="relative">
                              <input
                                className="bg-green-100 cursor-not-allowed rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 pl-10"
                                placeholder=""
                                type="text"
                                value={PratinjauPenerimaan? PratinjauPenerimaan:"0"}
                                disabled
                              />
                              <FaRupiahSign className=" absolute top-4 left-[10px]" />
                            </div>
                          </td>
                          <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                            <td className="pl-4">
                              <h5 className="font-semibold text-[13px] leading-[20px]">
                                Keterangan
                              </h5>
                              <input
                                className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                                placeholder="Masukan Keterangan"
                                type="text"
                                value={keterangan}
                                onChange={(e) => setKeterangan(e.target.value)}
                              />
                            </td>
                          </tr>
                        </tr>
                        <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                          <td className="pl-4">
                            <h5 className="font-semibold text-[13px] leading-[20px]">
                              Bulan Penggajian
                            </h5>
                            <input
                              className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 mb-5 p-2"
                              placeholder="Masukan Keterangan"
                              type="month"
                              value={bulanPenggajian}
                              onChange={(e) =>
                                setBulanPenggajian(e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </TabPanel>
          </Tabs>
          <div className="text-center item-center float-right mr-8 mt-8">
            <button
              onClick={HitungPenerimaanBersih}
              disabled={bulanPenggajian.length === 0}
              className="p-3 disabled:bg-gray-400 bg-blue-500 hover:bg-blue-600 rounded-xl text-white mr-1 transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.1] duration-300"
            >
              Simpan & Verifikasi
            </button>
          </div>
        </div>
        <div className="modal-tambah-slipGaji">
          {showModalBerhasil && <ModalBerhasil close={TambahSlipGaji} />}
        </div>
      </div>
    </section>
  );
}
