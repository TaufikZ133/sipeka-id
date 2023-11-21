import React, { useEffect, useState } from "react";
import axios from "axios";
//Asset
import close from "../assets/close.png";

export default function ModalUploadKk(props) {
  const [fotoKk, setFotoKk] = useState();
  const [temporaryImage, setTemporaryImage] = useState(null);

  useEffect(() => {
    getFotoKk();
    // eslint-disable-next-line
  }, []);

  const getFotoKk = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL+`/karyawan/${props.MyId}`
      );
      if (response.status === 200) {
        setFotoKk(process.env.REACT_APP_API_URL+"/"+ response.data.foto_kk);
      }
      if (response.data.foto_kk.length === 0) {
        setFotoKk("http://fakeimg.pl/350x200/?text=Kartu Keluarga");
        console.log("Foto KK Tidak ada");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTemporaryImage = (e) => {
    const uploaded = e.target.files[0];
    setTemporaryImage(uploaded);
    setFotoKk(URL.createObjectURL(uploaded));
  };

  const uploadKartuKeluarga = async (e) => {
    e.preventDefault();
    try {
      if (temporaryImage !== null) {
        const formData = new FormData();
        formData.append("foto", temporaryImage);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/karyawan-upload",
          formData,
          {
            onUploadProgress: (data) => {
              console.log(Math.round((data.loaded / data.total) * 100));
            },
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          await axios.patch(
            process.env.REACT_APP_API_URL+`/update-karyawan/${props.MyId}`,
            {
              foto_kk: response.data.image,
            }
          );
          alert("Foto Kartu Keluarga Anda Berhasil di Update");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-50 h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 py-10">
      <div className="bg-white animate-fade rounded-xl shadow-lg">
        <div className="p-5 border-b border-gray-400 font-semibold">
          Foto Kartu Keluarga
          <img
            onClick={props.close}
            alt="close"
            className="cursor-pointer float-right transition ease-in-out delay-150 hover:-translate-x-y-1 hover:scale-[1.5] duration-300"
            src={close}
          />
        </div>
        <div className="mt-3 mb-5 mx-auto p-4">
          <img src={fotoKk} className="img-thumbnail w-[30rem] h-[20rem]" alt="..." />
          <p className="p-2">Upload Kartu Keluarga Disini</p>
          <div className="items-center mx-auto">
            <form>
              <input
                onChange={handleTemporaryImage}
                id="formfile"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 border rounded-xl border-gray-500"
              />
              <button
                className="bg-green-500 hover:bg-green-800 rounded-[8px] text-white shadow-xl text-[16px] mt-5 font-semibold p-2 w-[10rem] disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                onClick={uploadKartuKeluarga}
                hidden={temporaryImage === null}
              >
                Update Foto
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
