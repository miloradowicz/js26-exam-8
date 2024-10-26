import { FC, useEffect, useState } from 'react';
import QuoteList from '../../components/QuoteList/QuoteList';
import { Category, Quote } from '../../types';
import { deleteQuote, getQuotes, getQuotesByCategory } from '../../lib/api';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryList from '../../components/CategoryList/CategoryList';
import Grid from '@mui/material/Grid2';

interface Props {
  categories: Category[];
  preloaderEnqueue: () => void;
  preloaderDequeue: () => void;
}

const QuoteViewer: FC<Props> = ({ categories, preloaderEnqueue, preloaderDequeue }) => {
  console.log('QuoteViewer render');

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const onEdit = (id: string) => navigate(`/quotes/${id}/edit`);

  const onDelete = async (id: string) => {
    try {
      preloaderEnqueue();

      await deleteQuote(id);
      navigate(0);
    } catch (err) {
      console.error(err);
    } finally {
      preloaderDequeue();
    }
  };

  useEffect(() => {
    const invokeGetQuotes = async () => {
      try {
        preloaderEnqueue();

        let data: Quote[];

        if (categoryId) {
          data = await getQuotesByCategory(categoryId);
        } else {
          data = await getQuotes();
        }

        setQuotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        preloaderDequeue();
      }
    };

    invokeGetQuotes();
  }, [categoryId, preloaderEnqueue, preloaderDequeue]);

  return (
    <>
      <Grid container>
        <Grid size={3}>
          <CategoryList categories={categories} />
        </Grid>
        <Grid size={9}>
          <QuoteList quotes={quotes} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      </Grid>
    </>
  );
};

export default QuoteViewer;
