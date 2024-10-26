import { Quote } from '../../types';
import { FC, useCallback } from 'react';
import Grid from '@mui/material/Grid2';
import QuoteItem from './QuoteItem/QuoteItem';
import { Typography } from '@mui/material';
import { deleteQuote } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

interface Props {
  quotes: Quote[];
}

const QuoteList: FC<Props> = ({ quotes }) => {
  const navigate = useNavigate();

  const onEdit = useCallback((id: string) => navigate(`/quotes/${id}/edit`), [navigate]);

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await deleteQuote(id);
        navigate(0);
      } catch (err) {
        console.error(err);
      }
    },
    [navigate]
  );

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
