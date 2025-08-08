import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
} from "#db/queries/playlists";

import { createPlaylists_tracks } from "#db/queries/playlists_tracks";

import { getTrackByPlaylistId } from "#db/queries/tracks";

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("request body is required");
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send("Name and description are both required");
    }
    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
  });

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer");

  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found");

  req.playlist = playlist;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const tracks = await getTrackByPlaylistId(req.playlist.id);
    res.status(200).send(tracks);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("request body is required");
    const { trackId } = req.body;
    if (!trackId) return res.status(400).send("Track ID is required");
    const playlistTrack = await createPlaylists_tracks(
      req.playlist.id,
      trackId
    );
    res.status(201).send(playlistTrack);
  });
