const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

    app.post("/", function (req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var emailAddress = req.body.email;

    var data = {
        members: [
            {email_address: emailAddress,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/cd5721ce9d",
        method: "POST",
        headers: {
          "Authorization": "sompodbd 672ef3185d55e21203dca9ef98a93a07-us4"
        },
       // body: jsonData
    };
    

    request(options, function(error, response, body){
        if (error) {
            res.sendFile(__dirname + "/failure.html");
            
            }
         else {
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
         } else {
             res.sendFile(__dirname + "/failure.html");
         }

        }
         
         
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(3000, function (req, res) {
    console.log("the server is running on port 3000");
});