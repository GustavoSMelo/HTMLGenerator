import * as XLSX from "xlsx";
import { IExcelFields } from "./interface";
import { renderToStaticMarkup } from 'react-dom/server';;
import BaseHTML from "../baseHTML";
import FileSaver from "file-saver";
import JSZip from "jszip";
import { Dispatch, SetStateAction } from "react";
import { IPopup } from "../popup/interface";

const genHTML = async (
    jsonFromExcel: IExcelFields[],
    setIsPopup: Dispatch<SetStateAction<boolean>>,
    setPopupInformation: Dispatch<SetStateAction<IPopup>>
    ) => {
    try {
        const zip = new JSZip();

        jsonFromExcel.forEach(item => {
            const taxonomy = item.taxonomia.toString();
            const title = item.titulo ? item.titulo.toString() : "empty title";

            const html = "<!DOCTYPE html>" + renderToStaticMarkup(<BaseHTML taxonomy={taxonomy} title={title} />);
            const blob = new Blob([html], {type: "html"});

            zip.file(`${taxonomy}.html`,blob);

        });

        const zipFile = await zip.generateAsync({type: 'blob'});
        FileSaver.saveAs(zipFile, 'generated.zip');

        setIsPopup(true);
        setPopupInformation({
            popupType: "success",
            text: "Generating..."
        });
    } catch (err) {
        setIsPopup(true);
        setPopupInformation({
            popupType: "fail",
            text: "The file could has missing information"
        });
    }

}

const processFile = async (
        file: File,
        setIsPopup: Dispatch<SetStateAction<boolean>>,
        setPopupInformation: Dispatch<SetStateAction<IPopup>>
    ) => {
        const reader = new FileReader();
        const readerBinaryString = !!reader.readAsBinaryString;

        reader.onabort = () => {
            setIsPopup(true);
            setPopupInformation({
                popupType: "fail",
                text: "File Aborted!"
            });
        };
        reader.onerror = () => {
            setIsPopup(true);
            setPopupInformation({
                popupType: "fail",
                text: "Error to open the file"
            });
        }

        reader.onload = (e) => {
            const resultReader = e.target?.result;
            const workbook = XLSX.read(resultReader, { type: readerBinaryString ? "binary" : "array" });
            const sheet_name_list = workbook.SheetNames[0];
            const jsonFromExcel = XLSX
                .utils
                .sheet_to_json(workbook.Sheets[sheet_name_list]) as IExcelFields[];

            genHTML(jsonFromExcel, setIsPopup, setPopupInformation);
        }

        readerBinaryString ? reader.readAsBinaryString(file) : reader.readAsArrayBuffer(file);
};

export default processFile;
