import { Router } from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

/* Add item to favorites */
router.post('/api/favorites', authMiddleware, async (req, res) => {
  try {
    const favorite = req.body.favorite;
    const user = await User.findById(req.user.userId);
    user.favorites.push(favorite);
    await user.save();

    res.status(200).json({ message: 'OK', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Couldn"t add this song to your favorites' });
  }
});

/* Remove item from favorites */
router.post('/api/favorites/remove', authMiddleware, async (req, res) => {
  try {
    const favorite = req.body.favorite;
    const user = await User.findById(req.user.userId);
    user.favorites = user.favorites.filter(item => item.id !== favorite.id);
    await user.save();

    res.status(200).json({ message: 'OK', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Couldn"t remove this song from your favorites' });
  }
});

export default router;