import { model, Schema } from "mongoose";

const themeSchema = new Schema({
  theme: String,
  css: String
});

export default model('Theme', themeSchema);
