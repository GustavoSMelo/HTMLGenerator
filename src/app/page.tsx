"use client";

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Dropbox } from './styles/page.style';
import { TfiImport } from 'react-icons/tfi';
import { SiMicrosoftexcel } from 'react-icons/si';
import GlobalStyle from './styles/global.style';
import processFile from './components/processFile';
import Loading from './components/loading';
import { IPopup } from './components/popup/interface';
import Popup from './components/popup';

const Home = () => {
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(true);
    const [isPopup, setIsPopup] = useState(false);
    const [popupInformation, setPopupInformation] = useState<IPopup>({
        popupType: 'success',
        text: ''
    });
    const { acceptedFiles, getInputProps, getRootProps } = useDropzone();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {

        if (acceptedFiles[0] && (!acceptedFiles[0]?.name.includes('.xlsx') || acceptedFiles[0]?.name.includes('.csv'))) {
            setIsPopup(true);
            setPopupInformation({
                popupType: 'fail',
                text: 'The file type is incorrect or not supported'
            });

        } else if (acceptedFiles[0]) {
            setIsPopup(true);
            setPopupInformation({
                popupType: 'success',
                text: 'File imported with success'
            });
            setFile(acceptedFiles[0]);
        }

        setInterval(() => setIsPopup(false), 4000);
    }, [acceptedFiles]);

    const handleFile = () => {
        if (file) {
            processFile(file, setIsPopup, setPopupInformation)
            return;
        }

        setIsPopup(true);
        setPopupInformation({
            popupType: 'fail',
            text: 'Select a file before generate'
        });
    };

    return (
        <>
            {
                isLoading ? <Loading /> : (
                    <>
                        {isPopup ?
                            <Popup
                                popupType={popupInformation.popupType}
                                text={popupInformation.text} /> : <></>
                        }
                        <Container>
                            <h1>HTML Generator</h1>

                            <p>Import a csv/xls file to generate a html for each line</p>

                            <Dropbox {...getRootProps()}>
                                <input
                                    {...getInputProps()}
                                    accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                />
                                <TfiImport className='importIcon' />
                                <p>Drag and drop your file here, or click to select</p>

                                {file && (
                                    <p className="fileInformation">
                                        <SiMicrosoftexcel color="#43E028" />
                                        <span>
                                            <strong>Filename:</strong> {file.name}
                                        </span>
                                    </p>
                                )}
                            </Dropbox>

                            <button type='button' onClick={() => handleFile()}>Generate</button>
                        </Container>
                    </>
                )
            }

            <GlobalStyle />
        </>
    );
};

export default Home;
