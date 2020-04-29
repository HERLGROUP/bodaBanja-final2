const express = require('express')
const router = express.Router();
const User = require('../model/userModel');

router.get('/customerhome',async (req, res) => {
    if (req.session.user) {
        try {
            const userItem = await User.findById(req.session.user._id)
            res.render('customerhome', { user: userItem })
        } catch {
            res.status(500).send("unable to find item in the database");
        }
    } else {
        res.redirect ('/login')
    }
 })

router.get('/adminhome',async (req, res)=>{
    if (req.session.user) {
        res.render('adminhome', {name: req.session.user.fullName});
    } else {
        res.redirect('/login')
    }
});

router.get('/userlist', async (req, res) => {
    if (req.session.user) {
        try {
            let items = await User.find()
            if (req.query.gender) {
                items = await User.find({gender: req.query.gender})
            }
            res.render('list', { users: items })
        } catch {
            res.status(400).send("unable to find items in the database");
        }
    } else {
        res.redirect('/login');
    }
 });
 
 module.exports = router;
 







// //Requiring dependencies
// const express = require('express');
// //require model
// const UserModel = require('../model/userModel')
// const path = require('path')

// //setup of router
// const router = express.Router();

// //setup router handlers
// router.get('/', (req, res) => {
//    // res.render('studentProfile')
//    res.sendFile(path.join(__dirname, '../views', 'customerProfile.html'))
// });

// //Route to get single student
// router.get('/customer/:id', async (req, res) => {
//    try {
//       const Total = 1500000
//       const customer = await UserModel.findById(req.params.id)
//       let balance = Total - customer.paymentPlan
//       console.log(customer);
//       res.render('learner', { x: customer, y: balance })
//       // res.sendFile(path.join(__dirname, '../views', 'customer.html'))
//    } catch (error) {
//       console.log("Unabale to find customer");
//    }
// })

// router.post('/installment', async (req, res) => {
//    try {
//       let installmentAmount = req.body.installmentAmount
//       let tuitionPlan = req.body.paymentPlan
//       let feesPaid = parseInt(paymentPlan) + parseInt(installmentAmount)
//       const updatePayments = await UserModel.updateOne(
//          { _id: req.body.customerID },
//          { $set: { paymentPlan: Paid }
//       })
//       res.redirect('/allCustomers')
//    } catch (error) {
//       console.log(error);
//    }
// })

// //get all route
// router.get('/allCustomers', async (req, res) => {
//    try {
//       const students = await UserModel.find()
//       res.render('list', { x: customers })
//    } catch (error) {
//       res.status(404).send('customer list failed')
//    }
// })

// router.post('/addcustomer', async (req, res) => {
//    try {
//       const newCustomer = new UserModel(req.body)
//       await newCustomer.save()
//       console.log(req.body);
//       res.redirect('/allcustomers')
//    } catch (error) {
//       console.log(error);
//       res.status(404).send('Customer creation failed')
//    }
// })

// router.get('/prompt', (req, res) => {
//    res.send('this is a prompt')
// });

// router.get('/viewprofile', (req, res) => {
//    res.send('this is the viewprofile route')
// });

// module.exports = router;

