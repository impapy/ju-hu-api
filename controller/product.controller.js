'use strict';
const MultipleFile = require('../models/multiplefile.module');
const Product = require("../models/product.module.js");
const model = require("../models/productModel.module.js")

//re size image to avoid the large images in size
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}


//CREATE PRODUCTOR
exports.createProduct = (req, res) => {
    console.log(req.files)
    const filesPath = [];
    const filesArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2)  //size be the half 
        }
        filesArray.push(file);
        filesPath.push(element.path);
    });
    const multipleFiles = new MultipleFile({
        files: filesArray
    });
    multipleFiles.save();
    const totalprice = req.body.price - (req.body.price * req.body.discount / 100)
    const productAlreadyExists = Product.findOne({ name: req.name })
    if (productAlreadyExists.name) {
        res.status(404).send({ message: "Product already exists" });
    } else {
        console.log(req.body)
        const newProduct = new Product(
            {
                name: req.body.name,
                // arname: req.body.arname,//
                // sellerId: req.user.id,
                sellerId: req.sellerId,
                imagePath: filesPath,//
                brand: req.body.brand,
                category: req.body.category,
                // arcategory: req.body.arcategory,//
                subcategory: req.body.subcategory,
                // arsubcategory: req.body.arsubcategory,//
                description: req.body.description,
                // ardescription: req.body.description,//
                countInStock: req.body.countInStock,
                price: req.body.price,
            }
        )

        console.log(newProduct, "yyyyy")
        newProduct.save().then((savedProduct) => {
            console.log(savedProduct)
            res.status(200).send(savedProduct);
        }).catch((err) => {
            res.status(401).send({ message: "something wrong" })
        })
    }
}


//UPDATE PRODUCT
// exports.updateProduct = (req, res) => {
//     Product.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//     },
//         { new: true })
//         .then(prd => {
//             res.status(200).send(prd)
//         })
// }


exports.updateProduct = (req, res) => {
    const filesPath = [];
    const filesArray = [];
    // console.log( req.files)
    req.files.forEach(element => {
        const file = {
            fileName: element.name,
            filePath: element.path,
            fileType: element.type,
            fileSize: fileSizeFormatter(element.size, 2)
        }
        // console.log(file)
        filesArray.push(file);
        filesPath.push(element.path);
    });
    const multipleFiles = new MultipleFile({
        files: filesArray
    });
    multipleFiles.save();
    var totalprice = req.body.price - (req.body.price * req.body.discount / 100)
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            // arname: req.body.arname,//
            // sellerId: req.user.id,
            sellerId: req.sellerId,
            imagePath: filesPath,//
            brand: req.body.brand,
            category: req.body.category,
            // arcategory: req.body.arcategory,//
            subcategory: req.body.subcategory,
            // arsubcategory: req.body.arsubcategory,//
            description: req.body.description,
            // ardescription: req.body.description,//
            countInStock: req.body.countInStock,
            price: req.body.price,
        }
    },
        { new: true })
        .then(prd => {
            res.status(200).send(prd)
        }).catch((err) => {
            res.status(401).send({ message: "something wrong" })
        })
}


//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};


//GET PRODUCT
// exports.getProduct = (req, res, next) => {
//     Product.findOne({ name: req.body.name }, function (err, product) {
//         if (err) res.status(400).send(err);
//         res.status(200).send(product);
//     });
// }


//GET PRODUCT
exports.getProduct = async (req, res, next) => {

    var { id } = req.params
    try {
        var myTodo = await Product.findOne({ _id: id })
        res.json(myTodo)
    } catch (err) {
        res.json({ message: err.message })

    }


    // console.log("getProduct",req.params)
    // if (req.headers.lang == 'ar') {
    //     Product.findById({ _id: req.params.id }, {
    //         name: "",
    //         category: "",
    //         subcategory: "",
    //         description: ""
    //     })
    //         .populate('sellerId')
    //         .exec(function (err, prd) {
    //             if (err) res.send(err);
    //             res.status(200).send(prd)
    //         })
    //     // , function (err, product) {
    //     //     if (err) res.status(400).send({ message: "something wrong" });
    //     //     // console.log("Product",product)
    //     //     res.status(200).send(product);
    //     // });
    // } else {
    //     Product.find({ _id: req.params.id }, {
    //         arname: "",
    //         arcategory: "",
    //         arsubcategory: "",
    //         ardescription: "",
    //     })
    //         .populate('sellerId')
    //         .exec(function (err, prd) {
    //             if (err) res.send(err);
    //             res.status(200).send(prd)
    //         })

    //         console.log(Product);
    //     // , function (err, product) {
    //     //     if (err) res.status(400).send({ message: "something wrong" });
    //     //     // console.log("Product",product)
    //     //     res.status(200).send(product);
    //     // });

    // }
}


