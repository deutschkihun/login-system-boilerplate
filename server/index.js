const express = require('express')
const app = express()
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found')
const users = require('./routes/users');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser')
const authentication = require('./middleware/authentication')
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const path = require('path');
require('dotenv').config();


const buildPath = path.join(__dirname, '..', 'build');
const clientBuildPath = path.join(__dirname, '..', '/build/index.html')

app.use(express.static(buildPath));
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());


app.use('/api/v1/auth',authentication,auth)
app.use('/api/v1/users',users)

app.route('/*').get(async (req,res) => {
  res.sendFile(path.resolve(clientBuildPath))
});

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5010;
const start = async(req,res,err,next) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}!`))
  } catch (error) {
    next(error)
  }
}

start();