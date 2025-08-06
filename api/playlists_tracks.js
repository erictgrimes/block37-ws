import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists_tracks,
  createPlaylists_tracks,
} from "#db/queries/playlists_tracks";


