const router = require('express').Router()
const apiRouter = require('../controllers/api-petition')
const jwtAuth = require('../utils/jwtAuth')


//Endpoints USERS
router.post('/user', apiRouter.registerUser)
router.put('/user', jwtAuth.authCookie, apiRouter.modifyUser)
//router.delete('/user', apiRouter.deleteUser) //For Admin view



//Endpoints Log IN/OUT
router.post('/login', apiRouter.loginApp)
router.get('/logout', apiRouter.exitApp)
//router.post('/logout', apiRouter.exitApp)



//Endpoints Search
router.get('/search', apiRouter.searchCourse)


//Course Cards
//router.post('/ads', apiRouter.createCourse) //For Admin view
//router.put('/ads', apiRouter.editCourse) //For Admin view
//router.delete('/ads', apiRouter.deleteCourse)

//Favorites
//router.post('/favorites', apiRouter.saveFavorite)//DDBB SQL
//router.delete('/favorites', apiRouter.deleteCourse)


module.exports = router