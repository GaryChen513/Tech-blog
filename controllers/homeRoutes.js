const router = require('express').Router();
const { Post, User } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });
    const posts = postData.map((project) => project.get({ plain: true}));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard')
    return
  }

  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,{
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attribute: ['username']
          }
        },
        {
          model: User,
          attribute: ['username']
        }
      ]
    });
  
    if (!postData) {
      res.status(404).json({message: 'No post found with that id'})
      return
    }
  
    const posts = postData.map((project)=> project.get({plain: true}));
    res.render('singlepost', {posts, loggedIn: req.session.loggedIn})
    
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;