//GET ALL PRODUCTS BY CATEGORY OR ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
    const qCategory = req.query.category;
    let products;
    try {
        if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            }).limit(20)
        } else {
            // req.headers.lang="ar"
            console.log(req.headers.lang)
            if (req.headers.lang == 'ar') {
                products = await Product.find({}, {
                    name: 0,
                    category: 0,
                    subcategory: 0,
                    description: 0
                }).limit(20)
            } else {
                products = await Product.find({}, {
                    arname: 0,
                    arcategory: 0,
                    arsubcategory: 0,
                    ardescription: 0
                }).limit(20)
            }
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send({ message: "something wrong" });
    }
}


exports.createProductReview = (req, res) => {
    var check = false
    console.log("gg")
    Product.findById(req.params.productId, (err, pro) => {
        if (err) res.status(400).send(err);
        console.log(pro.reviews.length)
        if (check) {
            pro.reviews.forEach(element => {
                console.log("hh")
                if (element.userId == req.user.id) {
                    check = true;
                    element.userId = req.user.id
                    element.name = req.user.name,
                        element.rating = req.body.rating,
                        element.comment = req.body.comment
                    // res.status(200).send("not can accsess it");
                }

            })
            let avg = 0;
            pro.reviews.forEach((rev) => {
                avg += rev.rating;
            });
            pro.numReviews = pro.reviews.length;
            console.log("gfhfgh");
            pro.ratings = avg / pro.reviews.length;
            console.log(pro)
            pro.save().then((pro) => {
                res.status(200).send({
                    success: true,
                    prd: pro
                });
            }).catch((err) => {
                res.status(401).send(err)
            })
        }

        if (!check) {
            console.log("kk")
            pro.reviews.push({
                userId: req.user.id,
                name: req.user.name,
                rating: req.body.rating,
                comment: req.body.comment
            })
            let avg = 0;
            pro.reviews.forEach((rev) => {
                avg += rev.rating;
            });
            pro.numReviews = pro.reviews.length;
            console.log("gfhfgh");
            pro.ratings = avg / pro.reviews.length;
            console.log(pro)
            pro.save().then((pro) => {
                res.status(200).send({
                    success: true,
                    prd: pro
                });
            }).catch((err) => {
                res.status(401).send(err)
            })
        }
    })
}


exports.getProductReviews = (req, res) => {
    Product.findById(req.params.productId).then((rev) => {
        res.send(rev.reviews)
        res.status(200).json({
            success: true,
            prd: pro
        });
    }).catch(err => res.status(400).send(err));

    let avg = 0;
    Product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    let ratings = 0;
    if (Product.reviews.length === 0) {
        Product.ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }
}


exports.deleteReview = (req, res, next) => {
    Product.findOneAndUpdate({ _id: req.params.productId },
        { $pull: { reviews: { _id: req.params.reviewId } } },
        { new: true }).then((delrev) => {
            let n = 0
            let c = 0
            if (delrev) {


                delrev.reviews.forEach(ret => {
                    n += ret.rating;
                    c++
                    console.log(n, c)
                })


                delrev.ratings = n / c
                delrev.numReviews = c

            }
            delrev.save()
            console.log(delrev)
            res.status(200).send(delrev);
        }).catch((err) => {
            res.status(400).send(err)
        })


}

// Create New Review or Update the review
// Delete Review
// exports.deleteReview = (req, res, next) => {
//     const product = Product.findById(req.params.productId);
//     if (!product) {
//         res.status(404).send("Product not found")
//     }
//     const reviews = product.reviews.filter(
//         (rev) => rev._id !== req.params.reviewId
//     );
//     let avg = 0;
//     reviews.forEach((rev) => {
//         avg += rev.rating;
//     });
//     let ratings = 0;
//     if (reviews.length === 0) {
//         ratings = 0;
//     } else {
//         ratings = avg / reviews.length;
//     }
//     const numOfReviews = reviews.length;
//     Product.findByIdAndUpdate(
//         req.params.productId,
//         {
//             reviews,
//             ratings,
//             numOfReviews,
//         },
//         {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false,
//         }
//     );
//     res.status(200).json({
//         success: true,
//         prd: product
//     });
// }


//GET PRODUCTS OF SPECEIFIC CATEGORY


