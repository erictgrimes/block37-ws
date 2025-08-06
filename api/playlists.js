import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
} from "#db/queries/playlists";

import {
  getPlaylists_tracks,
  createPlaylists_tracks,
} from "#db/queries/playlists_tracks";

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
    const playlist = await createPlaylist({ name, description });
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

router
.route("/:id")
.get((req, res) => {
    res.status(200).send(req.playlist);
})


router
.route("/:id/tracks")
.get(async (req, res) => {
    const tracks = await getAllTracksInPLaylist(req.playlist.id);
    res.status(200).send(tracks);
})
.post(async (req, res) => {
    if (!req.body) return res.status(400).send("request body is required");
    const { track_id } = req.body;
    if (!track_id) {
      return res.status(400).send("Track ID is required");
    }
    const playlistTrack = await createPlaylists_tracks({
      playlist_id: req.playlist.id,
      track_id,
    });
    res.status(201).send(playlistTrack);

});
