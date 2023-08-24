import { faStar , faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ReviewProp{
    guest?: string,
    date?: string,
    star?: number,
    text?: string
}


export function ReviewTile(props: ReviewProp){
    return(
        <div className="flex flex-col w-1/2 p-3 border-2 border-main-petrol">
            <div className="flex justify-between text-lg font-bold items-center">
                <div className='flex gap-2 items-center'>
                    <div className='rounded-full bg-main-petrol text-white px-4 py-2'>{props.guest?.charAt(0).toUpperCase()}</div>
                    <span>{props.guest}</span>
                </div>
                <div>
                    {props.star}
                    <FontAwesomeIcon icon={faStar} className="text-dark-petrol" />
                </div>
            </div>
            <div className='flex p-3 text-base'>
                {props.text}
            </div>
        </div>
    )
}