const ArticleModel = require('../models/article');
const CategoryModel = require('../models/category');
const Category = {
    /**
     * 列表
     */
    index:(req, res, next)=>{

        //搜索关键字
        let key = req.query.key;
        let regex = new RegExp(key);

        //分页
        let count = 0;
        let limit = 2;
        let page = req.query.page;
        let totalPage = 0;
        let where = {};
        if(key){
            where = {title:{$regex:regex}};
        }
        ArticleModel.find(where).count().then(doc=>{
            count = doc;
            totalPage = Math.ceil(count/limit)
            //console.log(key);
            ArticleModel.find(where).skip((page-1)*limit).limit(2).sort({create_at:'desc'}).then(doc=>{
                res.json(doc);
            })
        });
    },
    get:(req, res, next)=>{
        //获取单页文章
    },
    /**
     * 展示发布文章页面
     */
    add:(req, res, next) =>{
        CategoryModel.find({is_sys:0}).then(doc=>{
            res.render('add', {category:doc});
        })
    },
    /**
     * 保存
     */
    save:(req, res, next)=>{
        console.log(req.file);
        let articleModel = new ArticleModel({
            name:req.body.name,
            path:req.body.path,
            template:req.body.template,
            sort:req.body.sort,
            is_sys:req.body.is_sys,
            is_nav:req.body.is_nav,
            img:req.file.filename,
            category_id:req.body.category_id,
            //user_id:req.body.category_id,
        });
        articleModel.save();
        res.redirect('/');
    },
    /**
     * 更新
     */
    update:(req, res, next)=>{
        let id = req.params.id;
        ArticleModel.update({_id:id},{
            name:req.body.name,
            path:req.body.path,
            template:req.body.template,
            sort:req.body.sort,
            is_sys:req.body.is_sys,
            is_nav:req.body.is_nav,
            img:req.file.filename,
            category_id:req.body.category_id,
        }).then(doc=>{
            res.json(doc);
        })
    },
/**
 * 删除
 */
del:(req, res, next)=>{
    let id = req.params.id;
    ArticleModel.remove({_id:id}).then(doc=>{
        res.json(doc);
    })
}
}
module.exports = Category;