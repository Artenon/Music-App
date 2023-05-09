import { Router, Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";

const router = Router();

router.get('/api/album/:albumID', (req: Request, res: Response) => {
  try {
    const albumID = req.params.albumID;

    const options: AxiosRequestConfig = {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      }
    };

    axios.get(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumID}`, options)
      .then(response => {
        if (response.data.error) {
          return res.status(500).json({ message: response.data.error.message });
        };

        const {
          id,
          title,
          cover_small,
          cover_medium,
          cover_big,
          genres,
          label,
          release_date,
          record_type,
          explicit_lyrics,
          tracks: { data },
          artist: {
            id: artist_id,
            name,
            picture_small,
            type: artist_type
          },
        } = response.data;

        const resData = {
          id,
          title,
          cover_small,
          cover_medium,
          cover_big,
          genres,
          label,
          release_date,
          record_type,
          explicit_lyrics,
          tracks: data,
          artist: {
            id: artist_id,
            name,
            picture_small,
            type: artist_type
          }
        };

        res.status(200).json({data: resData});
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