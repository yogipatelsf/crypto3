


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAP5CCCilffpX4Ovga205pE4Ors6b1jDyk",
    authDomain: "crypto3-424b9.firebaseapp.com",
    databaseURL: "https://crypto3-424b9.firebaseio.com",
    projectId: "crypto3-424b9",
    storageBucket: "crypto3-424b9.appspot.com",
    messagingSenderId: "1015211263452"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();
var i = 1
let crypto = new Blockchain();
var data;
database.ref().on('value', function (snapshot) {
	  data = snapshot.val();
	console.log(data);

	// creating the database--- - - - - - -  - - - -
	console.log('crypto');
	
	crypto.addBlock(new block(i, new Date() , {price: data.price, buy: data.buy}));
	console.log(crypto);
	console.log(crypto.chain[i].data);
  console.log('Is Blockchain Valid? '+ crypto.isChainValid());

  database.ref().set({
      time : crypto.chain[i].timestamp,
      ecoin: 'Bitcoin',
      data: crypto.chain[i].data,
      hash: crypto.chain[i].hash,
      email: 'example@gmail.com'
  })

  
})
 





