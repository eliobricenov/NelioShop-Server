const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use('/', require('./controllers'));

//error handler middleware
app.use(require('./app/middlewares/error/errorHandler.middleware'));

app.listen(8000, () => {
    console.log('listening on por 8000');
})





