import express, { urlencoded, json } from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import "dotenv/config";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import authRoutes from "./routes/auth.routes.js";
import searchRoutes from "./routes/search.routes.js";
import albumRoutes from "./routes/album.routes.js";
import favoritesRoutes from "./routes/favorites.route.js";

const __dirname = path.resolve();
const app = express();

const options = {
  
};

mongoose.set('strictQuery', false);

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(authRoutes);
app.use(searchRoutes);
app.use(albumRoutes);
app.use(favoritesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
  });
};

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.log('Server error', error);
    process.exit(1);
  };
};

start();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
