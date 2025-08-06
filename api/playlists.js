import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
} from "#db/queries/playlists";
