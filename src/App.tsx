import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar/Navbar';
import QuoteEditor from './containers/QuoteEditor/QuoteEditor';
import QuoteViewer from './containers/QuoteViewer/QuoteViewer';
import Page404 from './components/PageNotFound/PageNotFound';
import { Category } from './types';
import { useEffect, useState } from 'react';
import { getCategories } from './lib/api';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);

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
          <Route path='/' element={<QuoteViewer categories={categories} />}>
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
            element={<Page404 title="Couldn't update quote" description="Couldn't update quote for some reason. This shouldn't happen." />}
          />
          <Route path='/quotes/:id/edit' element={<QuoteEditor categories={categories} />} />
          <Route path='/add-quote' element={<QuoteEditor categories={categories} />} />
          <Route path='*' element={<Page404 title='Page not found' description='The requested page was not found. Make sure the path is correct.' />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
