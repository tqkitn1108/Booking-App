import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function RatingR({star}) {
  const [value, setValue] = React.useState(star);

  return (
    <Box
      sx={{
        '& > legend': { mt: 4 },
      }}
    >
      
     
      <Rating name="read-only" value={value} readOnly />
    
    </Box>
  );
}