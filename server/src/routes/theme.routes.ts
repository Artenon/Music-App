import { Router, Request, Response } from "express";
import Theme from "../models/Theme.js";  

const router = Router();

router.get('/api/themes', async (req: Request, res: Response) => {
  try {
    const themes = await Theme.find();
    const data = themes.map(theme => ({id: theme.id, theme: theme.theme, css: theme.css}));

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
