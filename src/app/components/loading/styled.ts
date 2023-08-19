import styled from 'styled-components';

export const LoadAnimation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #101010;
    color: #fff;
    width: 100%;
    height: 100vh;
    animation: spin 2s infinite linear;
    overflow: hidden;

    .loadIcon {
        font-size: 16pt;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        25% {
            transform: rotate(90deg);
        }

        50% {
            transform: rotate(180deg);
        }

        75% {
            transform: rotate(270deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;
