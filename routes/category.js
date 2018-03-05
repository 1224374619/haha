const express = require('express');
const router = express.Router();
const Category = require("../controllers/category");

// //获取文章
// router.get('/', article.index);

//添加文章页面
router.get('/add', Category.add);

//添加文章
router.post('/add', upload.single('img'), Category.save);

//更新文章
router.post('/update/:id', Category.update);

//删除文章
router.get('/delete/:id', Category.del);



module.exports = router;