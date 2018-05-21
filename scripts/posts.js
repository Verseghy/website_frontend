var admin = require("firebase-admin");
var moment = require("moment");
var fs = require("fs");

var serviceAccount = require("./ADMINKEY_DO_NOT_UPLOAD.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vfghonlap-001.firebaseio.com"
});

function padLeft(nr, n, str){
  return Array(n-String(nr).length+1).join(str||'0')+nr;
}

var firestore = admin.firestore();

firestore.collection('posts/').get().then(x => {
  x.forEach(y => {
    y.ref.delete();
  })
}).then(() => {
  fs.readFile('./posts.json', 'utf8', function (err, data) {

    console.log(err);

    var postsCollection = firestore.collection('posts');
  
    let dataJSON = JSON.parse(data);
    dataJSON.forEach( (elem, index) => {
      postsCollection.doc('p'+padLeft(elem.id, 3)).set({id: elem.id, author: elem.author, authorImage: elem.authorImage, date: null, description: elem.description, image: elem.image, title: elem.title});
    })
  })
});