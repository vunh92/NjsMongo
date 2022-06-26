const express = require('express')
const router = express.Router()

// Gọi model product
const movieModel = require('../models/M_movie');

// Gọi class StatusResult
const StatusResult = require('../models/status.result');
const status = new StatusResult()

// Lấy toàn bộ dữ liệu
router.get('/list', (req, res)=>{
    movieModel
    .find()
    .exec((err, data)=>{
        if(err){
            res.sendStatus(404);
        }else{
            if(data != null & data.length > 0)
                res.send(data);
            else 
            res.sendStatus(404);
        }
    })
});

// Lấy dữ liệu item
router.get('/get', function (req, res)  {
    // khai báo
    var movieId = error = '', flag = 1
     // lấy dữ liệu
     movieId = req.query.movieId ?? '';
     // kiểm tra dữ liệu
     if(movieId == ''){
        flag = 0
        error = 'Chưa nhập movieId'
    } 
    const obj = {movieId}
    console.log(obj)
    if(flag == 1){
        movieModel
        .findOne(obj)
        .exec((err, data) => {
            if(err){
                res.send(status.error(err));
            }else{
                if(data == null) {
                    res.send(status.error('Can not find ' + movieId))
                }else {
                    res.send({status: status.success(), data})
                }
            }
        })
    }else {
        res.send(status.error(error))
    }
});

// thêm sản phẩm
router.post('/add', (req, res) => {
    // khai báo
    var movieId=name=category=imageUrl=desc=error='', 
    flag=1, 
    date_created, date_updated;
    // lấy dữ liệu
    movieId=req.body.movieId ?? '';
    name=req.body.name ?? '';
    category=req.body.category ?? '';
    imageUrl=req.body.imageUrl ?? '';
    desc=req.body.desc ?? '';
    date_created=req.body.date_created ?? Date.now();
    date_updated=req.body.date_updated ?? date_created;
    // kiểm tra dữ liệu
    if(name=='' || category=='' || imageUrl=='' || desc==''){
        flag=0;
        error='Chưa nhập đủ thông tin';
    } 
    if(movieId == '') {
        movieId = 'movie_' + Date.now()
    }
    const obj = {movieId, name, category, imageUrl, desc, date_created, date_updated};
    console.log(obj)
    if(flag==1){
        movieModel
        .findOne({movieId})
        .exec((err, dataFind)=>{
            if(err){
                res.send(status.error())
            }else{
                if(dataFind != null){
                    res.send(status.error('Duplicated ID'))
                }else{
                    movieModel
                    .create(obj, (err, data)=>{
                        if(err){
                            res.send(status.error(err));
                        }else{
                            if(data == '') {
                                res.send(status.error('Create data fail'));
                            }else {
                                res.send(status.success());
                            }
                        }
                    });
                }
            }
        })
    }else{
        res.send(status.error(error));
    }
})

// Cập nhật dữ liệu theo id
router.post('/update', (req, res)=>{
    // khai báo
    var movieId=name=category=imageUrl=desc=error='', 
    flag=1, 
    date_updated;
    // lấy dữ liệu
    movieId=req.body.movieId ?? '';
    name=req.body.name ?? '';
    category=req.body.category ?? '';
    imageUrl=req.body.imageUrl ?? '';
    desc=req.body.desc ?? '';
    date_updated = Date.now();
    // kiểm tra dữ liệu
    if(movieId == '' || name=='' || category=='' || imageUrl=='' || desc==''){
        flag=0;
        error = 'Chưa nhập đủ thông tin';
    }
    const obj = {movieId, name, category, imageUrl, desc, date_updated};
    console.log(obj)
    if(flag == 1) {
        movieModel.findOneAndUpdate(
            {movieId: movieId},
            obj,
            // {name: name, category: category, imageUrl: imageUrl, desc: desc, date_updated: date_updated},
            (err, data) => {
                if(err){
                    res.send(status.error(err));
                }else {
                    if(data == null){
                        res.send(status.error('Can not find ' + movieId));
                    }else {
                        res.send(status.success())
                    }
                }
            }
        )
    }else {
        res.send(status.error(error));
    }
});

// Xóa dữ liệu
router.post('/delete', (req, res)=>{
    // khai báo
    var error = '', flag = 1;
    // lấy dữ liệu
    var movieId = req.body.movieId ?? ''
    // kiểm tra dữ liệu
    if(movieId == ''){
        flag=0
        error='Id is empty'
    }
    const obj = {movieId}
    console.log(obj)
    if(flag==1){
        movieModel
        .findOneAndDelete(obj)
        .exec((err, data)=>{
            if(err){
                res.send(status.error(err))
            }else {
                if(data == null){
                    res.send(status.error('Not find ' + movieId));
                }else {
                    res.send(status.success())
                }
            }
        })
    }else{
        res.send(status.error(error))
    }
});

module.exports = router;