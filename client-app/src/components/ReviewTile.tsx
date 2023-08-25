import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ReviewTile(props: PropertyReviewResult){
    return(
        <div className="flex flex-col p-3 border-2 border-main-petrol">
            <div className="flex justify-between text-lg font-bold items-center">
                <div className='flex gap-2 items-center'>
                    <div className='rounded-full bg-main-petrol text-white px-4 py-2'>
                        {props.guestUsername.charAt(0).toUpperCase() ?? ''}
                    </div>
                    <span>{props.guestUsername}</span>
                </div>
                <div>
                    {props.stars}
                    <FontAwesomeIcon icon={faStar} className="text-dark-petrol" />
                </div>
            </div>
            <div className='flex p-3 text-base'>
                {props.text}
            </div>
        </div>
    )
}