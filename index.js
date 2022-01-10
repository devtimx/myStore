const express = require('express');
const cors = require('cors');
const routerApi = require('./routers/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('access denied'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send("Hola mi server en express");
});

app.get('/nuevaRuta', (req, res) => {
  res.send("Hola es una nueva rura");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () => {
  console.log("Run server in port: " + port);
});
