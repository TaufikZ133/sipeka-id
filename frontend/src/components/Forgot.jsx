//Entry Point
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Asset
import forgot from "../assets/forgot.png";
//Modal
import ModalResetPassword from "../modal/ModalResetPassword";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [emailTidakTerdaftar, setEmailTidakTerdaftar] = useState(false);
  const [modalReset, setModalReset] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setMsg(false);
      setError(true);
    }
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/forget", {
        email: email,
      });
      setMsg(false);
      setError(false);
      setModalReset(true);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setError(false);
        if (error.response.status === 404) {
          setEmailTidakTerdaftar(true);
        }
        if (error.response.status === 400) {
          setEmailTidakTerdaftar(false);
        }
        if (email.length === 0) {
          setMsg(false);
          setError(true);
          setEmailTidakTerdaftar(false);
        }
      }
    }
  };

  const closeModalReset = () => {
    setModalReset(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600">
      <div>
        <div className="w-[80rem] h-full bg-white rounded-3xl table-fixed animate-fade">
          <div className="pt-3 pb-8">
            <table className="w-[10rem] h-[10rem] justify-center items-center mx-auto">
              <tbody>
                <tr>
                  <td className="border-r-2">
                    <div>
                      <div className="flex flex-col justify-center mx-auto">
                        <div className="w-[40rem] h-full px-5 select-none">
                          <h2 className="text-center text-black font-montserrat font-semibold leading-[28px] text-[24px] m-2 mt-9">
                            Selamat Datang
                          </h2>
                          <p className="text-center font-montserrat text-[15px] text-gray-400">
                            Di Halaman Lupa Password.
                          </p>
                        </div>
                        <div className="px-10 pt-10 animate-fade">
                          <img
                            className="mx-auto h-[27rem] pb-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                            src={forgot}
                            alt="login"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="pl-6">
                    <div>
                      <div className="flex flex-col justify-center mx-auto">
                        <form
                          onSubmit={handleSubmit}
                          className="w-full h-[580px] p-3 px-10 select-none"
                        >
                          <h2 className="text-center text-black font-montserrat font-semibold leading-[28px] text-[24px] m-2 mt-9 mb-[8rem]">
                            Lupa Password
                          </h2>
                          <div className="flex flex-col text-black py-1 mx-5 mt-5">
                            <h5 className="font-montserrat font-semibold leading-[20px] text-[13px] ml-[17px]">
                              Email
                            </h5>
                            <div className="control relative">
                              <input
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  setEmailTidakTerdaftar(false);
                                  setMsg(false);
                                }}
                                className={
                                  emailTidakTerdaftar
                                    ? "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 text-red-600 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                    : "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                }
                                placeholder="Masukan Email"
                                value={email}
                                type="text"
                              />
                              <p className="ml-[17px] text-red-500 font-montserrat font-medium leading-[16px] text-[12px] absolute">
                                {msg}
                              </p>
                              {error && email.length <= 0 ? (
                                <p className="ml-[17px] text-red-500 font-montserrat font-medium leading-[16px] text-[12px] absolute">
                                  Email Tidak Boleh Kosong.
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <button className="font-montserrat font-semibold text-[16px] ml-[40px] w-[348px] h-[50px] bg-emerald-500 rounded-[14px] pt-3 pb-3 text-white mt-11 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.1] duration-300">
                            Reset Password
                          </button>
                          <button
                            onClick={goBack}
                            className="font-montserrat font-semibold text-[16px] ml-[40px] w-[348px] h-[50px] bg-orange-600 rounded-[14px] pt-3 pb-3 text-white mt-8 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.1] duration-300"
                          >
                            Batal
                          </button>
                        </form>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal-reset-password">
        {modalReset && <ModalResetPassword close={closeModalReset} />}
      </div>
    </div>
  );
}
