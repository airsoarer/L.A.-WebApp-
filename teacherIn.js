(function(){
    $(document).ready(init);
    var config = {
    apiKey: "AIzaSyDtWe2pmfPdEktkQJgZaL3rKIBFHHNUwlc",
    authDomain: "la-webapp-95809.firebaseapp.com",
    databaseURL: "https://la-webapp-95809.firebaseio.com",
    projectId: "la-webapp-95809",
    storageBucket: "la-webapp-95809.appspot.com",
    messagingSenderId: "289441810877"
  };
function init(){
    firebase.initializeApp(config);
    $('#submit').on('click', Login);
    $('#signUp').on('click', signup)
    $('#create').on('click', sendInfo);
}

function Login(){
    var email = $('#emailI').val();
    var pass = $('#passI').val(); 

    var promise = firebase.auth().signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));

    stateChanged();
}

function signup(){
     //Get elements by ID
    var modal = document.getElementById('modal');
    var btn = document.getElementById('signUp');
    var span = document.getElementById('close')

    //Open Modal
    modal.style.display = "block";
    //Close modal
    $('#close').on('click', close);

    //Outside click 
    window.addEventListener("click", outsideClick);

    //Close modal function
    function close(){
        modal.style.display = "none";
    }

    //Outside click function
    function outsideClick(e){
        if(e.target == modal){
            modal.style.display = "none";
        }
    }
}

    function sendInfo(){
        //Get information values
        var email = $('#email').val();
        var pass = $('#pass').val();
        var name = $('#name').val();

        //Create user with createUserWithEmailAndPassowrd();
        var promise = firebase.auth().createUserWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));

        stateChanged(email,pass,name);
    }

function stateChanged(email,pass,name){
    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log(firebaseUser);
            console.log(firebaseUser.uid);
            //Create Firebase database ref
            var ref = firebase.database().ref('Teachers').child(firebaseUser.uid).set({
            Name:name,
            Email:email,
            Passowrd:pass,
        });
        setTimeout(replace, 2800);
        }else{
            console.log("Not Logged In");
        }

    });
}

function replace(){
    location.replace("teacherPage.html?room=" + name);
}
})();