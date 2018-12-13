const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
// import the Item model so we can do Task.find, etc. 

/* GET home page */
router.get('/items', (req, res, next) => {

  Item.find({ company: req.user._id })
    .then((allTheItems) => {
      res.json(allTheItems)
    })
    .catch((err) => {
      res.json(err);
    })
});



router.get('/items/details/:id', (req, res, next) => {
  
  Item.findById(req.params.id)
    // grab the id from req.params and use it to find the Item in the db
    .then((theItem) => {
      res.json(theItem);
      //  then we simple render json for all the info about that Item  
    })
    .catch((err) => {
      res.json(err);
    })
})

router.post('/items/add-new', (req, res, next) => {
  console.log("------------ ", req.body.theTitle);
  Item.create({
    name: req.body.theTitle,
    description: req.body.theDescription,
    itemCost: req.body.itemCost,
    retailPrice: req.body.retailPrice,
    quantity: req.body.quantity,
    company:req.user._id
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
})


router.post('/items/edit/:id', (req, res, next) => {

  console.log(req.params, req.body)
  Item.findByIdAndUpdate(req.params.id, {
    name: req.body.theTitle,
    description: req.body.theDescription,
    cost: req.body.itemCost,
    retailPrice: req.body.retailPrice,
    quantity: req.body.quantity
  })
    .then((response) => {
      if (response === null) {
        res.json({ message: 'sorry we could not find this Item' })
        return;
      }
      res.json([{ message: 'this Item has been successfully updated' },
        response])
      // res.json simply needs to take an array or object as the argument
      // it just happens that we usually pass it the thing we get back from the DB
      // however, you can put your own message in there if you want like so

    })
    .catch((err) => {
      res.json(err)
    })
})


router.post('/items/delete/:id', (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then((deletedItem) => {
      if (deletedItem === null) {
        res.json({ message: 'sorry this Item could not be found' })
        return;
      }

      res.json([
        { message: 'Item succesfully deleted' },
        deletedItem
      ])
    })
    .catch((err) => {
      res.json(err)
    })
})







module.exports = router;