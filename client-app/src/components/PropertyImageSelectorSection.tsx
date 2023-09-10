import { useState } from "react";
import { ImageEntity } from "../api/entities/ImageEntity";
import { CheckboxWithLabel } from "./CheckboxWithLabel";
import { Checklist } from "./Checklist";
import { Img } from "./Img";
import { ImgUploadButton } from "./ImgUploadButton";
import { LoadingSpinner } from "./LoadingSpinner";
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI";

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
                ${props.isSelected ? 'border-dark-petrol ' : ''}
                flex flex-row items-center justify-between
            `}
            style={
                props.isSelected ?
                {
                    borderWidth: '3px',
                } : {}
            }
            onClick={() => {props.onClick(props.img)}}
        >
            Εικόνα {props.img.imgId}
            <CheckboxWithLabel
                label="Χρήση ως Κύρια"
                isChecked={props.img.isMain}
                setIsChecked={(isChecked) => props.onIsMainChange(isChecked, props.img)}
            />
        </button>
    );
}

export function PropertyImageSelectorSection({propertyId, images, setImages}: {
    propertyId?: number,
    images: ImageEntity[],
    setImages: (imgs: ImageEntity[]) => void
}) {
    const [loading, setLoading] = useState(false);
    const [selectedImgId, setSelectedImgId] = useState(
        images.length ? 
        (images.find(img => img.isMain)?.imgId ?? images[0].imgId)
        : -1
    );

    return (
        <div
            className="flex flex-col justify-start items-center relative gap-1 flex-1"
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
            <div className="h-96 max-w-2xl">
            {
                images.length ?
                <Img
                    imgId={selectedImgId}
                    height={384}
                    className="rounded-xl"
                />
                :
                <div className="flex justify-center items-center h-full">
                    Δεν υπάρχουν αποθηκευμένες εικόνες.
                </div>
            }
            </div>
            <ImgUploadButton
                onError={() => {}}
                onStartUpload={() => {
                    setLoading(true)
                }}
                onSuccess={(img) => {
                    setImages([...images, img]);
                    setSelectedImgId(img.imgId);
                    setLoading(false);
                }}
                uploadURL={createEndPointUrl(`/property/${propertyId ? (propertyId + '/') : ''}uploadImage`)}
                isNewImgMain={false}
            />
            <Checklist
                items={images}
                setItems={setImages}
                itemSerializer={img => img.imgId.toString()}
                itemRenderer={(img) => {
                    return <ImgListItem
                        img={img}
                        isSelected={selectedImgId === img.imgId}
                        onClick={(img) => setSelectedImgId(img.imgId)}
                        onIsMainChange={(isMain, targetImg) => {
                            setImages(
                                images.map(img => ({
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
    );
}
