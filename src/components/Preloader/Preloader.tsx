import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';

interface Props {
  open: boolean;
}

const Preloader: FC<Props> = ({ open }) => {
  return (
    <div>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default Preloader;
