import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar/Navbar';
import QuoteEditor from './containers/QuoteEditor/QuoteEditor';
import QuoteViewer from './containers/QuoteViewer/QuoteViewer';
import Page404 from './components/PageNotFound/PageNotFound';
import { Category } from './types';
import { useCallback, useEffect, useState } from 'react';
import { getCategories } from './lib/api';
import Preloader from './components/Preloader/Preloader';

function App() {
  console.log('App render');

  const [categories, setCategories] = useState<Category[]>([]);
  const [load, setLoad] = useState(0);

  const enqueue = useCallback(() => {
    setLoad((load) => load + 1);
  }, []);

  const dequeue = useCallback(() => {
    setLoad((load) => load - 1);
  }, []);

  useEffect(() => {
    const invokeGetCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    invokeGetCategories();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth='lg' sx={{ p: 2 }}>
        <Routes>
          <Route path='/' element={<QuoteViewer categories={categories} preloaderEnqueue={enqueue} preloaderDequeue={dequeue} />}>
            <Route path='quotes' element={null}>
              <Route path=':categoryId' element={null} />
            </Route>
          </Route>
          <Route
            path='/quotes/error'
            element={<Page404 title='Quote not found' description='The requested quote was not found. Please avoid tampering with HTML.' />}
          />
          <Route
            path='/quotes/update-error'
            element={<Page404 title="Couldn't update quote" description="Couldn't update quote for some reason. This shouldn't happen, ever." />}
          />
          <Route path='/quotes/:id/edit' element={<QuoteEditor categories={categories} preloaderEnqueue={enqueue} preloaderDequeue={dequeue} />} />
          <Route path='/add-quote' element={<QuoteEditor categories={categories} preloaderEnqueue={enqueue} preloaderDequeue={dequeue} />} />
          <Route path='*' element={<Page404 title='Page not found' description='The requested page was not found. Make sure the path is correct.' />} />
        </Routes>
      </Container>
      <Preloader open={load !== 0} />
    </>
  );
}

export default App;
