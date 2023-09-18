import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import { ImageEntity } from '../api/entities/ImageEntity';

interface ContactHostProps{
    hostUsername: string,
    hostImg: ImageEntity | null,
    propertyId: number,
}

export function ContactHostSection(props:ContactHostProps){
    return(
        <div className='flex gap-2 items-start'>
            <UserAvatar
                imgId={props.hostImg?.imgId}
                username={props.hostUsername}
            />
            <div className='flex gap-2 font-bold text-lg flex-col items-start'>
                <span>Οικοδεσπότης: {props.hostUsername}</span>
                <Link
                    to={`/property/${props.propertyId}/chat`}
                >
                    <Button
                        className="flex max-w-fit rounded-full" variant="outlined"
                    >
                        Επικοινωνήστε με τον οικοδεσπότη {props.hostUsername}
                    </Button>                
                </Link>
            </div>
            
        </div>
    )
}
