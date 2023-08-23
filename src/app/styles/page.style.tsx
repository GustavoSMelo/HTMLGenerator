import styled from "styled-components";
import { IOption } from "./page.interface";

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #101010;
    flex-direction: column;

    h1 {
        margin-top: 60px;
    }

    button {
        margin-top: 30px;
        padding: 30px 120px;
        color: #000;
        cursor: pointer;
        font-size: 14pt;
        border: none;
        border-radius: 10px;
        transition: .4s;
        margin-bottom: 30px;
    }

    button:hover {
        background-color: transparent;
        border: solid 3px #fff;
        color: #fff;
        transition: .4s;
    }

    @media screen and (max-width: 400px) {
        p {
            margin: 0 2.3rem;
        }

        button {
            max-width: 80%;
            padding: 30px 27.5% !important;
        }
    }
`;

export const Dropbox = styled.div`
    margin-top: 70px;
    padding: 180px;
    cursor: pointer;
    border: 2px dotted #606060;
    border-radius: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;


    .importIcon {
        font-size: 26pt;
        margin-bottom: 30px;
    }

    .fileInformation {
        margin-top: 10px;
    }

    .fileInformation > span {
        margin-left: 10px;
    }

    @media screen and (max-width: 768px) {
        max-width: 80%;
        padding: 27.5%;
    }

    @media screen and (max-width: 400px) {
        padding: 27.5% 30px;
    }
`;

export const OptionButtons = styled.div<IOption>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    button {
        padding: 10px 40px;
        cursor: pointer;
        font-size: 14pt;
        border: none;
        border-radius: 10px;
    }

    .btnFile {
        background-color: ${props => props.option === 'file' ? "#101010" : "#fff"};
        color: ${props => props.option === 'file'? "#fff" : "#101010"};
        border: solid 3px ${props => props.option === 'file'? "#fff" : "#101010"};
    }

    .btnTemplate {
        background-color: ${props => props.option === 'template' ? "#101010" : "#fff"};
        color: ${props => props.option === 'template'? "#fff" : "#101010"};
        border: solid 3px ${props => props.option === 'template'? "#fff" : "#101010"};
    }

    @media screen and (max-width: 400px) {
        flex-direction: column;
        justify-content: center;

        button {
            max-width: fit-content;
        }
    }
`;
