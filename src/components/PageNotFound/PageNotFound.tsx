import Grid from '@mui/material/Grid2';
import img from '../../assets/images/page-not-found.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface Props {
  title: string;
  description: string;
}

const Page404: FC<Props> = ({ title, description }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={1}>
        <Box component='img' src={img} alt='404' sx={{ width: '100%' }} />
      </Grid>
      <Grid size={11}>
        <Typography variant='h2'>{title}</Typography>
        <Typography component='div'>{description}</Typography>
      </Grid>
    </Grid>
  );
};

export default Page404;
