import { FC } from 'react';
import { Category } from '../../types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

interface Props {
  categories: Category[];
}

const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <List>
      {categories.map((x) => (
        <ListItem key={x.id} to={`/quotes/${x.id}`} disablePadding component={Link}>
          <ListItemText primary={x.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
