const mongoose = require('mongoose');

const uri =
  'mongodb://MegaSport:12041989nur@ac-01emr7h-shard-00-00.tqzr7nw.mongodb.net:27017,ac-01emr7h-shard-00-01.tqzr7nw.mongodb.net:27017,ac-01emr7h-shard-00-02.tqzr7nw.mongodb.net:27017/MegaSport?ssl=true&replicaSet=atlas-oloscc-shard-0&authSource=admin&retryWrites=true&w=majority';

console.log(uri);

mongoose
  .connect(uri)
  .then(() => {
    console.log('MongoDB Connected');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });