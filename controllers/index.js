const Products = require("../modals/ECommerceSchema");

// Here we are creating a product
module.exports.create = async function (req, res) {
  try {
    let createdProduct = await Products.create({
      name: req.body.name,
      quantity: req.body.quantity,
    });

    return res.status(200).json({
      success: true,

      data: {
        product: createdProduct,
      },
      message: " created successfully ",
    });
  } catch (e) {
    console.log("ERROR", e);
    return res.status(500).json({
      success: false,
      message: e.getMessage,
    });
  }
};

// Here we are getting  all the product items
module.exports.GetProducts = async function (req, res) {
  try {
    // const id = req.params.id
    const Data = await Products.find({}).sort({ quantity: 1 });
    if (!Data) {
      return res.status(404).json({
        data: {
          message: "Product Not Found  ",
        },
      });
    }
    res.status(200).json({
      data: {
        products: Data,
      },
    });
  } catch (e) {
    res.status(500).json({
      data: {
        message: "Oops || Error Occurred ",
      },
    });
  }
};

// Here we are getting  product items by id
module.exports.GetProductsByID = async function (req, res) {
  try {
    const id = req.params.id;
    const DataById = await Products.findById(id);
    if (!DataById) {
      res.status(404).json({
        data: {
          message: "Product not found ",
        },
      });
    }
    res.send(DataById);
  } catch (err) {
    res.status(500).json({
      data: {
        message: "Oops || Error Occurred ",
      },
    });
  }
};

// Here we are updating a product item using by id
module.exports.update = async function (req, res) {
  try {
    const id = req.params.id;

    const updateProduct = await Products.findById(id);
    // console.log(typeof req.query.number);
    let preQuantity = updateProduct.quantity;
    updateProduct.quantity = Number(req.query.number) + Number(preQuantity);
    updateProduct.save();

    if (!updateProduct) {
      res.status(404).json({
        data: {
          message: "Product not found ",
        },
      });
    }
    res.status(200).json({
      data: {
        product: updateProduct,
      },
      message: "Updated Successfully ",
    });
  } catch (err) {
    res.status(500).json({
      data: {
        message: "Oops || Error Occurred ",
      },
    });
  }
};

// Here we are deleting a product using by id
module.exports.delete = async function (req, res) {
  try {
    const id = req.params.id;

    const deleteProduct = await Products.findByIdAndDelete(id);

    if (!deleteProduct) {
      res.status(404).json({
        data: {
          message: "Product not found ",
        },
      });
    }
    res.json({
      data: {
        message: "Product Deleted",
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        message: "Oops || Error Occurred ",
      },
    });
  }
};