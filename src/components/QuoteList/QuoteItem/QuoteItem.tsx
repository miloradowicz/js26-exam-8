import { Quote } from '../../../types';
import { FC, memo } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

interface Props {
  quote: Quote;
  onEdit: () => void;
  onDelete: () => void;
}

const QuoteItem: FC<Props> = ({ quote: { author, text }, onEdit, onDelete }) => {
  return (
    <Card variant='outlined' sx={{ minWidth: 275 }}>
      <Stack>
        <CardContent>
          <Typography component='div'>{text}</Typography>
          <Typography component='div' textAlign='end'>
            &mdash; {author}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={onEdit}>
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
  (prev, next) =>
    prev.quote.id === next.quote.id &&
    prev.quote.author === next.quote.author &&
    prev.quote.text === next.quote.text &&
    prev.onEdit === next.onEdit &&
    prev.onDelete === next.onDelete
);
