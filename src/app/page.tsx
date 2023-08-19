"use client";

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Dropbox } from './styles/page.style';
import { TfiImport } from 'react-icons/tfi';
import { SiMicrosoftexcel } from 'react-icons/si';
import GlobalStyle from './styles/global.style';
import processFile from './components/processFile';

const Home = () => {
    const [file, setFile] = useState<File>();
    const { acceptedFiles, getInputProps, getRootProps } = useDropzone();

    useEffect(() => {
        setFile(acceptedFiles[0]);
    }, [acceptedFiles]);

    const handleFile = () => {
        file ? processFile(file) : console.error("sem arquivo");
    };

    return (
        <>
            <Container>
                <h1>HTML Generator</h1>

                <p>Import a csv/xls file to generate a html for each line</p>

                <Dropbox {...getRootProps()}>
                    <input
                        {...getInputProps()}
                        accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                    <TfiImport className='importIcon' />
                    <p>Drag and drop some files here, or click to select files</p>

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
            <GlobalStyle />
        </>
    );
};

export default Home;
