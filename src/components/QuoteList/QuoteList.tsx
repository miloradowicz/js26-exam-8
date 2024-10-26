import { Quote } from '../../types';
import { FC } from 'react';
import Grid from '@mui/material/Grid2';
import QuoteItem from './QuoteItem/QuoteItem';
import { Typography } from '@mui/material';

interface Props {
  quotes: Quote[];
  onEdit: (_: string) => void;
  onDelete: (_: string) => void;
}

const QuoteList: FC<Props> = ({ quotes, onEdit, onDelete }) => {
  return (
    <>
      {!quotes.length ? (
        <Typography>There are no quotes yet</Typography>
      ) : (
        <Grid container spacing={1}>
          {quotes.map((x) => (
            <Grid size={{ xs: 12, lg: 6 }} key={x.id}>
              <QuoteItem quote={x} onEdit={() => onEdit(x.id)} onDelete={() => onDelete(x.id)} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default QuoteList;
