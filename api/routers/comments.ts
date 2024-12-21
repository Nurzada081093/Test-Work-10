import express from "express";
import {ResultSetHeader} from "mysql2";
import mysqlNews from "../mysqlNews";
import {CommentWithoutId, IComment} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    const newsId = req.query.news_id;

    try {
        const connection = await mysqlNews.getConnection();

        if (newsId) {
            const [result] = await connection.query(`SELECT * FROM comments WHERE news_id = ${newsId}`);
            const comments = result as IComment[];
            res.send(comments);
        } else {
            const [result] = await connection.query('SELECT * FROM comments');
            const comments = result as IComment[];
            res.send(comments);
        }

    } catch (e) {
        next(e);
    }
});

commentsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send('This comment not found');
    }

    try {
        const connection = await mysqlNews.getConnection();
        const [result] = await connection.query('SELECT * FROM comments WHERE id = ?', [id]);
        const comments = result as IComment[];

        if (comments.length === 0) {
            res.status(404).send("Comments not found");
        } else {
            res.send(comments[0]);
        }

    } catch (e) {
        next(e);
    }
});

commentsRouter.delete('/:id', async (req,res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send('Comment id not found');
    }

    try {
        const connection = await mysqlNews.getConnection();
        const [result] = await connection.query('SELECT * FROM comments WHERE id = ?', [id]);
        const comments = result as IComment[];

        if (comments.length === 0) {
            res.status(404).send("Comment not found to delete!");
        } else {
            await connection.query('DELETE FROM comments WHERE id = ?', [id]);
            res.send('This comment has been successfully deleted!');
        }

    } catch (e) {
        next(e);
    }
});

commentsRouter.post('/', async (req, res, next) => {

    if (!req.body.news_id || !req.body.description) {
        res.status(400).send({error: 'Please send a news_id and description!'});
        return;
    }

    let author;

    if (req.body.author) {
        author = req.body.author;
    } else {
        author = 'Anonymous';
    }

    const addComment: CommentWithoutId = {
        news_id: req.body.news_id,
        author,
        description: req.body.description
    };

    try {
        const connection = await mysqlNews.getConnection();

        const [newsResult] = await connection.query('SELECT * FROM news WHERE id = ?', [addComment.news_id]);
        const oneCommentResult = newsResult as IComment[];

        if (oneCommentResult.length === 0) {
            res.status(404).send('There is no such news yet. If you want to add this comment, please add it to the news list!');
            return;
        }

        const [result] = await connection.query('INSERT INTO comments (news_id, author, description) VALUES (?, ?, ?)', [addComment.news_id, addComment.author, addComment.description]);
        const resultHeader = result as ResultSetHeader;

        const [resultComment] = await connection.query('SELECT * FROM comments WHERE id = ?', [resultHeader.insertId]);
        const oneComment = resultComment as IComment[];

        if (oneComment.length === 0) {
            res.status(404).send("Comment not found");
        } else {
            res.send(oneComment[0]);
        }

    } catch (e) {
        next(e);
    }
});

export default commentsRouter;