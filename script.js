
  const firebaseConfig = {
    apiKey: "AIzaSyCHPUEmg6NWBijbYou5X_o_Hc4Dw7oUOL0",
    authDomain: "contactform-2801b.firebaseapp.com",
    databaseURL: "https://contactform-2801b-default-rtdb.firebaseio.com",
    projectId: "contactform-2801b",
    storageBucket: "contactform-2801b.appspot.com",
    messagingSenderId: "121536702178",
    appId: "1:121536702178:web:b75f34b4008b2e309320bb"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var  contactFormDB = firebase.database().ref("contactForm")
 document.getElementById("contactForm").addEventListener("submit", submitForm);

 function submitForm(e){
    e.preventDefault();
    var Fname = document.getElementById("Fname").value
    var Sname = document.getElementById("Sname").value
    var Email = document.getElementById("Email").value
    var Message = document.getElementById("Message").value
    saveMessages(Fname,Sname,Email,Message)
 }
 const saveMessages =(Fname,Sname, Email, Message)=>{
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        FirstName: Fname,
        SureName: Sname,
        Email:Email,
        Message: Message
    });
    alert("form submited")
    document.getElementById("contactForm").reset ()
   fetchAndDisplayData()
 }
 const getElementById=(id)=>{
    return document.getElementById(id).value;
 }
// Function to fetch and display data from Firebase
function fetchAndDisplayData() {
    contactFormDB.once('value', function(snapshot) {
        console.log("Fetching data..."); // Log fetching action

        var tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = ""; // Clear existing data

        if (snapshot.exists()) {
            console.log("Data exists in Firebase:", snapshot.val()); // Log the data fetched

            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log("Child Data: ", childData); // Log each child data

                // Create a new row
                var row = tableBody.insertRow();

                // Insert cells and set their content
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.textContent = childData.FirstName || 'N/A';
                cell2.textContent = childData.SureName || 'N/A';
                cell3.textContent = childData.Email || 'N/A';
                cell4.textContent = childData.Message || 'N/A';
            });
        } else {
            console.log("No data available");
            tableBody.innerHTML = "<tr><td colspan='4'>No data available</td></tr>";
        }
    }, function (error) {
        console.error("Error fetching data: ", error); // Log any errors encountered
    });
}

// Call the function to fetch and display data when the page loads
window.onload = fetchAndDisplayData;
