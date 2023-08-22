import * as XLSX from "xlsx";
import { IExcelFields } from "./interface";
import FileSaver from "file-saver";
import JSZip from "jszip";
import { Dispatch, SetStateAction } from "react";
import { IPopup } from "../popup/interface";

const genHTML = async (
    jsonFromExcel: IExcelFields[],
    templateHTMLContent: string,
    setIsPopup: Dispatch<SetStateAction<boolean>>,
    setPopupInformation: Dispatch<SetStateAction<IPopup>>
) => {
    try {
        const zip = new JSZip();

        jsonFromExcel.forEach((item) => {
            const taxonomy = item.taxonomia.toString();
            const title = item.titulo ? item.titulo.toString() : "empty title";

            const htmlDocument = new DOMParser().parseFromString(
                templateHTMLContent,
                "text/html"
            );
            htmlDocument.querySelector(".text_modelo")!.innerHTML = title;

            const serializedHTML = new XMLSerializer().serializeToString(htmlDocument);
            zip.file(`${taxonomy}.html`, serializedHTML);
        });

        const zipFile = await zip.generateAsync({ type: "blob" });

        FileSaver.saveAs(zipFile, "generated.zip");
    } catch (err) {
        setIsPopup(true),
        setPopupInformation({
            popupType: "fail",
            text: "Error to generate HTML!",
        });
    }
};

const processFile = async (
    spreedsheet: File,
    templateHTMLFile: File,
    setIsPopup: Dispatch<SetStateAction<boolean>>,
    setPopupInformation: Dispatch<SetStateAction<IPopup>>
) => {
    const reader = new FileReader();
    const readerBinaryString = !!reader.readAsBinaryString;

    reader.onabort = () => {
        setIsPopup(true);
        setPopupInformation({
            popupType: "fail",
            text: "File Aborted!",
        });
    };
    reader.onerror = () => {
        setIsPopup(true);
        setPopupInformation({
            popupType: "fail",
            text: "Error to open the file",
        });
    };

    reader.onload = async (e) => {
        const resultReader = e.target?.result;
        const workbook = XLSX.read(
            resultReader,
            { type: readerBinaryString ? "binary" : "array" }
        );
        const sheet_name_list = workbook.SheetNames[0];
        const jsonFromExcel = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list]
        ) as IExcelFields[];

        const templateReader = new FileReader();
        templateReader.onload = (templateEvent) => {
            const templateContent = templateEvent.target?.result as string;
            genHTML(jsonFromExcel, templateContent, setIsPopup, setPopupInformation);
            setIsPopup(true);
            setPopupInformation({
                popupType: "success",
                text: "Generating...",
            });
        };

        templateReader.readAsText(templateHTMLFile);
    };

    readerBinaryString
        ? reader.readAsBinaryString(spreedsheet)
        : reader.readAsArrayBuffer(spreedsheet);
};

export default processFile;
