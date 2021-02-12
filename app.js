const express = require("express");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();
var server = require("http").createServer(app);
// const io = require("socket.io")(server);
// const kafka = require("./Kafka/kafkaProducer");
const url = "https://www.hebcal.com/converter?cfg=json&";
const hostname = "127.0.0.1";

const port = 3700;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.post("/", function (req, res) {
  let answer = extract_fromUrl(req.query);
  let g = cal(answer);
  res.send(g);
});
function extract_fromUrl(postdata) {
  var headers = postdata.gregDate.split("/");
  let request =
    url +
    "gy=" +
    headers[2] +
    "&gm=" +
    headers[1] +
    "&gd=" +
    headers[0] +
    "&g2h=1";
  return request;
}
function cal(urlrequest) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", urlrequest, false);
  xmlHttp.send();
  var data = xmlHttp.responseText.split(",");
  let matches = data.filter((s) => s.includes("hebrew"));

  console.log(matches);
  return matches;
}

// http = require("http"); //The require
// const app = express();
// var MyServer = http.createServer(function(request, response) {
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("Hello World!");
//     response.end();
// });

// MyServer.listen(3000);

// console.log("Server running at http://localhost:3000/");
