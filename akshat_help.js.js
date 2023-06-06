const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { fileURLToPath } = require("url");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    const firstName = req.body.Fname;
    const LastName = req.body.Lname;
    const email = req.body.Email;
  console.log(firstName);
  console.log(LastName);
  console.log(email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: LastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/06b8cecbb9";
  const options = {
    method: "POST",
    auth: "amit15000:d76f7fb61a7cef06a3c862765f5669ef-us21",

    //username akshat ka rahega
    
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(3000, () => console.log(`Server is listening on port 3000`));
// 4f8a11613e0eadc5d6534e8803a7a5a0-us12
// 1b94209840