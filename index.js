express = require("express");
app = express();
bodyParser = require("body-parser");
var https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

var optionsget = {
  host: "http-hunt.thoughtworks-labs.net", // here only the domain name
  // (no http/https !)
  // port : 443,
  path: "/challenge/input", // the rest of the url with parameters if needed
  method: "GET", // do GET
  headers: { userId: "CawvN5xPw" }
};

var optionspost = {
  host: "http-hunt.thoughtworks-labs.net", // here only the domain name
  // (no http/https !)
  // port : 443,
  path: "/challenge/output", // the rest of the url with parameters if needed
  method: "POST", // do GET
  headers: { "Content-Type": "application/json", userId: "CawvN5xPw" }
};

var para = "";
var textCount = 0;
var wordCount = 0;
var counta = 0;
var counte = 0;
var counti = 0;
var counto = 0;
var countu = 0;
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  // do the GET request
  var reqGet = https.request(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);

    res.on("data", function(d) {
      console.info("GET result:\n");
      //   process.stdout.write(d);
      para += d;

      // para = "This specification does not indicate the behavior, rendering or otherwise, of space characters other than those explicitly identified here as white space characters. For this reason, authors should use appropriate elements and styles to achieve visual formatting effects that involve white space, rather than space characters.For all HTML elements except PRE, sequences of white space separate 'words' (we use the term 'word' here to mean 'sequences of non-white space characters'). When formatting text, user agents should identify these words and lay them out according to the conventions of the particular written language (script) and target medium.";
      console.log("Para " + para);
      // console.log("Para length" + para.length);
      console.info("\n\nCall completed");
    });
    res.on("end", function() {
      para = JSON.parse(para).text;
      // textCount = para.length;
      // para = "My name is Khan. Why? Sure";
      // wordCount = para.split(/\?\s|\.\s/).length;

      for (var i = 0; i <= para.length - 1; i++) {
        //if a vowel, add to vowel count
        if (para.charAt(i) == "a" || para.charAt(i) == "A") {
          counta += 1;
        } else if (para.charAt(i) == "e" || para.charAt(i) == "E") {
          counte += 1;
        } else if (para.charAt(i) == "i" || para.charAt(i) == "I") {
          counti += 1;
        } else if (para.charAt(i) == "o" || para.charAt(i) == "O") {
          counto += 1;
        } else if (para.charAt(i) == "u" || para.charAt(i) == "U") {
          countu += 1;
        }
      }
      console.log("Total sentence count a " + counta);
      console.log("Total sentence count e " + counte);
      console.log("Total sentence count i " + counti);
      console.log("Total sentence count o " + counto);
      console.log("Total sentence count u " + countu);
      // console.log("Para letter" + textCount);
      // console.log("Para words" + wordCount);
      jsonObject = JSON.stringify({
        "output": {
          "a": counta,
          "e": counte,
          "i": counti,
          "o": counto,
          "u": countu
      }
      });
      reqPost = https.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
        // uncomment it for header details
        //  console.log("headers: ", res.headers);

        res.on("data", function(d) {
          console.info("POST result:\n");
          process.stdout.write(d);
          console.info("\n\nPOST completed");
        });
      });
      reqPost.write(jsonObject);
      reqPost.end();
      reqPost.on("error", function(e) {
        console.error(e);
      });
      return para;
    });
  });
  // console.log("Para reqGet" + reqGet);
  reqGet.end();
  reqGet.on("error", function(e) {
    console.error(e);
  });

  // res.json(para);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
