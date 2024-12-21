import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import { useState } from 'react';
import { Textarea } from '@mui/joy';
import { toast } from 'react-toastify';
import { NewsMutation } from '../../../../types';
import ChooseFile from '../../../../components/chooseFile/ChooseFile.tsx';
import { selectCreateLoading } from '../../newsSlice.ts';
import { useAppSelector } from '../../../../app/hooks.ts';

interface Props {
  addNews: (oneNews: NewsMutation) => void;
}

const initialNews= {
  title: '',
  description: '',
  image: null,
}

const NewsForm: React.FC<Props> = ({addNews}) => {
  const [newNews, setNewNews] = useState<NewsMutation>(initialNews);
  const addLoading = useAppSelector(selectCreateLoading);

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newNews.title.trim().length > 0 && newNews.description.trim().length > 0 ) {
      addNews({...newNews});
      setNewNews(initialNews);
    } else {
      toast.error('If you want to add a new news, you should fill out the title and description!');
    }
  };

  const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setNewNews((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setNewNews((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }))
    }
  };

  return (
    <form onSubmit={onSubmit} style={{
      margin: '20px 10px',
      padding: '20px 10px',
    }}>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
          New publication
        </Typography>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            value={newNews.title}
            onChange={onChange}
            type="text"
          />
        </Grid>
        <Grid size={12}>
          <Textarea
            id="outlined-basic"
            variant="outlined"
            placeholder="Description..."
            minRows={3}
            value={newNews.description}
            name="description"
            onChange={onChange}
          />
        </Grid>
        <Grid size={12}>
          <ChooseFile
            getFile={getImage}
            label="Image"
            name="image"
          />
        </Grid>
        <Grid size={12}>
          <Button
            disabled={addLoading}
            sx={{width: '100%'}} variant="contained"
            type="submit">
            Save
            {addLoading ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewsForm;