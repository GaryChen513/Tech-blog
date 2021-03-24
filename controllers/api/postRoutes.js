const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [["created_at", "DESC"]],
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

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
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
      res.status(404).json({ message: 'No post foudn with that id' })
      return
    }

    res.status(200).json(postData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id,
      }
    });

    if (!postData) {
      res.status(404).json({message: 'No post with that id'});
      return
    }
    
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!postData) {
      res.status(404).json({message: 'No post with that id'});
      return
    }
    
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;