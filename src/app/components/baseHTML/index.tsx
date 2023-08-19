import { NextPage } from "next";
import React from "react";
import { IBaseHTMLProps } from "./interface";

const BaseHTML: React.FC<IBaseHTMLProps> = ({title, taxonomy}) => (
    <html lang="ptbr">
        <head>
            <meta charSet="utf-8" />
            <title>{taxonomy}</title>
        </head>
        <body>
            {title}
        </body>
    </html>
);

export default BaseHTML;
