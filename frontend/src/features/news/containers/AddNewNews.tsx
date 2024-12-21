import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NewsWithoutId } from '../../../types';
import NewsForm from '../components/NewsForm/NewsForm.tsx';
import { postNews } from '../newsThunk.ts';

const AddNewNews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNews = async (oneNews: NewsWithoutId) => {
    await dispatch(postNews(oneNews));
    toast.success('Данная новость успешно создана!');
    navigate('/news');
  };

  return (
    <>
      <NewsForm addNews={addNews}/>
    </>
  );
};

export default AddNewNews;