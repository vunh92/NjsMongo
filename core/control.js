const express = require('express')
const router = express.Router()

//-- connect controllers html
/*
// Gọi dashboard
router.use('/admin/dashboard', require('../controllers/C_dashboard'))
// Gọi category
router.use('/admin/category', require('../controllers/C_category'))
// Gọi product
router.use('/admin/product', require('../controllers/C_product'))
// Gọi user
router.use('/admin/user', require('../controllers/C_user'))
// Gọi Login
router.get('/login', (req, res)=>{ res.render('login')})
*/


//-- connect api
// Gọi api account
router.use('/api/account', require('../api/A_account'))

//-- connect pda
// Gọi api account
router.use('/pda/account', require('../api/PDA_Account'))
// Gọi api movie
router.use('/pda/movie', require('../api/PDA_Movie'))

module.exports = router;