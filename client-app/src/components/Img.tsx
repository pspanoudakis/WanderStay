import React from "react";
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI";

type ImgProps = {
    imgId?: number | null
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export function Img(props: ImgProps) {
    const {imgId, ...domProps} = props;
    return (
        <img 
            {...domProps}
            src={
                imgId ?
                createEndPointUrl(`/images/${imgId}`)
                :
                "https://media.cntraveler.com/photos/5d112d50c4d7bd806dbc00a4/16:9/w_1280,c_limit/airbnb%20luxe.jpg"
            }            
        />
    );    
}
