import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { createEndPointUrl } from '../api/fetchRoutines/fetchAPI';

interface PicturesProps{
    pictureList: number[]
}

export function PicturesGuestSection(props:PicturesProps){
    return (
        <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {props.pictureList.map((id) => (
              <ImageListItem key={id}>
                <img
                  src={createEndPointUrl(`/images/${id}`)}
                  alt={`image ${id}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      );
}