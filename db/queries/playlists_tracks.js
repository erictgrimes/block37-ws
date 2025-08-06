import db from "#db/client";

export async function getPlaylists_tracks() {
  const sql = "SELECT * FROM playlists";
  const { rows: playlists_tracks } = await db.query(sql);
  return playlists_tracks;
}

export async function createPlaylists_tracks(playlistId, trackId) {
  const sql = `INSERT INTO playlists_tracks (playlist_id, track_id)
        VALUES ($1, $2)
        RETURNING *`;
  const {
    rows: [playlists_tracks],
  } = await db.query(sql, [playlistId, trackId]);
  return playlists_tracks;
}
