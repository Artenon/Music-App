import { Router, Response } from "express";
import { Request } from "../../types.js";
import User from "../models/User.js";  
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.put('/api/user', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const {username, email} = req.body;
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ message: 'User is not found' });
      };

      user.username = username;
      user.email = email;
      await user.save();

      res.status(200).json({ message: "OK", email: user.email, username: user.username });
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
