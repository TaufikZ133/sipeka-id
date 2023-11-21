//Dependencies
import React from "react";
import moment from "moment";
import "moment/locale/id";
//Asset
import close from "../assets/close.png";
//PDF Renderer
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    fontSize: 12,
    width: 1100,
    lineHeight: 1.8,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  textCompanyInfo: {
    display: "flex",
    alignItems: "left",
    textAlign: "left",
  },
  header: {
    flexDirection: "column",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "center",
    margin: "30",
    marginTop: "20",
    marginBottom: "20",
    padding: "5",
  },
  textNormal: {
    flexDirection: "column",
    margin: "30",
    marginTop: "5",
    marginBottom: "20",
  },
  textFooter: {
    height: "auto",
    marginLeft: "auto",
    marginRight: "20",
  },
  nameFooter: {
    height: "auto",
    marginLeft: "auto",
    marginRight: "20",
    textDecoration: "underline",
  },
});

// Isi Dari PDF Slip Gaji
const date = moment().format("DD MMMM YYYY");
const DataSuratCuti = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Surat Izin Cuti</Text>
        <Text>Nomor Surat: DOC.SLK.0000</Text>
      </View>
      <View style={styles.textNormal}>
        <Text>Bandung, {date}</Text>
        <Text>&nbsp;</Text>
        <Text>Kepada Yth.,</Text>
        <Text>Bapak/Ibu Pimpinan</Text>
        <Text>Di Tempat</Text>
        <Text>&nbsp;</Text>
        <Text>Dengan Hormat,</Text>
        <Text>Yang bertanda tangan di bawah ini:</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text>Nama : {data.nama}</Text>
        <Text>NIK : {data.nik}</Text>
        <Text>Jabatan : {data.jabatan}</Text>
        <Text>No. Telp : {data.nomer_hp}</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text>Bermaksud untuk mengajukan permohonan cuti terhitung mulai tanggal {date} </Text>
        <Text>Demikian surat permohonan cuti ini saya sampaikan, untuk dijadikan sebagai bahan pertimbangan bagi Bapak/Ibu.</Text>
        <Text>Atas perkenannya saya ucapkan Terima Kasih.</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <View style={styles.textFooter}>
        <Text>Hormat Saya,</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text>&nbsp;</Text>
        <Text style={styles.nameFooter}>{data.nama}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const ModalSuratCuti = (props) => {
  return (
    <div className="h-full w-full fixed left-0 top-0 font-montserrat justify-center items-center bg-black bg-opacity-50 overflow-y-scroll">
      <div className="bg-white animate-fade rounded-[13px] shadow-lg w-[70rem] pb-[2rem] my-10 mx-auto ">
        <div className="p-3 border-solid border-b-2 border-gray-200 py-5">
          <div className="float-right">
            <img
              onClick={props.closeModalCuti}
              className="cursor-pointer"
              src={close}
              alt="close"
            />
          </div>
          <h3 className="font-semibold text-[18px] leading-[22px]">
            Detail Surat Cuti
          </h3>
        </div>
        <PDFViewer style={{ width: 1100, height: 700 }}>
          <DataSuratCuti data={props.data} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ModalSuratCuti;
