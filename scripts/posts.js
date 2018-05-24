var admin = require("firebase-admin");
var fs = require("fs");

var serviceAccount = require("./ADMINKEY_DO_NOT_UPLOAD.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vfghonlap-001.firebaseio.com"
});

var firestore = admin.firestore();

process.argv.forEach(function (val, index, array) {
  if(index === 2){
    fs.readFile('./scripts/post.md', 'utf8', (err, data) => {
      firestore.collection('posts/').doc(val.toString()).update({post: data});
    });
  }
});
