//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Marta:Marta_7303@cluster0.zoc6w.mongodb.net/todolistDB", { useNewUrlParser: true });

const newSchema = {
  name: String
};

const Item = mongoose.model ("Item", newSchema); 

const item1 = new Item({
  name: "Welcome!"
});

const item2 = new Item({
  name: "Hit the + button to add an item."
});

const item3 = new Item({
  name: " <-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
  if (err){
    console.log(err)
  } else{
      console.log("Successfully saved default items to DB.")
    }
});

app.get("/", function(req, res) {


  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

  let port = process.env.PORT;
  if (port == null || port == "") {
  port = 3000;
}
 

app.listen(port, function() {
  console.log("Server has started successfully!");
});
