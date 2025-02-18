
import express from 'express'
import Post  from '../models/Post.js';
import Comment from '../models/Comment.js';
import upload from '../upload.js' // Multer config file

import authMiddleware from '../middlewares/authentication.js'
import cloudinary from '../cloud.js'
const {checkForAuthentication} = authMiddleware;

const router = express.Router();
//create a post 
router.post('/',checkForAuthentication,upload.single('image'), async (req, res) => {
  try {
            const { description  } = req.body;
            console.log(req.user)
            // Check if file exists
            if (!req.file) {
              return res.status(400).json({ error: 'No image file provided' });
            }

            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
              folder: 'posts',
              resource_type: 'image',
            });

            // Save the post to your database (example)
            const newPost = new Post({
              user: req.user._id,
              description,
              image: result.secure_url, // Cloudinary image URL
            });

            await newPost.save();
            res.status(201).json(newPost);
  } catch (error) {
            res.status(500).json({ error: error.message });
  }
});


//Get all posts
router.get('/',checkForAuthentication, async (req, res) => {
  try {
        const posts = await Post.find().populate('user', 'username profilePic').populate('comments').sort({ createdAt: -1 });
        res.json(posts);
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Like a post
router.put('/like/:id', checkForAuthentication, async (req, res) => {
  try {
    console.log("insider")
    const post = await Post.findById(req.params.id);
    console.log(post)
    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
    } else {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add comment
router.post('/comment/:id', checkForAuthentication, async (req, res) => {
  try {
    const comment = new Comment({ post: req.params.id, user: req.user._id, text: req.body.text });
    await comment.save();
    await Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;
