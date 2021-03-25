const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res)=> {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    
    const posts = postData.map(post => post.get({ plain: true }))

    res.render('dashboard', {posts, logged_in: req.session.logged_in});

  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/post/:id", withAuth, async (req, res)=> {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!postData) {
      res.status(400).json({ message: "No post found with that id"})
      return
    }
    const post = postData.get({plain: true});

    res.render("edit-post", {post,logged_in: req.session.logged_in});

  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/newpost", withAuth, (req, res)=> {
  res.render('newpost', {logged_in: req.session.logged_in});
})




module.exports = router;