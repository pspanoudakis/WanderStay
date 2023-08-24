import { useState } from "react";
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI";
import { ImgUploadButton } from "../components/ImgUploadButton";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function TestPage() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<number[]>([]);

    return (
        <div
            className="flex flex-col justify-start items-center relative"
            style={{
                minHeight: '8rem'
            }}
        >
            {
                loading ?
                <LoadingSpinner
                    coverParent={true}
                />
                : undefined
            }
            <ImgUploadButton
                onError={() => {}}
                onStartUpload={() => {
                    setLoading(true)
                }}
                onSuccess={(id) => {
                    setItems([...items, id])
                    setLoading(false);
                    console.log(id);
                }}
                uploadURL={createEndPointUrl(`/images`)}
                isNewImgMain={true}
            />
            {
                items.map(i => <span>{i}</span>)
            }            
        </div>
        
        
    )
}
