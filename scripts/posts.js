var admin = require("firebase-admin");
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var serviceAccount = require("./ADMINKEY_DO_NOT_UPLOAD.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vfghonlap-001.firebaseio.com"
});

var firestore = admin.firestore();

askType();

function padLeft(nr, n, str){	
  return Array(n-String(nr).length+1).join(str||'0')+nr;	
}

function askType() {
  let post = Object;
  rl.question('Új hír hozzáadása/szerkesztése (a/e): ', a => {
    switch(a){
      case 'a':
        askAdd(post);
        break;

      case 'e':
        askEdit();
        break;

      default:
        console.warn('Csak a/e válasz fogadható el');
        askType();
        break;
    }
  });
}

function askAdd(post) {
  rl.question('ID: ', a => {
    if (a) post.id = a;
    rl.question('Author: ', a => {
      if (a) post.author = a;
      rl.question('Author Kép: ', a => {
        if (a) post.authorImage = a;
        rl.question('Dátum: ', a => {
          if (a) post.date = new Date(a);
          rl.question('Leírás: ', a => {
            if (a) post.description = a;
            rl.question('Kép: ', a => {
              if (a) post.image = a;
              rl.question('Cím: ', a => {
                if (a) post.title = a;
                fs.readFile('./scripts/post.md', 'utf8', (err, data) => {
                  if (data) post.post = data;
              
                  console.log('===');
                  console.log(post);
                  console.log('===');
                  askCorrect(post);
                });
              });
            });
          });
        });
      });
    });
  });
}

function askCorrect(post) {
  rl.question('Az alábbi adatok helyesek? (y/n): ', a => {
    switch(a){
      case 'y':
        addPost(post);
        break;

      case 'n':
        console.log('Megszakítva');
        askType();
        break;

      default:
        console.log('Csak y/n válasz fogadható el');
        break;
    }
  });
}

function addPost(post) {
  firestore.collection('posts/').doc('p'+padLeft(post.id, 3)).set({id: post.id, author: post.author, authorImage: post.authorImage, date: post.date, description: post.description, image: post.image, post: post.post, title: post.title}).then(x => {
    console.log('Sikeresen hozzáadva');
    askType();
  }).catch(x => {
    console.log('Valami hiba történt');
    console.log(x);
    process.exit();
  });
}

function askEdit() {
  rl.question('Post ID szerkesztésre: ', a => {
    firestore.collection('posts/').doc('p'+padLeft(parseInt(a), 3)).get().then(x => {
      console.log(x.data());
      askAdd(x.data());
    }).catch(x => {
      console.log('Valami hiba történt');
      console.log(x);
      process.exit();
    });
  });
}

