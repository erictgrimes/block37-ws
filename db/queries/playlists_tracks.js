import db from "#db/client";


export async function createPlaylists_tracks(playlistId, trackId) {
  const sql = `INSERT INTO playlists_tracks (playlist_id, track_id)
        VALUES ($1, $2)
        RETURNING *`;
  const {
    rows: [playlists_track],
  } = await db.query(sql, [playlistId, trackId]);
  return playlists_track;
}
