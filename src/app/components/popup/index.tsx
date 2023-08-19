import React from "react"
import { IPopup } from "./interface"
import { PopupContainer } from "./style"

const Popup: React.FC<IPopup> = ({ popupType, text }) => {
    console.log(popupType);
    return (
        <PopupContainer poptype={popupType}>
            <h3>{text}</h3>
        </PopupContainer>
    )
}

export default Popup;
