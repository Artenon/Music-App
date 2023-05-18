import { Router, Request, Response } from "express";
import axios from "axios";
import { Artist } from "../../../shared/types";

const router = Router();

let artist: Artist | null = null;

router
  .get('/api/artist/:artistID', async (req: Request, res: Response) => {
    try {
      const artistID = req.params.artistID;

      await axios.get(`${process.env.API_URL}/artist/${artistID}`)
        .then(response => {
          if (response.data.error) {
            return res.status(500).json({ message: response.data.error.message });
          };

          artist = response.data;
        })
        .catch(error => {
          console.log(error);
          return res.status(500).json({ message: error.message });
        });;
      
      if (!artist) {
        return res.status(400).json({ message: 'This artist doesn\'t exist' })
      };

      const total = req.query.total;

      if (total) {

        await axios.get(`${process.env.API_URL}/artist/${artistID}/top?limit=${total}&index=25`)
          .then(response => {
            if (response.data.error) {
              return res.status(500).json({ message: response.data.error.message });
            };

            return res.status(200).json({ ...response.data, artist });
          })
          .catch(error => {
            console.log(error);
            return res.status(500).json({ message: error.message });
          });

      } else {

        await axios.get(`${process.env.API_URL}/artist/${artistID}/top?limit=25`)
          .then(response => {
            if (response.data.error) {
              return res.status(500).json({ message: response.data.error.message });
            };

            return res.status(200).json({ ...response.data, artist });
          })
          .catch(error => {
            console.log(error);
            return res.status(500).json({ message: error.message });
          });

      };

    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

export default router;
