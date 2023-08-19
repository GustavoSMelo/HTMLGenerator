import * as XLSX from "xlsx";
import { IExcelFields } from "./interface";
import { renderToStaticMarkup } from 'react-dom/server';
import { randomBytes } from "crypto";
import BaseHTML from "../baseHTML";
import path from 'path';
import FileSaver from "file-saver";
import JSZip from "jszip";

const genHTML = async (jsonFromExcel: IExcelFields[]) => {
    const zip = new JSZip();

    jsonFromExcel.forEach(item => {
        const taxonomy = item.taxonomia.toString();
        const title = item.titulo ? item.titulo.toString() : "empty title";

        const html = renderToStaticMarkup(<BaseHTML taxonomy={taxonomy} title={title} />);
        const blob = new Blob([html], {type: "html"});

        zip.file(`${taxonomy}.html`,blob);

    });

    zip.folder('generated');
    const zipFile = await zip.generateAsync({type: 'blob'});
    FileSaver.saveAs(zipFile, 'generated.zip');
}

const processFile = async (file: File) => {
    const reader = new FileReader();
    const readerBinaryString = !!reader.readAsBinaryString;

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.onload = (e) => {
        const resultReader = e.target?.result;
        const workbook = XLSX.read(resultReader, { type: readerBinaryString ? "binary" : "array" });
        const sheet_name_list = workbook.SheetNames[0];
        const jsonFromExcel = XLSX
            .utils
            .sheet_to_json(workbook.Sheets[sheet_name_list]) as IExcelFields[];

        genHTML(jsonFromExcel);
    }

    readerBinaryString ? reader.readAsBinaryString(file) : reader.readAsArrayBuffer(file);
};

export default processFile;
