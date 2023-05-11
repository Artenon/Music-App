import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get('/api/album/:albumID', async (req: Request, res: Response) => {
  try {
    const albumID = req.params.albumID;

    await axios.get(`${process.env.API_URL}/album/${albumID}`)
      .then(response => {
        if (response.data.error) {
          return res.status(500).json({ message: response.data.error.message });
        };

        res.status(200).json({data: response.data});
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
