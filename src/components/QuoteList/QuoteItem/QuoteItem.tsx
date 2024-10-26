import { Quote } from '../../../types';
import { FC, memo } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteQuote } from '../../../lib/api';
import Stack from '@mui/material/Stack';

interface Props {
  quote: Quote;
}

const QuoteItem: FC<Props> = ({ quote: { id, author, text } }) => {
  const navigate = useNavigate();

  const onDelete = async () => {
    try {
      await deleteQuote(id);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card variant='outlined' sx={{ minWidth: 275 }}>
      <Stack>
        <CardContent>
          <Typography component='div'>{text}</Typography>
          <Typography component='div' textAlign='end'>
            {author}
          </Typography>
        </CardContent>
        <CardActions>
          <Button to={`/quotes/${id}/edit`} component={RouterLink}>
            <EditIcon />
          </Button>
          <Button size='small' onClick={onDelete}>
            <DeleteIcon />
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default memo(
  QuoteItem,
  (prev, next) => prev.quote.id === next.quote.id && prev.quote.author === next.quote.author && prev.quote.text === next.quote.text
);
