const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const { errors } = require('celebrate');


const app = express();


const { currentPORT, baseUrl } = require('./utils/config');

const limiter = require('./middlewares/limiter');

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandler');

const { corsHandler } = require('./middlewares/corsHandler');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(baseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


app.use(corsHandler);

app.use(requestLogger);

// app.use(limiter);

app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);


app.listen(currentPORT);
