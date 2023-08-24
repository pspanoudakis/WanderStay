import Button from '@mui/material/Button';

interface ContactHostProps{
    host?: string
}

export function ContactHostSection(props:ContactHostProps){
    return(
        <div className='flex gap-2 items-start'>
            <div className='rounded-full h-fit bg-main-petrol text-white px-4 py-2'>{props.host?.charAt(0).toUpperCase()}</div>
            <div className='flex gap-2 font-bold text-lg flex-col items-start'>
                <span>Οικοδεσπότης: {props.host}</span>
                <Button className="flex max-w-fit rounded-full" variant="outlined">Επικοινωνήστε με τον οικοδεσπότη {props.host}</Button>
            </div>
            
        </div>
    )
}