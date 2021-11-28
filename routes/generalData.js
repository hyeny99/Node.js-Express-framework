const express = require('express')
const router = express.Router()
const Blog = require('../models/blog_generalData')

// get all salesmen
router.get('/', (req, res) => {
    console.log('success')
    Blog.find().sort({ createdAt: 1 })
    .then((result) => {
       res.status(200).send(result) 
    })
    .catch(error => {
        console.log(error)
    })
    
})

// get a salesman with sid
router.get('/:sid', (req, res) => {
    const sid = req.params
    Blog.find(sid)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(error => {
        console.log(error)
        res.status(401)
    })
})

// post a salesman
router.post('/', (req, res) => {
    const blog = new Blog({
        sid: req.body.sid,
        name: req.body.name,
        department: req.body.department,
    })

    blog.save()
    .then((result) => {
        console.log(result)
        res.status(200).json({"success": true})
    })
    .catch(error => {
        console.log(error)
        res.status(401).send(error)
    })
})

// update a salesman
router.put('/:sid', (req, res) => {
    
    const sid = req.params.sid

    Blog.findOneAndReplace(sid, {
        sid: req.body.sid,
        name: req.body.name,
        department: req.body.department,
    })
    .then(result => {

        res.status(200).json({"success": true})
        //res.status(200).send(result)
    })
    .catch(error => {
        console.log(error)
        res.status(401).send(error)
    })
})

// delete a salesman by sid
router.delete('/:sid', (req, res) => {
    const sid = req.params
    Blog.find(sid).deleteOne()
    .then(result => {
         res.status(200).json({"success": true})
    })
    .catch(error => {
        console.log(error)
         res.status(401).send(error)
    })
})

module.exports = router