import * as XLSX from "xlsx";
import * as fs from 'fs';
import { IExcelFields } from "./interface";
import { renderToStaticMarkup } from 'react-dom/server';
import { randomUUID } from "crypto";
import BaseHTML from "../baseHTML";

const genHTML = (jsonFromExcel: IExcelFields[]) => {
    console.log(jsonFromExcel);

    jsonFromExcel.forEach(item => {
        const taxonomy = item.taxonomia ? item.taxonomia : randomUUID().toString();
        const title = item.titulo ? item.titulo.toString() : "empty title";


        const html = renderToStaticMarkup(<Base taxonomy={taxonomy} title={title} />);
    });

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
