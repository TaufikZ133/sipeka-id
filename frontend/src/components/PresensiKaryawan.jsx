//Dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
//Asset
import arrowtwhiteImg from "../assets/arrowtwhite.png";
import presensi from "../assets/presensi.png";
//Modal
import ModalPresensi from "../modal/ModalPresensi.jsx";
import ModalCetakPresensi from "../modal/ModalCetakPresensi.jsx";

export default function PresensiKaryawan() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const SIDEBAR_WIDTH = 300;
  const [dataPresensi, setDataPresensi] = useState([]);
  const [nama, setNama] = useState("");
  const [jenisPresensi, setJenisPresensi] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [showModalPresensi, setShowModalPresensi] = useState(false);
  const [modalSukses, setModalSukses] = useState(false);

  useEffect(() => {
    authParams();
    getPresensi();
    // eslint-disable-next-line
  }, []);

  const authParams = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+"/cookie");
      if (response.status === 204) {
        navigate("/");
      }
      const decoded = jwt_decode(response.data);
      setNama(decoded.nama);
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

  const Logout = async (e) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL+"/keluar");
      navigate("/login");
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  const getPresensi = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/presensi-foreign",
        {
          presensiId: id,
        }
      );
      setDataPresensi(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const tambahPresensi = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_API_URL+"/presensi", {
        nama: nama,
        jenis_presensi: jenisPresensi,
        keterangan: keterangan,
        presensiId: id,
      });
      alert("Presensi Berhasil di Tambahkan");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModalPresensi(false);
  };

  const handleLihatPresensi = (e) => {
    e.preventDefault();
    setShowModalPresensi(true);
  };

  const closeModalSukses = () => {
    setModalSukses(false);
  };

  const openModalSukses = () => {
    setModalSukses(true);
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

            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 bg-white bg-opacity-20 mx-3">
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
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
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
                onClick={() => navigate(`/gaji-karyawan/${id}`)}
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
        <div className="content-karyawan h-full">
          <div className="w-full h-full bg-gray-300 pb-8">
            <div className="bg-white py-1 flex items-center px-5 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border-t-2 border-gray-200">
              <div className="w-[12rem] text-black text-[16px] font-semibold p-3">
                Kelola Presensi
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
              <p className="mt-3 mx-auto text-center py-2 px-2 font-medium mb-9 text-[2rem] ">
                Presensi Karyawan
              </p>
              <img
                alt="presensi"
                className="mx-auto h-[22rem] w-auto my-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                src={presensi}
              />
              <div className="my-5 p-5 ml-16">
                <form className="flex">
                  <p className="py-3">Jenis Kehadiran:</p>
                  <select
                    value={jenisPresensi}
                    onChange={(e) => setJenisPresensi(e.target.value)}
                    className="bg-gray-100 rounded-[6px] w-[10rem] h-[3rem] mt-1 mx-5 p-2 font-normal focus:outline-none mr-9 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                  >
                    <option value="[Default]" defaultValue hidden>
                      Silahkan Pilih...
                    </option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak hadir">Tidak Hadir</option>
                    <option value="izin">Izin</option>
                  </select>
                  <p className="py-3">Keterangan:</p>
                  <input
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="bg-gray-100 rounded-[6px] w-[17rem] h-[3rem] mt-1 mx-5 p-2 font-normal focus:outline-none mr-9 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                    placeholder="Masukan Keterangan"
                    maxLength="20"
                  ></input>
                  <div className="mx-auto flex-none">
                    <button
                      className="bg-blue-500 hover:bg-blue-800 rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 w-[11rem] h-[3rem] mr-8 disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                      onClick={tambahPresensi}
                      disabled={!jenisPresensi || !keterangan}
                    >
                      Masukan Presensi
                    </button>
                    <button
                      className="bg-green-600 hover:bg-green-800 rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 w-[11rem] h-[3rem] mr-8 disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                      onClick={handleLihatPresensi}
                    >
                      Lihat Presensi Saya
                    </button>
                  </div>
                </form>
                <button
                onClick={openModalSukses}
                className=" bg-red-500 hover:bg-red-800 rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
              
              >
                Modal
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-30">
        {showModalPresensi && (
          <ModalPresensi closeModal={handleCloseModal} data={dataPresensi} />
        )}
      </div>
      <div className="z-30">
        {modalSukses && (
          <ModalCetakPresensi
            CloseCetakPresensi={closeModalSukses}
            data={dataPresensi}
          />
        )}
      </div>
    </section>
  );
}
