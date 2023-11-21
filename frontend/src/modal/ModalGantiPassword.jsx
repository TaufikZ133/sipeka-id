import React, { useState } from "react";
import axios from "axios";
//Asset
import close from "../assets/close.png";

export default function ModalGantiPassword(props) {
  const [paswordLama, SetPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");

  const handleGantiPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_URL+`/password-karyawan/${props.MyId}`,
        {
          oldPassword: paswordLama,
          password: passwordBaru,
        }
      );
      if (response.status === 200) {
        alert("Ubah Password Berhasil");
        props.close()
      }
    } catch (error) {
      console.log(error);
      alert("Password Lama Salah");
    }
  };

  return (
    <div className="z-50 h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 py-10">
      <div className="bg-white animate-fade rounded-xl shadow-lg]">
        <div className="p-5 border-b border-gray-400 font-semibold">
          Ganti Password Akun Anda
          <img
            onClick={props.close}
            alt="close"
            className="cursor-pointer float-right transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.5] duration-300"
            src={close}
          />
        </div>
        <div>
          <form className="mx-5">
            <div className="flex justify-center items-center mx-2">
              <table className="min-w-full md:table mt-4 ">
                <tbody className="block md:table-row-group">
                  <tr className="md:border-none block md:table-row absolute md:top-auto md:left-auto md:relative">
                    <td className="pl-4">
                      <h5 className="font-semibold text-[13px] leading-[20px] mt-2">
                        Password Lama
                      </h5>
                      <input
                        className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 p-2"
                        placeholder="Masukan Password Lama Anda"
                        type="text"
                        value={paswordLama}
                        onChange={(e) => SetPasswordLama(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr className="md:border-none block md:table-row absolute md:top-auto md:left-auto md:relative">
                    <td className="pl-4">
                      <h5 className="font-semibold text-[13px] leading-[20px] mt-5">
                        Password Baru
                      </h5>
                      <input
                        className="bg-[#F5F8FA] rounded-[6px] flex w-[362px] h-[48px] mt-1 p-2"
                        placeholder="Masukan Password Baru Anda"
                        type="text"
                        value={passwordBaru}
                        onChange={(e) => setPasswordBaru(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={handleGantiPassword}
              disabled={paswordLama.length === 0 || passwordBaru.length === 0 || passwordBaru === paswordLama}
              className=" bg-blue-500 hover:bg-blue-800 my-5 disabled:bg-gray-400 mr-5 float-right rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 transition ease-in-out delay-150 duration-300 hover:scale-[1.1]"
            >
              Ganti Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
