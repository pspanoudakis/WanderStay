import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { LoadingSpinner } from './LoadingSpinner';
import { PrimaryButton } from './PrimaryButton';
import { submitPropertyReview } from '../api/fetchRoutines/propertyAPI';
import { AppContext, openModal } from '../AppContext';
import { ModalActionResultTemplate } from './ModalActionResultTemplate';
import { useNavigateIfAuthenticationFailed } from '../hooks/useNavigateIfAuthenticationFailed';

interface WriteReviewProps {
    propertyId: number,
}

export function WriteReview(props: WriteReviewProps){

    const[stars, setStars] = useState<number | null>(null);
    const[reviewText, setReviewText] = useState("");
    const[loading, setLoading] = useState(false);

    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();
    const ctx = useContext(AppContext)

    function onSubmit(){
        if (stars){
            setLoading(true);
            submitPropertyReview({
                propertyId: props.propertyId,
                stars,
                text: reviewText
            }).then(
                (response) => {
                    if (navigateIfAuthFailed(response)) return;
                    openModal(ctx, {
                        content: () => 
                            <ModalActionResultTemplate
                                success={response.ok}
                                successText='Η υποβολή της κριτικής σας έγινε επιτυχώς.'
                                defaultErrorText='Δεν ήταν δυνατή η υποβολή της κριτικής σας.'
                                errorCode={response.error}
                            />
                    });
                    setLoading(false);
                }
            )
        }
    }

    return(
        <div className="flex relative flex-col py-3 px-4 border-2 border-main-petrol gap-4 items-center w-3/5">
            <Box
                sx={{
                    '& > legend': { mt: 2, fontSize: '20', fontWeight: 'bold'},
                }}
                >
                <Typography component="legend">Βαθμολογήστε την εμπειρία σας</Typography>
                <Rating
                    name="simple-controlled"
                    value={stars}
                    onChange={(e, newValue) => {
                        setStars(newValue);
                    }}
                />
            </Box>
             <TextareaAutosize
                //style={{width: "80%"}}
                minRows={4}
                maxRows={4} 
                placeholder="Γράψτε μία κριτική..."
                defaultValue={reviewText}
                className='flex w-full border-2 rounded-sm p-2 max-h-40 min-h-40 outline-none resize-none'
                onChange={(e) => setReviewText(e.target.value)}
            />
            <LoadingSpinner
                visible={loading}
                coverParent={true}
                text='Υποβολή κριτικής...'
            />
            <div className='flex justify-end w-full gap-3'>
                <PrimaryButton
                    onClick={onSubmit} 
                    disabled={stars===null}
                    classExtras='rounded-lg text-xl px-4 py-0.5'
                >
                    Υποβολή
                </PrimaryButton>
            </div>
        </div>
    )
}
