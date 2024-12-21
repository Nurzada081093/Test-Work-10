import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CommentWithoutId } from '../../../types';
import { addCommentSlice } from '../commentsSlice.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import { CircularProgress } from '@mui/material';

interface Props {
  addComment: (comment: CommentWithoutId) => void;
}

const initialComment = {
  description: '',
  author: '',
};

const CommentsForm:React.FC<Props> = ({addComment}) => {
  const [newComment, setNewComment] = useState<CommentWithoutId>(initialComment);
  const loaderPost = useAppSelector(addCommentSlice);

  const getNewComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewComment((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createNewComment = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newComment.description.trim().length === 0) {
      toast.error('Fill in the description!');
    } else {
      addComment({...newComment});
      setNewComment(initialComment);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 10,
        p: "19px",
        backgroundColor: "rgba(157,165,163,0.68)",
      }}
    >
      <form onSubmit={createNewComment}>
        <Stack spacing={1}>
          <Input
            type="text"
            value={newComment.author}
            id="author"
            name="author"
            onChange={getNewComment}
            placeholder="Enter your name..."
          />
          <Textarea
            value={newComment.description}
            id="description"
            name="description"
            onChange={getNewComment}
            placeholder="Enter your message..."
            minRows={3}
          />
          <Button type="submit"
                  disabled={loaderPost}
          >
            Send
            {loaderPost ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CommentsForm;
