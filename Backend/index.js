const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
connectToMongo();
const app = express();

const port = 3001;
app.use(cors());
app.use(express.json());

app.use(express.static('uploads'))
app.use('/api/userauth', require('./Routes/userauth'));
app.use('/api/recipe', require('./Routes/recipe'));
app.use('/api/fileupload', require('./Routes/fileupload'));

app.get('/', (res, req) => {
    res.send('Backend is Working Fine')
});

app.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`);
})



