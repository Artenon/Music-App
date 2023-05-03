import { Router, Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { SongData } from "../../../shared/types";

const router = Router();

router.get('/api/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q;

    const options: AxiosRequestConfig = {
      params: {q},
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      }
    };

    axios.get('https://deezerdevs-deezer.p.rapidapi.com/search', options)
      .then(response => {
        const data: SongData[] = [];

        if (response.data.error) {
          return res.status(500).json({ message: response.data.error.message });
        };

        response.data.data.forEach((item: SongData) => {
          const {
            id,
            title,
            title_short,
            explicit_lyrics,
            preview,
            type,
            artist: {
              id: artist_id,
              name,
              picture_small,
              type: artist_type
            },
            album: {
              id: album_id,
              title: album_title,
              cover_small,
              cover_medium,
              type: album_type
            }
          } = item;

          data.push({
            id,
            title,
            title_short,
            explicit_lyrics,
            preview,
            type,
            artist: {
              id: artist_id,
              name,
              picture_small,
              type: artist_type
            },
            album: {
              id: album_id,
              title: album_title,
              cover_small,
              cover_medium,
              type: album_type
            }
          });
        });

        res.status(200).json({data});
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
