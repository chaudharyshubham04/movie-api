const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const ejs=require("ejs");
const request=require("request");
const myModule = require('./server.js') 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",function(req,res){
	res.render("home");
});

let val = myModule.key();

app.post("/",function(req,res){
 var movie=req.body.movie;
 
var options={
	url:"http://www.omdbapi.com/",
	method:"GET",
	qs:{
		apikey:val,
		t:movie
	}
	 
};
request(options,function(error,response,body){
	if(error){console.log(error)
	}else{
  var data=JSON.parse(body);
		res.send(data);
	}
}); 
 
 
});

app.listen(3000,function(){
	console.log("server started on port 3000")
});