exports.getProductsOfCategory = async (req, res) => {
    console.log("test getProductsOfCategory..")
    console.log(req.params.category)
    const qCategory = req.params.category;
    let products;
    try {
        if (qCategory) {
            products = await Product.find({ category: qCategory });
        } else {
            res.status(500).json("there's problem please try again...");
        }
        console.log(products);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET PRODUCTS OF SP SUBCATEGORY
exports.getProductsOfSubCategory = async (req, res) => {
    const subCat = req.params.subCategory;
    console.log(subCat)
    let products;
    try {
        if (subCat) {
            if (req.headers.lang == 'ar') {
                products = await Product.find({ $or: [{ subcategory: subCat }, { arsubcategory: subCat }] }, {
                    name: 0,
                    category: 0,
                    subcategory: 0,
                    description: 0
                });
                console.log(products)
            } else {
                products = await Product.find({ $or: [{ subcategory: subCat }, { arsubcategory: subCat }] }, {
                    arname: 0,
                    arcategory: 0,
                    arsubcategory: 0,
                    ardescription: 0
                });
            }
        } else {
            res.status(500).json("there's problem please try again..");
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send({ message: "something wrong" });
    }
}



//GET ALL PRODUCTS for search OR ALL PRODUCTS
exports.getAllProductsOfSearch = async (req, res) => {
    let products;
    try {
        console.log("helooooo1")
        if (req.headers.lang == 'ar') {
            products = await Product.find({}, {
                name: 0,
                category: 0,
                subcategory: 0,
                description: 0
            });
        } else {
            products = await Product.find({}, {
                arname: 0,
                arcategory: 0,
                arsubcategory: 0,
                ardescription: 0
            });
        }
        res.status(200).json(products);
    } catch (err) {
        console.log("helooooo2")
        res.status(500).send({ message: "something wrong" });
    }
}


exports.getAllProductFilter = async (req, res) => {
    try {
        let query;
        let total

        query = Product.find(); //find all todos
        total = await Product.countDocuments();    //conter of all todos

        const page = parseInt(req.query.page) || 1;    
        const pageSize = parseInt(req.query.limit) || 10;    
        const skip = req.query.skip || (page - 1) * pageSize;     
        const pages = Math.ceil(total / pageSize);    //page cont 

        query = query.skip(skip).limit(pageSize);   //new quary which apper with skip and limit

        if (page > pages) {      //chick if pages is larger than i but
            return res.status(404).json({
                status: "fail",
                message: "No page found",
            });
        }
        const result = await query;

        res.status(200).json({
            status: "success",
            count: result.length,
            page,
            pages,
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }
};


exports.getproductname = (req, res) => {
    var fpro = [];
    Product.find({}).then((pro) => {
        pro.forEach(p => {
            if (p.name.replace(/ .*/, '') === req.params.names) {
                fpro.push(p)
            }

        })
        res.send(fpro)
    })
        .catch(err => res.status(400).send([err, { message: "something wrong" }]))
};


exports.getProductdetails = (req, res, next) => {
    console.log("getProduct", req.params)

    Product.findOne({ _id: req.params.id }, function (err, product) {
        if (err) res.status(400).send({ message: "something wrong" });
        // console.log("Product",product)
        res.status(200).send(product);
    });


}


//THE LATEST PRODUCTS 
exports.getlatestProducts = async (req, res) => {
    const qCategory = req.query.category;
    let products;
    try {
        if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            }, {}, { sort: { 'createdAt': -1 }, limit: 10 });
        } else {
            // req.headers.lang="ar"
            // console.log(req.headers.lang)
            if (req.headers.lang == 'ar') {
                products = await Product.find({}, {
                    name: 0,
                    category: 0,
                    subcategory: 0,
                    description: 0
                }, { sort: { 'createdAt': -1 }, limit: 10 });
            } else {
                products = await Product.find({}, {
                    arname: 0,
                    arcategory: 0,
                    arsubcategory: 0,
                    ardescription: 0
                }, { sort: { 'createdAt': -1 }, limit: 10 });
            }
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send({ message: "something wrong" });
    }
}
//PRODUCT IN EACH CATEGORY
exports.getProductCategories = async (req, res) => {
    const productCategories = await Product.aggregate([
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        }
    ])
    try {
        res.status(200).send(productCategories)
    } catch (err) {
        res.status(404).send(err)

    }

}


//////////model
exports.AddmodelElec = (req, res) => {
    const newmodelProduct = new model(
        {
            model: req.body.model
        }
    )
    newmodelProduct.save().then((savedmodelProduct) => {
        res.status(200).send(savedmodelProduct);
    }).catch((err) => {
        res.status(401).send({ message: "something wrong" })
    })
}


exports.ubdateModel = (req, res) => {
    console.log("bnbnb")
    model.findByIdAndUpdate(req.params.id, {
        $set: { model: req.body.model }
    }, {
        new: true
    })
        .then(sendData => {
            res.status(200).send(sendData)
        })
        .catch(err => {
            res.status(402).send({ message: "something wrong" })
        })
}