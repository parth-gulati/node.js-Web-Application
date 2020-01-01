const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const Comments = require('../../models/Comment');
const faker = require('faker');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*',userAuthenticated,(req,res,next)=>{

    req.app.locals.layout = 'admin';
    next();

});

router.get('/',(req,res)=>{


    const promises = [

        Post.count().exec(),
        Category.count().exec(),
        Comments.count().exec()

    ];

    Promise.all(promises).then(([postCount,categoryCount,ownCommentsCount])=>{

        res.render('admin/index',{postCount:postCount,categoryCount:categoryCount,ownCommentsCount:ownCommentsCount});

    })





    /*

    Post.count().then(postCount=>{

        Category.count().then(categoryCount=>{

            Comments.count().then(ownCommentsCount=>{

                res.render('admin/index',{postCount:postCount,categoryCount:categoryCount,ownCommentsCount:ownCommentsCount});


            })


        })


    });
*/

});

router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard');
});


router.post('/generate-fake-posts', (req,res)=>{

   for(let i = 0; i <= req.body.amount;i++){

        let post = new Post();
        post.title = faker.hacker.phrase();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentences();
        post.slug = post.title;

        post.save().then(saved=>{

        });


    }

   res.redirect('/admin/posts');

});


module.exports = router;
