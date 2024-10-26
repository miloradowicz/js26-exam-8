import { FC, useEffect, useState } from 'react';
import QuoteList from '../../components/QuoteList/QuoteList';
import { Category, Quote } from '../../types';
import { getQuotes, getQuotesByCategory } from '../../lib/api';
import { useParams } from 'react-router-dom';
import CategoryList from '../../components/CategoryList/CategoryList';
import Grid from '@mui/material/Grid2';

interface Props {
  categories: Category[];
}

const QuoteViewer: FC<Props> = ({ categories }) => {
  console.log('QuoteViewer rendered');

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const invokeGetQuotes = async () => {
      try {
        let data: Quote[];

        if (categoryId) {
          data = await getQuotesByCategory(categoryId);
        } else {
          data = await getQuotes();
        }

        setQuotes(data);
      } catch (err) {
        console.error(err);
      }
    };

    invokeGetQuotes();
  }, [categoryId]);

  return (
    <>
      <Grid container>
        <Grid size={3}>
          <CategoryList categories={categories} />
        </Grid>
        <Grid size={9}>
          <QuoteList quotes={quotes} />
        </Grid>
      </Grid>
    </>
  );
};

export default QuoteViewer;
