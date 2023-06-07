const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const request = require('request')


const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.static("public"));



app.get( '/', function(req, res){

    res.sendFile(__dirname+"/signup.html")

})

app.post('/', function (req, res) {

  //   console.log(req.body);
  // res.send('POST request to the homepage')

  const firstName = req.body.Fname;
  const LastName = req.body.Lname;
  const email = req.body.Email;
  const password = req.body.password;


  const data = {
    
        members : [{

          email_address : email,
          status : "subscribed",
          merge_fields :{
            FNAME : firstName,
            LNAME : LastName
          }
        }

        ]
        
 
        };

 
var jsonData = JSON.stringify(data)  ;
const url = "https://us21.api.mailchimp.com/3.0/lists/06b8cecbb9"

const options = {
  method  : "Post",
  auth : "amit15000:ca1a22837c5a975ca9574a4aba38c062-us21"
}

const request = https.request(url, options, function(response){

  if(response.statusCode===200)
  {
    //message
    // res.send("Succesfully subscribed")
    res.sendFile(__dirname+"/success.html")
  }
  else
    {
      res.sendFile(__dirname+"/failure.html")
    }




  response.on("data", function(data){
    console.log(JSON.parse(data));
  });

});


request.write(jsonData)
request.end()
  
});



// this redirect is not working for me
// app.post("/failure", function(req,res){
//   res.redirect("/");
// });




// app.listen(port, () => console.log(`News-Letter Signup listening on port ${port}!`))
app.listen(process.env.PORT || 3000, () => console.log(`News-Letter Signup listening on port ${port}!`))

// API key
// d76f7fb61a7cef06a3c862765f5669ef-us21
// ca1a22837c5a975ca9574a4aba38c062-us21

// audience id
// 06b8cecbb9
