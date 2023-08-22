"use client";

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Dropbox, OptionButtons } from './styles/page.style';
import { TfiImport } from 'react-icons/tfi';
import { SiHtml5, SiMicrosoftexcel } from 'react-icons/si';
import GlobalStyle from './styles/global.style';
import processFile from './components/processFile';
import Loading from './components/loading';
import { IPopup } from './components/popup/interface';
import Popup from './components/popup';

const Home = () => {
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(true);
    const [isPopup, setIsPopup] = useState(false);
    const [template, setTemplate] = useState<File>();
    const [option, setOption] = useState<'file' | 'template'>('file');
    const [popupInformation, setPopupInformation] = useState<IPopup>({
        popupType: 'success',
        text: ''
    });
    const { acceptedFiles, getInputProps, getRootProps } = useDropzone();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
         if (acceptedFiles[0]) {
            setIsPopup(true);
            setPopupInformation({
                popupType: 'success',
                text: 'File imported with success'
            });
            acceptedFiles[0].name.includes('.xlsx') ?
                setFile(acceptedFiles[0]) :
                setTemplate(acceptedFiles[0]);
        }

        setInterval(() => setIsPopup(false), 4000);
    }, [acceptedFiles]);

    const handleFile = () => {
        if (file && template) {
            processFile(file, template, setIsPopup, setPopupInformation)
            return;
        }

        setIsPopup(true);
        setPopupInformation({
            popupType: 'fail',
            text: 'Select a Spreadsheet or template before generate'
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

                            <p>Import a xlsx file to generate a html for each line</p>

                            <OptionButtons option={option}>
                                <button
                                    className='btnFile'
                                    onClick={() => setOption('file')}>
                                    File
                                </button>

                                <button
                                    className='btnTemplate'
                                    onClick={() => setOption('template')}>
                                    Template
                                </button>
                            </OptionButtons>

                            {option === 'file' ? (
                                <Dropbox {...getRootProps()}>
                                    <input
                                        {...getInputProps()}
                                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    />
                                    <TfiImport className='importIcon' />
                                    <p>Drag and drop your Spreadsheet here, or click to select</p>

                                    {file && (
                                        <p className="fileInformation">
                                            <SiMicrosoftexcel />
                                            <span>
                                                <strong>Spreadsheet:</strong> {file.name}
                                            </span>
                                        </p>
                                    )}
                                </Dropbox>
                            ) :
                            (
                                <Dropbox {...getRootProps()}>
                                    <input
                                        {...getInputProps()}
                                        accept="text/html"
                                    />
                                    <TfiImport className='importIcon' />
                                    <p>Drag and drop your HTML template here, or click to select</p>

                                    {template && (
                                        <p className="fileInformation">
                                            <SiHtml5 />
                                            <span>
                                                <strong>Template:</strong> {template.name}
                                            </span>
                                        </p>
                                    )}
                                </Dropbox>
                            )}


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
