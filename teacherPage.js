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
    $('#addClass').on('click', addClass);
    $('#create').on('click', create, createCode);
}

function addClass(){
    //Get elements by ID
    var modal = document.getElementById('modal');
    var btn = document.getElementById('addClass');
    var span = document.getElementById('close')

    //Close modal
    modal.style.display = "block";
    $('#close').on('click', close);

    //Outside click 
    window.addEventListener("click", outsideClick);

    //Close modal function
    function close(){
        modal.style.display = "none";
    }

    //Outside click function
    function outsideClick(e){
        console.log("this is working");
        if(e.target == modal){
            modal.style.display = "none";
        }
    }
}

//send info to firebase function
function create(className, ref){
    //Get class name and size
    var className = $('#class').val();
    var classSize = $('#classSize').val();

    //Firebase ref
    var ref = firebase.database().ref('Classes').child(className);

    //Send to Firebase
    ref.push({
        Class:className,
        Size:classSize,
    });
    console.log("working");
}

function createCode(code, name, className){
    console.log(firebaseUser);
    // Create array with letters and numbers
    var letterNumbers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", 
    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    //Get code characters
    var randomNumber = Math.floor(Math.random() * 37);
    var letter1 = letterNumbers[randomNumber];
    var randomNumber = Math.floor(Math.random() * 37);
    var letter2 = letterNumbers[randomNumber];
    var randomNumber = Math.floor(Math.random() * 37);
    var letter3 = letterNumbers[randomNumber];
    var randomNumber = Math.floor(Math.random() * 37);
    var letter4 = letterNumbers[randomNumber];
    var randomNumber = Math.floor(Math.random() * 37);
    var letter5 = letterNumbers[randomNumber]; 

    //Make code
    var code = letter1 + letter2 + letter3 + letter4 + letter5;
    console.log(code);

    //Pull teacher name form Firebase 
    var pullName = firebase.database().ref("Teachers").child(firebaseUser.uid);
    pullName.once('value', function(snapshot){
        data = snapshot.val();
        name = data.Name;
    });

    //Get Firebase ref 
    var ref = firebase.database().ref('Codes').child(firebaseUser.uid);

    //Send Data
    ref.child(className).set({
        Code:code,
        URL:'studentBoard.html' + className,
    });
}

function appendElements(ref, code){
    ref.once("child_added", function(snapshot){
        data = snapshot.val();
        console.log("totally working");

        //Create display information elements
        var aTag = document.createElement("a");
        aTag.setAttribute('href', 'teachBoard.html?room=' + data.Class);
        aTag.textContent = data.Class;

        var code = document.createElement("h6");
        code.textContent = code;

        //Create div element
        var div = document.createElement("div");
        div.className = "data";
        div.appendChild(aTag);
        div.appendChild(code);

        //Append 'div' to HTML and screen
        document.getElementById("classes").appendChild(div);

    });
}
})();