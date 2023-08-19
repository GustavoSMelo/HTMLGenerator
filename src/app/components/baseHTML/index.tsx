import React from "react";
import { IBaseHTMLProps } from "./interface";

const BaseHTML: React.FC<IBaseHTMLProps> = ({ title, taxonomy }) => (
    <html>
        <head></head>
        <body>
            <h1>{title}</h1>
        </body>
    </html>
);

export default BaseHTML;
