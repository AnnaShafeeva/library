const express = require('express');
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/api', bookRouter);
app.use('/api', userRouter);
app.use('/public', express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});