import { Router } from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.route('/api/favorites')
  .get(authMiddleware, async (req, res) => {

  })
  .post(authMiddleware, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.userId, { favorites: req.body.favoriteIds });
      res.status(200).json({ message: 'OK', user });
    } catch (error) {
      res.status(500).json({ message: 'Couldn"t update your favorites' });
    }
  });

export default router;
