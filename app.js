import express from "express";
const app = express();
export default app;
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";
import playlistsTracksRouter from "#api/playlists_tracks";

app.get("/", (req, res) => {
  res.send("Welcom to Jukebox!");
});

app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);
app.use("/playlists_tracks", playlistsTracksRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

