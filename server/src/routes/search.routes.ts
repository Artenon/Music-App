import { Router, Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";

const router = Router();

router.get('/api/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q;

    const options: AxiosRequestConfig = {
      params: {q}
    };

    await axios.get(`${process.env.API_URL}/search`, options)
      .then(response => {
        if (response.data.error) {
          return res.status(500).json({ message: response.data.error.message });
        };

        res.status(200).json({data: response.data.data});
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
