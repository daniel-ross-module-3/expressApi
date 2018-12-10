const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
// import the Item model so we can do Task.find, etc. 

/* GET home page */
router.get('/items', (req, res, next) => {

  Item.find()
    .then((allTheItems) => {
      res.json(allTheItems)
  
    })
    .catch((err) => {
      res.json(err);
    })
});



router.get('/Item/details/:id', (req, res, next) => {
  
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

router.post('/Items/add-new', (req, res, next) => {
  Item.create({
    name: req.body.theTitle,
    description: req.body.theDescription,
    cost: req.body.itemCost,
    retailPrice: req.body.retailPrice,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    })
})


router.post('/Items/edit/:id', (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, {
    name: req.body.theTitle,
    description: req.body.theDescription,
    cost: req.body.itemCost,
    retailPrice: req.body.retailPrice
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


router.post('/Items/delete/:id', (req, res, next) => {
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