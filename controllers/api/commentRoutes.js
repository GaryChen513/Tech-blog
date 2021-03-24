const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      order: [["created_at", "DESC"]]
    })
    res.status(200).json(commentData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res)=> {
  try {
    const commentData = await Comment.create({
      text: req.body.text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });
    res.status(200).json(commentData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!commentData) {
      res.status(400).json({ message: 'No comment found by that id'});
      return 
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;