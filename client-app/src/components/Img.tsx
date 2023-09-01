import React, { useEffect, useMemo, useRef, useState } from "react";
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI";
import { CircularProgress } from "@mui/material";

type ImgProps = {
    imgId?: number | null
    height?: number
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export function Img(props: ImgProps) {
    const {imgId, ...domProps} = props;

    const cache = useRef<HTMLImageElement>(new Image());
    const [loading, setLoading] = useState(true);

    const imgSrc = useMemo(() => {
        if (!imgId) {
            return (
                props.src ?? "https://media.cntraveler.com/photos/5d112d50c4d7bd806dbc00a4/16:9/w_1280,c_limit/airbnb%20luxe.jpg"
            );
        }
        return createEndPointUrl(`/images/${imgId}`);
    }, [imgId]);

    useEffect(() => {
        setLoading(true)
        const imgElement = new Image(undefined, props.height);
        imgElement.src = imgSrc ?? '';

        imgElement.onload = () => {
            cache.current = imgElement;
            setLoading(false);            
        }
    }, [imgSrc]);

    return (        
        <div
            style={{
                height: props.height
            }}
            className={`${props.className} flex justify-center items-center flex-1`}>
            {
                loading ?
                <CircularProgress
                    size="3.5rem"
                />
                :
                <img
                    {...domProps}
                    className={`${props.className ?? ''} h-full`}
                    src={imgSrc}
                />
            }            
        </div>
    );    
}
