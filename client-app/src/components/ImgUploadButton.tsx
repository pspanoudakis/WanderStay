import { fetchData } from "../api/fetchRoutines/fetchAPI";

const SUPPORTED_IMG_EXTENSIONS = [
    'image/*'
]

type SavedImgResponse = {
    id: number,
    main: boolean,
};

type ImgUploadButtonProps = {
    uploadURL: string
    onStartUpload: () => void,
    onSuccess: (newImgId: number) => void,
    onError: (obj: any) => void,
    isNewImgMain?: boolean, 
};

export function ImgUploadButton(props: ImgUploadButtonProps) {

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.onStartUpload();

            const formData = new FormData();
            formData.append('img', e.target.files[0], e.target.files[0].name);
            formData.append('isMain', `${Boolean(props.isNewImgMain)}`);
            fetchData({
                endpoint: props.uploadURL,
                method: 'POST',
                omitContentType: true,
                body: formData,
                useRawBody: true
            }).then(response => {
                if (response.ok) {
                    const savedImgResponse = response.content as SavedImgResponse;
                    props.onSuccess(savedImgResponse.id);
                } else {
                    props.onError(response);
                }
                
            }).catch(error => {
                props.onError(error);
            })
        }
    };

    return (
        <div className="flex flex-row justify-center items-center">
            <button
                className='
                    rounded-xl px-4 py-0.5
                    bg-main-petrol duration-300 hover:bg-dark-petrol
                    text-white font-semibold
                    cursor-pointer
                '
            >
                <label className="cursor-pointer" htmlFor="imgInput">Ανέβασμα Εικόνας</label>                
            </button>
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
