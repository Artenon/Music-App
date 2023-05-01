import { Router } from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

/* Add track to favorites */
router.post('/api/favorites/track', authMiddleware, async (req, res) => {
  try {
    const favorite = req.body.favorite;
    const user = await User.findById(req.user.userId);
    user.favorites.tracks = [favorite].concat(user.favorites.tracks);
    await user.save();

    res.status(201).json({ message: 'OK', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t add this song to your favorites' });
  }
});

/* Add album to favorites */
router.post('/api/favorites/album', authMiddleware, async (req, res) => {
  try {
    const favorite = req.body.favorite;
    const user = await User.findById(req.user.userId);
    user.favorites.albums = [favorite].concat(user.favorites.albums);
    await user.save();

    res.status(201).json({ message: 'OK', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t add this album to your favorites' });
  }
});

/* Remove track from favorites */
router.post('/api/favorites/track/remove', authMiddleware, async (req, res) => {
  try {
    const favorite = req.body.favorite;
    const user = await User.findById(req.user.userId);
    user.favorites.tracks = user.favorites.tracks.filter(item => item.id !== favorite.id);
    await user.save();

    res.status(200).json({ message: 'OK', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t remove this song from your favorites' });
  }
});

/* Remove album from favorites */
router.post('/api/favorites/album/remove', authMiddleware, async (req, res) => {
  try {
    const favorite = req.body.favorite;
    const user = await User.findById(req.user.userId);
    user.favorites.albums = user.favorites.albums.filter(item => item.id !== favorite.id);
    await user.save();
 
    res.status(200).json({ message: 'OK', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t remove this album from your favorites' });
  }
});

export default router;
