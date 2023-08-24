import { useState } from "react";
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI";
import { ImgUploadButton } from "../components/ImgUploadButton";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function TestPage() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<number[]>([]);

    return (
        <div className="flex flex-col justify-center items-center relative">
        {
            loading ?
            <LoadingSpinner
                coverParent={true}
            />
            : undefined
        }
        {
            items.map(i => <span>{i}</span>)
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
        </div>
        
        
    )
}
