const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");


  //const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=d3e40edc583983d22520b14690b5f987&units=metric";
  // https.get(url, function(resp){
  //   console.log(resp.statusCode);
  //   resp.on("data", function(data) {
  //       const wd = JSON.parse(data);
  //       const des = wd.weather[0].description;
  //       console.log(des);
  //       const ic = "http://openweathermap.org/img/wn/"+wd.weather[0].icon+"@2x.png"
  //       res.write("<h1>"+des+"</h1>");
  //       res.write("<img src="+ic+">");
  //       res.send();
  //   });
  // });
});

app.post("/",function(req,res) {
  console.log("receive");
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d3e40edc583983d22520b14690b5f987&units=metric";

  https.get(url, function(resp){
    // console.log(resp.statusCode);
    resp.on("data", function(data) {
        const wd = JSON.parse(data);
        const des = wd.weather[0].description;
        console.log(des);
        const ic = "http://openweathermap.org/img/wn/"+wd.weather[0].icon+"@2x.png"
        res.write("<h1>"+des+"</h1>");
        res.write("<img src="+ic+">");
        res.send();
    });
  });

});

app.listen(3000,function(){
  console.log("Started");
})
