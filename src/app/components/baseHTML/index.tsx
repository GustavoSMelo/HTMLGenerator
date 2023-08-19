import React from "react";
import { IBaseHTMLProps } from "./interface";

const BaseHTML: React.FC<IBaseHTMLProps> = ({ title, taxonomy }) => (
    <html>
        <head></head>
        <body>
            {title}
        </body>
    </html>
);

export default BaseHTML;
