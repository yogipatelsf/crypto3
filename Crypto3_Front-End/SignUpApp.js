// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLDoyY_6EhynlDaIpQUX74cZIBTa1LR1U",
    authDomain: "auth-crypto.firebaseapp.com",
    databaseURL: "https://auth-crypto.firebaseio.com",
    projectId: "auth-crypto",
    storageBucket: "",
    messagingSenderId: "343471186773"
  };
  
  firebase.initializeApp(config);


  //getting inputs

  const txtEmail = $('#inputEmail');
  const txtPassword = $('#inputPassword');
  const btnsignin = $('#btnsignin');
  const btnsignup = $('#btnsignup');
  const btnlogout = $('#btnlogout');
  btnlogout.css({display: 'none'});


  btnsignin.on('click', e => {
  	e.preventDefault();
    btnlogout.css({display: ''});
  	// get data
  	const email = txtEmail.val();
  	const pass =  txtPassword.val();
  	const auth = firebase.auth();

  	txtEmail.val('');
    txtPassword.val('');

  	
//Sign in
 const promise = auth.signInWithEmailAndPassword(email, pass);
        
       promise
       		.catch(e => {
       			alert(e.message);
       			console.log(e.message);
       		});
    

  })

  //add signup event
  btnsignup.on('click', e => {
  	e.preventDefault();
  	// get data
  	const email = txtEmail.val();
  	const pass = txtPassword.val();
  	const auth = firebase.auth();
  	
//Sign up
 	const promise = auth.createUserWithEmailAndPassword(email, pass);
        
       promise.catch(e => {
       	alert(e.message);
       	console.log(e.message);
       	});

       txtEmail.val('');
       txtPassword.val('');
  })

  btnlogout.on('click', e => {
  	firebase.auth().signOut();

  })


  firebase.auth().onAuthStateChanged(firebaseUser => {

  	if (firebaseUser) {
  		console.log(firebaseUser);
  		btnlogout.css({display:''});
  		btnsignin.css({display: 'none'});
  		btnsignup.css({display: 'none'});
  	}else{
  		console.log('not logged in');
  		btnlogout.css({display: 'none'})
  	  btnsignin.css({display: ''});
      btnsignup.css({display: ''});
    }


    var user = firebase.auth().currentUser;
    var email, Uid;

    if (user != null) {
     
     email = user.email;
     Uid = user.uid;
       console.log(email);
       console.log(Uid);

   }

  })








