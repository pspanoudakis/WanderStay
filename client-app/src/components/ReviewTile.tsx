import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropertyReviewResult } from '../api/responses/PropertyReviewResult';
import { UserAvatar } from './UserAvatar';

export function ReviewTile(props: PropertyReviewResult){
    return(
        <div className="flex flex-col py-3 px-4 border-2 border-main-petrol gap-3">
            <div className="flex justify-between text-lg items-center">
                <div className='flex gap-2 items-center'>
                    <UserAvatar
                        imgId={props.guestImg?.imgId}
                        username={props.guestUsername}
                    />
                    <span className='font-bold'>{props.guestUsername}</span>
                </div>
                <div className='flex items-center gap-1'>
                    {props.stars}
                    <FontAwesomeIcon icon={faStar} className="text-dark-petrol" />
                </div>
            </div>
            <div className='flex p-2 text-base'>
                {props.text}
            </div>
        </div>
    )
}
