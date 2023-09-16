const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//----- Database Connection ------//
const DB = process.env.DATABASE;

// Mongoose connect to the Atlasdb
mongoose
  .connect(DB, {
    // Deprecation warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection succesful');
  });

//----- Server is started on port -------//
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Running on port:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED 👈');
  server.close(() => {
    console.log('Process terminated');
  });
});
