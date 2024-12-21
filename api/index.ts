import express from "express";
import cors from "cors";
import mysqlNews from "./mysqlNews";
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    await mysqlNews.init();

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));