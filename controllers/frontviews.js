//const courseSchema = require('../models/courseSchema')

const frontView = {
    home: (req,res) => {
        res.status(200).render('home')
    },
    register: (req,res) => {
        res.status(200).render('signup')
    },
    login:(req,res) => {
        res.status(200).render('login')
    },

    users:(req,res) => {
        console.log("estoy en la función users" );
        res.status(200).render('users')
    },
    
    dashboard:(req,res) => {
        console.log("estoy en la función dashboard" );
        res.status(200).render('dashboard')
    },
    
    favoritos: (req, res) => {
    res.status(200).render('favoritos')
    },

    profile: (req, res) => {
    res.status(200).render('profile')
    },
    googleLogin:(req, res)=>{
        console.log('estas dentro')
        res.status(200).send('estas dentro');
    }
}

    module.exports = frontView

