import styled from "styled-components";

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
    }

    button:hover {
        background-color: transparent;
        border: solid 3px #fff;
        color: #fff;
        transition: .4s;
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
        text-decoration: dotted #2AE310;
    }
`;
