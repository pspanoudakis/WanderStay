import { ImageEntity } from "../api/entities/ImageEntity";
import { FetchDataResponse, fetchData } from "../api/fetchRoutines/fetchAPI";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";
import { PrimaryButton } from "./PrimaryButton";

const SUPPORTED_IMG_EXTENSIONS = [
    'image/*'
]

type ImgUploadButtonProps = {
    uploadURL: string
    onStartUpload: () => void,
    onSuccess: (newImg: ImageEntity) => void,
    onError: (response: FetchDataResponse<unknown>) => void,
    isNewImgMain?: boolean, 
};

export function ImgUploadButton(props: ImgUploadButtonProps) {

    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.onStartUpload();

            const formData = new FormData();
            formData.append('img', e.target.files[0], e.target.files[0].name);
            formData.append('isMain', `${Boolean(props.isNewImgMain)}`);
            fetchData({
                endpoint: props.uploadURL,
                method: 'POST',
                useJwt: true,
                omitContentType: true,
                body: formData,
                useRawBody: true
            }).then(response => {
                if (navigateIfAuthFailed(response)) return;
                if (response.ok) {
                    const savedImgResponse = response.content as ImageEntity;
                    props.onSuccess(savedImgResponse);
                } else {
                    props.onError(response);
                }
                
            }).catch(error => {
                props.onError(error);
            });
        }
    };

    return (
        <div className="flex flex-row justify-center items-center">
            <PrimaryButton>
                <label className="cursor-pointer" htmlFor="imgInput">Ανέβασμα Εικόνας</label>                
            </PrimaryButton>
            <input 
                id="imgInput" name="img"
                className="hidden" 
                type="file" 
                accept={SUPPORTED_IMG_EXTENSIONS.join(", ")}
                onChange={uploadImage} 
            />
        </div>
    );
}
