import FormControl from '@mui/material/FormControl';
import { Category, QuoteChunk } from '../../types';
import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { createQuote, getQuote, updateQuote } from '../../lib/api';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

interface Props {
  categories: Category[];
  preloaderEnqueue: () => void;
  preloaderDequeue: () => void;
}

interface FormData {
  categoryId: string;
  author: string;
  text: string;
}

const QuoteEditor: FC<Props> = ({ categories, preloaderEnqueue, preloaderDequeue }) => {
  const [data, setData] = useState<FormData>({ categoryId: '', author: '', text: '' });
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const invokeGetQuote = async () => {
      try {
        preloaderEnqueue();

        if (id) {
          const data = await getQuote(id);

          if (!data) {
            throw new Error('Post not found');
          }

          setData({ categoryId: data.categoryId, author: data.author, text: data.text });
        }
      } catch (err) {
        console.error(err);

        navigate('/quotes/error');
      } finally {
        preloaderDequeue();
      }
    };

    invokeGetQuote();
  }, [id, navigate, preloaderEnqueue, preloaderDequeue]);

  const onChange = (e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const validateData = (chunk: QuoteChunk) => {
    return chunk.categoryId && chunk.author && chunk.text;
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const invokeCreateOrUpdateQuote = async (chunk: QuoteChunk, id?: string) => {
      if (validateData(chunk)) {
        try {
          preloaderEnqueue();

          if (id) {
            await updateQuote(id, chunk);
          } else {
            await createQuote(chunk);
          }

          navigate(-1);
        } catch (err) {
          console.error(err);
          navigate('/quotes/update-error');
        } finally {
          preloaderDequeue();
        }
      }
    };

    invokeCreateOrUpdateQuote(data, id);
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        {id ? 'Edit quote' : 'Add new quote'}
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid container size={5} spacing={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor='category'>Category</InputLabel>
              <Select id='category' name='categoryId' aria-describedby='category-helper-text' value={data.categoryId} onChange={onChange}>
                {categories.map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id='category-helper-text'>Select a category for the quote</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='author'>Author</InputLabel>
              <Input id='author' name='author' aria-describedby='author-helper-text' value={data.author} onChange={onChange} />
              <FormHelperText id='author-helper-text'>Enter the author of the quote</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField placeholder='Your quote...' id='text' name='text' aria-describedby='text-helper-text' value={data.text} onChange={onChange} />
              <FormHelperText id='text-helper-text'>Enter the quote</FormHelperText>
            </FormControl>
            <Button type='submit'>Save</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default QuoteEditor;
