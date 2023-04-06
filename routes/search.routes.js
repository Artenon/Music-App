import { Router } from "express";
import axios from "axios";
import config from "config";

const router = Router();

router.get('/api/search', async (req, res) => {
  try {
    const q = req.query.q;

    const options = {
      params: {q},
      headers: {
        'X-RapidAPI-Key': config.get('api-key'),
        'X-RapidAPI-Host': config.get('api-host')
      }
    };

    axios.get('https://deezerdevs-deezer.p.rapidapi.com/search', options)
      .then(response => {
        const data = [];

        if (response.data.error) {
          return res.status(500).json({ message: response.data.error.message });
        };

        response.data.data.forEach(item => {
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
