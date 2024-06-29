const db = require("../database");

//get all carts
exports.getAll = (req, res) => {
  db.cart
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cart.",
      });
    });
};

//get carts by id
exports.getCartById = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "user_id can not be empty!"
    });
    return
  }
  db.cart
    .findAll({
      where: {
        user_id: req.params.user_id,
      },
      include: { model: db.product},
    })
    .then((data) => {
      if(data.length === 0) {
        res.status(400).send({
          message: "This user has no cart!"
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cart.",
      });
    });
};
//Add a cart to the database
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "user id can not be empty!",
    });
    return;
  }
  if (!req.body.product_id) {
    res.status(400).send({
      message: "product_id can not be empty!",
    });
    return;
  }
  if (!req.body.quantity) {
    res.status(400).send({
      message: "quantity can not be empty!",
    });
    return;
  }
  db.cart
    .create({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding cart.",
      });
    });
};
//delete all items by user id
exports.deleteByUser = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "user_id can not be empty!"
    });
    return
  }
  db.cart.destroy({
    where: {
      user_id: req.params.user_id,
    },
  })
  .then((data)=>{
    if (data === 0) {
      res.status(400).send({message:"this user has 0 cart item"})
    } else {
      res.send(`deleted: ${data} row `);
    }})
  .catch((err)=>{
    console.log(err)
    res.status(500).send({
    message: err.message || "Some error occurred while deleting a cart row.",
  })});
};
//delete by user id && item id
exports.deleteOneCart = (req,res) => {
  const {product_id,user_id} = req.body;
  db.cart.destroy({
    where: {
      user_id: req.body.user_id,
      product_id:req.body.product_id
    },
  }).then((data)=>{
    if (data === 0) {
      res.status(400).send({message:"item not found"})
    } else {
      res.send(`deleted: ${data} row `);
    }})
  .catch((err)=>{
    console.log(err)
    res.status(500).send({
    message: err.message || "Some error occurred while deleting a cart row.",
  })});
}
//update the quantity by user id && item id
exports.update = (req,res) => {
  db.cart.update(
    {quantity:req.body.quantity},
    {
      where: {
        user_id: req.body.user_id,
        product_id:req.body.product_id
      },
    }
  ).then((data)=>{
    if (data[0] === 0) {
      res.status(400).send({message:"cart item not found or no updated"})
    } else {
      res.send(`quantity updated user id : ${req.body.user_id} product id: ${req.body.product_id} quantity: ${req.body.quantity} `);
    }})
  .catch((err)=>{
    console.log(err)
    res.status(500).send({
    message: err.message || "Some error occurred while deleting a cart row.",
  })});
}