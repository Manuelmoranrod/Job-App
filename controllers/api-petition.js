
const { scraperEducaweb } = require('../utils/educaweb')//Cuidado con como lo importas,
const { scraperEmagister } = require('../utils/scraperemagister')//necesitamos funcion
const Users = require('../models/users')
const bcrypt = require('bcrypt')
const authToken = require('../utils/jwtAuth')

//const passport = require('passport')

const apiRouter = {
    searchCourse: async (req, res) => {
        try {
            const param = req.query.keyword

            const educaweb = await scraperEducaweb(`https://www.educaweb.com/nf/cursos-de/${param}/`)
            const emagister = await scraperEmagister(`https://www.emagister.com/web/search/?searchAction=search&idsegment=1&q=${param}`)
            const data = emagister.concat(educaweb)

            console.log('DATA', data);

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    },
    registerUser: async (req,res) => {
        try{

            const name = req.body.name
            const email = req.body.email
            const password = req.body.password
            const hashedPassword = await bcrypt.hash(password, 10) //Encripta la password
            const num = await Users.insertUser(name, email, hashedPassword)
            console.log("HOLIII");
            res.status(200).redirect('/login');


        }catch(error){
            res.status(400).json({
                error: error.message
            })
        }
    },

    loginApp: async (req,res) => {
        try{
            console.log(req.body);
            const email = req.body.email
            const password = req.body.password
            const user = await Users.getUser(email)
            const user_db = user[0];
            //const decodepassword = bcrypt.compare(user_db.password, process.env.ACCESS_TOKEN_S)
            //console.log("DECODEPASS: ", decodepassword);
            if(user_db && bcrypt.compareSync(password, user_db.password)){
                
                const tokenGenerated = authToken.generateToken(email)
                
                console.log("Login OK");
                return res.status(200).cookie('token', tokenGenerated).redirect('/');
            } 
            console.log("Login KO");
            return res.status(404).redirect('/login')
            

        }catch(error){
            res.status(400).json({
                error: error.message
            })
        }

    },
    modifyUser: async (req,res) => {
        try{
            const emailEdit = req.body.email
            const nombreEdit = req.body.name
            console.log(emailEdit, nombreEdit);
            //--> Coger el email para la query de las cookie
            const email = req.user
            console.log(email);
            const modifyOne = await Users.modifyUser(nombreEdit, emailEdit, email);
            console.log("modifyOne: ", modifyOne);
            //--> Para hacer la query de sql 

        }catch(error){
            res.status(400).json({
                error: error.message
            })
        }
    },
    //LOG OUT 
    exitApp: async (req,res) => {
        await res.clearCookie('token')
        res.redirect('/')
    }

}


module.exports = apiRouter