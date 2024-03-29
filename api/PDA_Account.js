const express = require('express')
const router = express.Router()
// Gọi model 
const accountModel = require('../models/M_account');
const tokenModel = require('../models/M_token');
// Gọi bcrypt
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// Gọi jsonwebtoken
const jwt = require('jsonwebtoken');
const secret = '@#%$ED';

var pdaAccount = require('../models/pda.account');

//-- Get item - id
router.get('/get_item/:id', (req, res) => {
    accountModel
        .find({ _id: req.params.id })
        .exec((err, data) => {
            if (err) {
                res.send({ kq: 0, err })
            } else {
                res.send({ kq: 1, data })
            }
        })
})
//-- Get list - all
router.get('/list', (req, res) => {
    accountModel
        .find()
        .exec((err, data) => {
            if (err) {
                res.send({ kq: 0, err })
            } else {
                res.send({ kq: 1, data })
            }
        })
})

//-- add item
router.post('/register', async (req, res) => {
    // khai báo
    var username = password = name = email = phone = role = error = '', flag = 1;

    // lấy dữ liệu
    username = req.body.username ?? ''
    password = req.body.password ?? ''
    name = req.body.name ?? ''
    email = req.body.email ?? ''
    phone = req.body.phone ?? ''
    role = req.body.role ?? 'user'
    // kiểm tra dữ liệu
    if (username == '') {
        flag = 0; error += 'Vui lòng nhập Tên Đăng Nhập\n';
    }
    if (password == '') {
        flag = 0; error += 'Vui lòng nhập Mật Khẩu\n';
    }
    if (email == '') {
        flag = 0; error += 'Vui lòng nhập Email\n';
    }
    if (phone == '') {
        flag = 0; error += 'Vui lòng nhập Phone\n';
    }
    const obj2 = { username, password, name, email, phone, role };
    console.log(obj2)
    if (flag == 1) {
        accountModel
            .find({ username })
            .exec((errUsername, dataUsername) => {
                if (errUsername) {
                    res.send({ kq: 0, err: errUsername })
                } else {
                    // check username
                    if (dataUsername == '') {
                        accountModel
                            .find({ email })
                            .exec((errEmail, dataEmail) => {
                                if (errEmail) {
                                    res.send({ kq: 0, err: errEmail });
                                } else {
                                    // check email
                                    if (dataEmail == '') {
                                        accountModel
                                            .find({ phone })
                                            .exec((errPhone, dataPhone) => {
                                                if (errPhone) {
                                                    res.send({ kq: 0, err: errPhone });
                                                } else {
                                                    // check phone
                                                    if (dataPhone == '') {
                                                        // to hash a password
                                                        var hash = bcrypt.hashSync(password, salt);

                                                        // object để lưu vào collection
                                                        const obj = { username, password: hash, name, email, phone, role };

                                                        // thêm vào collection user
                                                        accountModel.create(obj, (errAddUser, data) => {
                                                            if (errAddUser) {
                                                                res.send({ kq: 0, err: errAddUser });
                                                            } else {
                                                                res.send({ kq: 1, data })
                                                            }
                                                        })
                                                    } else {
                                                        res.send({ kq: 0, err: 'Số Điện Thoại đã tồn tại' });
                                                    }
                                                }
                                            })
                                    } else {
                                        res.send({ kq: 0, err: 'Email đã tồn tại' });
                                    }
                                }
                            })
                    } else {
                        res.send({ kq: 0, err: 'Tên Đăng Nhập đã tồn tại' })
                    }
                }
            })
    }
    else {
        res.send({ kq: 0, err: error });
    }
})

// login
router.post('/login', async (req, res) => {
    // khai báo
    var user, pass, error = '', flag = 1;

    // lấy dữ liệu
    user = req.body.username ?? '';
    pass = req.body.password ?? '';

    // kiểm tra dữ liệu
    if (user == '') {
        flag = 0;
        error += 'Vui lòng nhập Tên Đăng Nhập\n';
    }
    if (pass == '') {
        flag = 0;
        error += 'Vui lòng nhập Mật Khẩu\n';
    }

    // Tổng kết
    if (flag == 1) {
        // Gọi database
        // check username
        accountModel
            .find({ username: user })
            .exec((error, data) => {
                if (error) {
                    res.send({error})
                } else {
                    if (data == '') {
                        res.send({ error: 'Đăng Nhập không thành công' })
                    } else {
                        // sử dụng bcryptjs để kiểm tra mật khẩu
                        const check_password = bcrypt.compareSync(pass, data[0].password);
                        if (check_password == true) {
                            let account = new pdaAccount(data[0].username, data[0].password, data[0].name, 
                                data[0].email, data[0].phone, data[0].role, data[0].status, data[0].birthday, 
                                data[0].address, data[0].trash, data[0].date_created, data[0].date_updated )
                            res.send(account)
                        }
                        else {
                            res.sendStatus(404)
                        }
                    }
                }
            })
    }
    else {
        res.send({ error });
    }
})


// login
router.post('/login2', async (req, res) => {
    // khai báo
    var user, pass, error = '', flag = 1;

    // lấy dữ liệu
    user = req.body.username ?? '';
    pass = req.body.password ?? '';

    // kiểm tra dữ liệu
    if (user == '') {
        flag = 0;
        error += 'Vui lòng nhập Tên Đăng Nhập\n';
    }
    if (pass == '') {
        flag = 0;
        error += 'Vui lòng nhập Mật Khẩu\n';
    }

    var status = null;
    status = {"type": "falil", "message": "falil", "code": 404, "error": true,}

    // Tổng kết
    if (flag == 1) {
        // Gọi database
        // check username
        accountModel
            .find({ username: user })
            .exec((error, data) => {
                if (error) {
                    res.send(status)
                } else {
                    if (data == '') {
                        res.send(status)
                    } else {
                        // sử dụng bcryptjs để kiểm tra mật khẩu
                        const check_password = bcrypt.compareSync(pass, data[0].password);
                        if (check_password == true) {
                            status = {"type": "success", "message": "success", "code": 200, "error": false,}
                            let account = new pdaAccount(data[0].username, data[0].password, data[0].name, 
                                data[0].email, data[0].phone, data[0].role, data[0].status, data[0].birthday, 
                                data[0].address, data[0].trash, data[0].date_created, data[0].date_updated )
                            res.send({status: status , data: account})
                        }
                        else {
                            res.sendStatus(404)
                        }
                    }
                }
            })
    }
    else {
        res.send({ error });
    }
})


module.exports = router;