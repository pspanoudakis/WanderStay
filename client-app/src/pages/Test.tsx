import { useEffect, useState } from "react";
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI";
import { ImgUploadButton } from "../components/ImgUploadButton";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Checklist } from "../components/Checklist";
import { Img } from "../components/Img";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { ImageEntity } from "../api/entities/ImageEntity";

type ImgListItemProps = {
    img: ImageEntity,
    isSelected: boolean,
    onClick: (img: ImageEntity) => void,
    onIsMainChange: (isMain: boolean, img: ImageEntity) => void
}

function ImgListItem(props: ImgListItemProps) {
    return (
        <button
            className={`
                duration-200 px-4 border-2 rounded-xl 
                flex-1 text-start hover:bg-light-petrol 
                ${props.isSelected ? 'border-4 border-dark-petrol ' : ''}
                flex flex-row items-center justify-between
            `}
            onClick={() => {debugger; props.onClick(props.img)}}
        >
            Εικόνα {props.img.imgId}
            <CheckboxWithLabel 
                label="Χρήση ως Κύρια"
                isChecked={props.img.isMain}
                setIsChecked={(isChecked) => props.onIsMainChange(isChecked, props.img)}
            />
        </button>
    )
}

export function TestPage() {
    const [loading, setLoading] = useState(false);
    const [imgs, setImgs] = useState<ImageEntity[]>([]);

    const [selectedImgId, setSelectedImgId] = useState(-1);

    useEffect(() => {
        setSelectedImgId(imgs.length ? imgs[0].imgId : -1);
    }, [imgs.length])

    console.log(imgs)

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
            <div className="h-96">
            {
                imgs.length ?
                <Img
                    imgId={selectedImgId >= 0 ? selectedImgId : undefined}
                    height={384}
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
                onSuccess={(img) => {
                    setImgs([...imgs, img])
                    setLoading(false);
                    console.log(img);
                }}
                uploadURL={createEndPointUrl(`/property/uploadImage`)}
                isNewImgMain={false}
            />
            <Checklist
                items={imgs}
                setItems={setImgs}
                itemSerializer={img => img.imgId.toString()}
                itemRenderer={(img) => {
                    return <ImgListItem
                        img={img}
                        isSelected={selectedImgId === img.imgId}
                        onClick={(img) => setSelectedImgId(img.imgId)}
                        onIsMainChange={(isMain, targetImg) => {
                            setImgs(
                                imgs.map(img => ({
                                    imgId: img.imgId,
                                    isMain: (targetImg.imgId === img.imgId) ? isMain : false
                                }))
                            )
                        }}
                    />}
                }
                title="Αποθηκευμένες Εικόνες"
                placeholder="Δεν υπάρχουν αποθηκευμένες εικόνες."
            />
        </div>        
    )
}
