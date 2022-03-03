
const router = require("express").Router()
const { on } = require("nodemon")
const knex = require('./database')
// getting data from customers

router.get('/customersdata', (req, res) => {
    knex().select('*').from('customers')
        .then((data) => {
            console.log(data)
            res.send({
                data,
                "solve": 200,
                "text": "data successfull"
            })
        })
        .catch((err) => {
            console.log(err);
            res.send({ 
                "err": 404,
                "text": "sorry"})
        })
})
// getting data from orders

router.get('/orderdata', (req, res) => {
    knex().select('*').from('orders')
        .then((data) => {
            console.log(data)
            res.send({data,
                "solve": 200,
                "text": "data successfull"
            })
        })
        .catch((err) => {
            console.log(err);
            res.send({ 
                "err": 404,
                "text": "sorry"})
        })
})

// post data in customers
router.post('/customerspost', (req, res) => {
    const obj = {
        cid: req.body.cid,
        cname: req.body.cname,
        cemail: req.body.cemail
    }
    knex('customers').insert(obj)
        .then((data) => {
                res.send({
                "solve": 200,
                "text": "data successfull"
            })

        }).catch((error) => {
            console.log(error);
            res.send({ 
                "err": 404,
                "text":"sorry"
            })
        })
})

// post data in orders
router.post('/orderpost', (req, res) => {
    const obj = {
        oid: req.body.oid,
        orderdate: req.body.orderdate,
        oamount: req.body.oamount,
    }
    knex('orders').insert(obj)
        .then((data) => {
                console.log(data)

                res.send({
                "solve": 200,
                "text": "data sucssfull"
            })

        }).catch((error) => {
            console.log(error);
            res.send({ 
                "err": 404,
                "text":"sorry"
            })
        })
})

// update data in customers

router.put('/customers-edit/:cid', (req, res) => {
    knex.update(req.body)
    .table('customers').where('cid',req.params.cid)
    .then(()=>{
        res.send(
            "data updated sucessfully"
        )
    
    }).catch((error) => {
        console.log(error);
        res.send({ 
            "err": 404,
            "text":"sorry"
        })
    })
})
// update data in orders
router.put('/order-edit/:oid', (req, res) => {
    knex.update(req.body)
    .table('orders').where('oid',req.params.oid)
    .then(()=>{
        res.send(
            "data updated sucessfully"
        )
    
    }).catch((error) => {
        console.log(error);
        res.send({ 
            "err": 404,
            "text":"sorry"
        })
    })
})


// delete data from customers

router.delete('/customers-edit/:cid', (req, res) => {
    knex('customers')
        .where({ 'cid': req.params.cid }).del()
        .then(() => {
            res.send({
                "solved": 200,
                "text": "data sucssfully"
            })
        }).catch((error) => {
            console.log(error);
            res.send({ 
                "err": 404,
                "text":"sorry"
            })
        })
})

// delete data from orders
router.delete('/order-edit/:oid', (req, res) => {
    knex('orders')
        .where({'oid': req.params.oid}).delete()
        .then(() => {
            res.send({
                "solved": 200,
                "text": "data sucssfully"
            })
        }).catch((error) => {
            console.log(error);
            res.send({ 
                "err": 404,
                "text":"sorry"
            })
        })
})


// join two table
router.get('/user_scores', (req, res) => {
    knex
        .select("*").from('customers')
        .join('orders', function () {
            this.on('customers.cid', 'orders.oid')
        }).then((data)=>{
            res.send({
                "solved": 200,
                "text": "data successfull"
            })
        })
        .catch((error) => {
            res.send({ 
                "error": 404,
                "text":"sorry"
                })
            })
    })

module.exports = router;

