//basic configuration to start express server 
import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import fileUpload from 'express-fileupload';

export const app = express();

app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(router)
const port = process.env.PORT || 5010;
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(express.static('public'));
