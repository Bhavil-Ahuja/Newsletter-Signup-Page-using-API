const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const first = req.body.fname;
    const last = req.body.lname;
    const email = req.body.emailadd;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: first,
                LNAME: last
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/38bf1102d3"
    const options = {
        method: "POST",
        auth: "bhavil_18:82b45cea6df3e947099e460830456de2-us20",
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else
            res.sendFile(__dirname + "/failure.html");
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Project started on port 3000");
})

//API 
//82b45cea6df3e947099e460830456de2-us20
//unique id
//38bf1102d3