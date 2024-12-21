import express from "express";
import {ResultSetHeader} from "mysql2";
import {INews, NewsWithoutId} from "../types";
import mysqlNews from "../mysqlNews";
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get('/', async (_req, res, next) => {
    try {
        const connection = await mysqlNews.getConnection();
        const [result] = await connection.query('SELECT id, title, image, create_date  FROM news');
        const news = result as INews[];

        res.send(news);
    } catch (e) {
        next(e);
    }
});

newsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send('This news id not found!');
    }

    try {
        const connection = await mysqlNews.getConnection();
        const [result] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
        const news = result as INews[];

        if (news.length === 0) {
            res.status(404).send("This news not found!");
        } else {
            res.send(news[0]);
        }

    } catch (e) {
        next(e);
    }
});

newsRouter.delete('/:id', async (req,res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send('News not found');
    }

    try {
        const connection = await mysqlNews.getConnection();
        const [result] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
        const oneNews = result as INews[];

        if (oneNews.length === 0) {
            res.status(404).send("This mews not found to delete!");
        }

        await connection.query('DELETE FROM comments WHERE news_id = ?', [id]);
        await connection.query('DELETE FROM news WHERE id = ?', [id]);

        res.send('This news has been successfully deleted with comments!');

    } catch (e) {
        next(e);
    }
});

newsRouter.post('/', imagesUpload.single('image'),  async (req, res, next) => {

    if (!req.body.title || !req.body.description) {
        res.status(400).send({error: 'Please send a title and a description!'});
        return;
    }

    const addNews: NewsWithoutId = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images' + req.file.filename : null,
    };

    try {
        const connection = await mysqlNews.getConnection();
        const [result] = await connection.query('INSERT INTO news (title, description, image) VALUES (?, ?, ?)', [addNews.title, addNews.description, addNews.image]);
        const resultHeader = result as ResultSetHeader;

        const [resultNews] = await connection.query('SELECT * FROM news WHERE id = ?', [resultHeader.insertId]);
        const oneNews = resultNews as INews[];

        if (oneNews.length === 0) {
            res.status(404).send("News not found!");
        } else {
            res.send(oneNews[0]);
        }

    } catch (e) {
        next(e);
    }
});

export default newsRouter;