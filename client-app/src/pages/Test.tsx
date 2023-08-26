import { useEffect, useState } from "react";
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI";
import { ImgUploadButton } from "../components/ImgUploadButton";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Checklist } from "../components/Checklist";
import { Img } from "../components/Img";

type ImgListItemProps = {
    imgId: number,
    isSelected: boolean,
    onClick: (imgId: number) => void,
}

function ImgListItem(props: ImgListItemProps) {
    return (
        <button
            className={`px-4 border-2 rounded-xl flex-1 text-start ${props.isSelected ? 'bg-dark-petrol text-white' : 'hover:bg-light-petrol'}`}
            onClick={() => props.onClick(props.imgId)}
        >
            Εικόνα {props.imgId}
        </button>
    )
}

export function TestPage() {
    const [loading, setLoading] = useState(false);
    const [imgIds, setImgIds] = useState<number[]>([]);

    const [selectedImgId, setSelectedImgId] = useState(-1);

    useEffect(() => {
        setSelectedImgId(imgIds.length ? imgIds[0] : -1);
    }, [JSON.stringify(imgIds)])

    return (
        <div
            className="flex flex-col justify-start items-center relative gap-1 w-5/12"
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
            <div className="h-60">
            {
                imgIds.length ?
                <Img
                    imgId={selectedImgId >= 0 ? selectedImgId : undefined}
                    height={240}
                    className="rounded-xl"
                />
                :
                null
            }
            </div>
            <ImgUploadButton
                onError={() => {}}
                onStartUpload={() => {
                    setLoading(true)
                }}
                onSuccess={(id) => {
                    setImgIds([...imgIds, id])
                    setLoading(false);
                    console.log(id);
                }}
                uploadURL={createEndPointUrl(`/images`)}
                isNewImgMain={true}
            />
            <Checklist
                items={imgIds}
                setItems={setImgIds}
                itemRenderer={(imgId) => 
                    <ImgListItem
                        imgId={imgId}
                        isSelected={selectedImgId === imgId}
                        onClick={(id) => setSelectedImgId(id)}
                    />
                }
                title="Αποθηκευμένες Εικόνες"
                placeholder="Δεν υπάρχουν αποθηκευμένες εικόνες."
            />
        </div>        
    )
}
