import express from "express";
const app = express();
export default app;
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";
import playlistsTracksRouter from "#api/playlists_tracks";

