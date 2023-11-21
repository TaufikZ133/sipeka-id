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
import ModalTambahMaster from "../modal-admin/ModalTambahMaster.jsx";

//Component
export default function MasterGaji() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [dataMaster, setDataMaster] = useState([]);
  const denda = 0
  const [modalTambahMaster, setModalTambahMaster] = useState(false);
  const { id } = useParams();
  const SIDEBAR_WIDTH = 300;
  const date = moment().format("DD MMMM YYYY");
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    authParams();
    getMasterGaji();
    // eslint-disable-next-line
  }, []);

  const authParams = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/token"
      );
      if (response.status === 204) {
        navigate("/");
      }
      const decoded = jwt_decode(response.data);
      // eslint-disable-next-line
      if (decoded.adminId != id) {
        navigate("/admin");
      }
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const Logout = async (e) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + "/keluar");
      navigate("/login");
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  const getMasterGaji = async (e) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/master-gaji"
      );
      setDataMaster(response.data.rows);
      console.log(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    modalTambahMaster
      ? setModalTambahMaster(false)
      : setModalTambahMaster(true);
  };

  const sendPostRequest = async (gaji_perbulan,tunjangan_tetap,tunjangan_tidak_tetap,pph21,pendapatan_bersih,foreignKey) => {
    const dataToSend = {
      bulan_penggajian: date,
      gaji_pokok: formatter.format(gaji_perbulan),
      tunjangan_tetap: formatter.format(tunjangan_tetap),
      tunjangan_tidak_tetap: formatter.format(tunjangan_tidak_tetap),
      total_pendapatan: formatter.format(parseInt(gaji_perbulan)+parseInt(tunjangan_tetap)+parseInt(tunjangan_tidak_tetap)),
      pph21: formatter.format(pph21),
      denda_pelanggaran: formatter.format(denda),
      total_pengurangan: formatter.format(pph21),
      penerimaan_bersih: formatter.format(pendapatan_bersih),
      keterangan: "Gaji sudah terverifikasi",
      gajiId: foreignKey
    };
    try {
      await axios.post(
        "http://localhost:5000/gaji",
        dataToSend
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleKirimkan = async (jabatan, gaji_perbulan, tunjangan_tetap, tunjangan_tidak_tetap, pph21, pendapatan_bersih) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/karyawan-jabatan", {
          jabatan: jabatan
        }
      );
      const id = (response.data.map((karyawan) => karyawan.id));
      const promises = id.map(async (foreignKey) =>
      await sendPostRequest(gaji_perbulan,tunjangan_tetap,tunjangan_tidak_tetap,pph21,pendapatan_bersih,foreignKey)
    );
    await Promise.all(promises)
      .then(() => {
        alert(`Kirim Slip Gaji berhasil kepada seluruh ${jabatan}`);
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + `/master-gaji/${id}`);
      alert("Data Master Gaji Berhasil Di Hapus Dari Sistem");
      getMasterGaji();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="flex">
      {/* Content of Sidebar */}
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
                <h5 className="text-center text-blue-500 pt-2">
                  Manajemen Karyawan
                </h5>
              </span>
            </li>
            <br></br>
            <li
              onClick={() => navigate("/admin")}
              className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3"
            >
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
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Dashboard
              </h5>
            </li>
            <li
              onClick={() => navigate(`/data-admin/${id}`)}
              className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3"
            >
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
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Data Diri
              </h5>
            </li>
            <div className="border-dashed border-opacity-50 border-2 border-gray-200 rounded-lg mx-1">
              <li
                onClick={() => navigate(`/kelola-gaji/${id}`)}
                className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3 "
              >
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
                  Kelola Slip Gaji
                </h5>
              </li>
              <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3 bg-white bg-opacity-20 mb-1">
                <svg
                  class="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                </svg>
                <h5
                  className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                    !open && "hidden"
                  }`}
                >
                  Master Data Gaji
                </h5>
              </li>
            </div>
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
                onClick={() => navigate(`/kelola-dokumen/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Dokumen
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
                onClick={() => navigate(`/chat-admin/${id}`)}
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
              <div className="w-[15rem] text-black text-[16px] font-semibold p-3">
                Master Data Gaji
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
            <div className="content-gaji bg-white p-2 font-semibold rounded-[12px] mx-[1rem] mt-[2rem] shadow-2xl">
              <div className="input-pencarian py-2 px-5">
                <button
                  onClick={handleModal}
                  className=" bg-blue-500 hover:bg-blue-800 mt-3 float-right rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                >
                  Tambah Master Data
                </button>
                <p className="mb-2">Pencarian :</p>
                <input
                  className="bg-gray-50 border border-black p-2 rounded-[6px] w-[20rem] h-[2rem] font-thin mb-5"
                  placeholder="Masukan value..."
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
              </div>
              <div className="tabel-karyawan overflow-y-scroll w-full h-[30rem]">
                <table className="w-full block md:table divide-x select-none">
                  <thead className="block md:table-header-group">
                    <tr className="md:border-none block md:table-row absolute md:top-auto md:left-auto md:relative h-[4rem]">
                      <th className="bg-gray-100 rounded-tl-2xl text-black font-semibold text-[13px] md:border-none text-left block md:table-cell p-5">
                        No
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell">
                        Jabatan
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell">
                        Gaji Perbulan
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell">
                        Tunjangan Tetap
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell">
                        Tunjangan Tidak Tetap
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell pl-5">
                        PPh21
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell">
                        Pendapatan Bersih
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell">
                        Aksi
                      </th>
                      <th className="bg-gray-100 text-black font-semibold text-[13px] md:border-none text-left block md:table-cell">
                        Kirimkan Slip gaji
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group md:border-none font-[420] text-[15px]">
                    {dataMaster
                      .filter((master) =>
                        master.jabatan.toLowerCase().includes(query)
                      )
                      .map((master, index) => (
                        <tr
                          className="even:bg-white odd:bg-[#CBDBF4]"
                          key={master.id}
                        >
                          <td className="px-3 md:border-none text-left block md:table-cell pl-6">
                            {index + 1}
                          </td>
                          <td className="px-3 md:border-none text-left block md:table-cell">
                            {master.jabatan}
                          </td>
                          <td className="px-3 md:border-none text-left block md:table-cell">
                            {formatter.format(master.gaji_perbulan)}
                          </td>
                          <td className="px-3 md:border-none text-left block md:table-cell">
                            {formatter.format(master.tunjangan_tetap)}
                          </td>
                          <td className="px-3 md:border-none text-left block md:table-cell">
                            {formatter.format(master.tunjangan_tidak_tetap)}
                          </td>
                          <td className="px-3 md:border-none text-left block md:table-cell">
                            {formatter.format(master.pph21)}
                          </td>
                          <td className="px-3 md:border-none text-left block md:table-cell">
                            {formatter.format(
                              parseInt(master.pendapatan_bersih)
                            )}
                          </td>
                          <td className="py-6 md:border-none text-left block md:table-cell">
                            <button className="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 mr-5"
                                onClick={() => handleDelete(master.id)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                          <td className="px-3 md:border-none text-left block md:table-cell">
                            <button onClick={() => handleKirimkan(master.jabatan, master.gaji_perbulan, master.tunjangan_tetap, master.tunjangan_tidak_tetap, master.pph21, master.pendapatan_bersih)} className="p-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-800">Kirimkan</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="mx-auto items-center text-center mt-10">
                  {dataMaster.length === 0 && (
                    <>
                      <img
                        src={nofile}
                        alt="nofile"
                        className="mx-auto w-[13rem] h-[13rem]"
                      ></img>
                      <p className="font-montserrat font-semibold mb-9 text-[#AAAAAA] leading-[20px] text-[13px] mt-3">
                        Belum ada file yang di upload
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-tambah-master">
        {modalTambahMaster && <ModalTambahMaster close={handleModal} getData={getMasterGaji}/>}
      </div>
    </section>
  );
}
