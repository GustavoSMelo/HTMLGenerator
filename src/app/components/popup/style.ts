import styled from 'styled-components';

interface IPopType {
    poptype: 'fail' | 'success';
}

export const PopupContainer = styled.div<IPopType>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px;
    text-align: center;
    font-weight: bold;
    background-color: ${props => props.poptype === 'success' ? '#8DEB9E' : '#EB908E' };
`;
