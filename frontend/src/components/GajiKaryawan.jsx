//Dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";
import "moment/locale/id";
//Asset
import arrowtwhiteImg from "../assets/arrowtwhite.png";
import nofile from "../assets/nofile.png";
//Modal
import ModalGaji from "../modal/ModalGaji.jsx";

export default function GajiKaryawan() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [gaji, setGaji] = useState([]);
  const [dataSlipGaji, setDataSlipGaji] = useState(null);
  const [dataKaryawan, setDataKaryawan] = useState([]);
  const [showModalPdfGaji, setShowPdfGaji] = useState(false);
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const SIDEBAR_WIDTH = 300;

  useEffect(() => {
    authParams();
    getGaji();
    getKaryawan();
    // eslint-disable-next-line
  }, []);

  const authParams = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/cookie"
      );
      if (response.status === 204) {
        navigate("/");
      }
      const decoded = jwt_decode(response.data);
      // eslint-disable-next-line
      if (decoded.karyawanId != id) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const handleCetakPdf = async (id) => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/gaji/${id}`
    );
    if (response.status === 200) {
      setShowPdfGaji(true);
      setDataSlipGaji(response.data);
    }
  };

  const handleClosePDF = () => {
    setShowPdfGaji(false);
  };

  const getGaji = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/gaji-foreign",
        {
          gajiId: id,
        }
      );
      setGaji(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const getKaryawan = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+`/karyawan/${id}`);
      setDataKaryawan(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const Logout = async (e) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + "/keluar");
      navigate("/login");
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

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
            <li className="flex items-center mr-5 p-2 rounded-md mt-2 ">
              <span
                className={`text-base text-gray-200 flex-1 font-montserrat font-semibold text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                <h5 className="text-center">Sistem Informasi</h5>
                <h5 className="text-center text-blue-500 pt-2">
                  Manajemen Karyawan
                </h5>
              </span>
            </li>
            <br></br>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <h5
                onClick={() => navigate("/dashboard")}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Dashboard
              </h5>
            </li>

            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
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
                onClick={() => navigate(`/presensi-karyawan/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Presensi
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
              <h5
                onClick={() => navigate(`/data-karyawan/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Data Diri
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md bg-white bg-opacity-20 mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
              </svg>
              <h5
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Cetak Slip Gaji
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-2.359 10.707-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L7 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <h5
                onClick={() => navigate(`/dokumen-karyawan/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Buat Dokumen
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
              </svg>
              <h5
                onClick={() => navigate(`/chatting/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Ruang Chat
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
        <div className="content-karyawan h-full w-auto">
          <div className="w-full h-full bg-gray-300 pb-[3rem]">
            <div className="bg-white py-1 flex items-center px-5 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border-t-2 border-gray-200">
              <div className="w-[12rem] text-black text-[16px] font-semibold p-3">
                Cetak Slip Gaji
              </div>
              <div className="w-screen"></div>
              <div>
                <button
                  onClick={Logout}
                  className=" bg-red-500 hover:bg-red-800 rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="bg-white p-2 rounded-[12px] mx-[1rem] mt-[2rem] shadow-2xl">
              <div className="mx-5 my-2">
                <p className="mb-2">Pencarian :</p>
                <input
                  className="bg-gray-50 border border-black p-2 rounded-[6px] w-[20rem] h-[2rem] font-thin mb-5"
                  placeholder="Masukan value..."
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
              </div>
              <div className="flex justify-center items-center pb-10">
                <div className="overflow-y-scroll w-full h-[25rem]">
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
                          Cetak
                        </th>
                      </tr>
                    </thead>
                    <tbody className="block md:table-row-group md:border-none font-[420] text-[15px]">
                      {gaji
                        .filter((slipgaji) =>
                          slipgaji.bulan_penggajian
                            .toLowerCase()
                            .includes(query)
                        )
                        .map((slipgaji, index) => (
                          <tr
                            className="even:bg-white odd:bg-[#CBDBF4] h-[4rem]"
                            key={slipgaji.id}
                          >
                            <td className="p-3 md:border-none text-left block md:table-cell pl-6">
                              {index + 1}
                            </td>
                            <td className="md:border-none text-center block md:table-cell">
                              {moment(slipgaji.bulan_penggajian).format(
                                "MMMM YYYY"
                              )}
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
                            <td className="p-5 md:border-none text-center block md:table-cell">
                              <button>
                                <svg
                                  width="35px"
                                  height="35px"
                                  viewBox="0 0 32 32"
                                  onClick={() => handleCetakPdf(slipgaji.id)}
                                >
                                  <path d="M5.656 6.938l-0.344 2.688h11.781l-0.344-2.688c0-0.813-0.656-1.438-1.469-1.438h-8.188c-0.813 0-1.438 0.625-1.438 1.438zM1.438 11.094h19.531c0.813 0 1.438 0.625 1.438 1.438v8.563c0 0.813-0.625 1.438-1.438 1.438h-2.656v3.969h-14.219v-3.969h-2.656c-0.813 0-1.438-0.625-1.438-1.438v-8.563c0-0.813 0.625-1.438 1.438-1.438zM16.875 25.063v-9.281h-11.344v9.281h11.344zM15.188 18.469h-8.125c-0.188 0-0.344-0.188-0.344-0.375v-0.438c0-0.188 0.156-0.344 0.344-0.344h8.125c0.188 0 0.375 0.156 0.375 0.344v0.438c0 0.188-0.188 0.375-0.375 0.375zM15.188 21.063h-8.125c-0.188 0-0.344-0.188-0.344-0.375v-0.438c0-0.188 0.156-0.344 0.344-0.344h8.125c0.188 0 0.375 0.156 0.375 0.344v0.438c0 0.188-0.188 0.375-0.375 0.375zM15.188 23.656h-8.125c-0.188 0-0.344-0.188-0.344-0.375v-0.438c0-0.188 0.156-0.344 0.344-0.344h8.125c0.188 0 0.375 0.156 0.375 0.344v0.438c0 0.188-0.188 0.375-0.375 0.375z"></path>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="mx-auto items-center text-center mt-10">
                    {gaji.length === 0 && (
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
          </div>
        </div>
      </div>
      <div className="z-50">
        {showModalPdfGaji && (
          <ModalGaji data={dataSlipGaji} karyawan={dataKaryawan} closePDF={handleClosePDF} />
        )}
      </div>
    </section>
  );
}
