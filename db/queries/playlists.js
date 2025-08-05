import db from "#db/client";

export async function getPlaylists() {
  const sql = "SELECT * FROM playlists";
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function createTrack(name, description) {
  const sql = `INSERT INTO playlists (name, description)
        Value ($1, $2)
        RETURNING *`;
  const {
    rows: [playlists],
  } = await db.query(sql, [name, description]);
  return playlists;
}

export async function deleteTrack(id) {
    const sql = `DELETE FROM playlists WHERE id = $1 RETURNING *`;
    const { rows: [track] } = await db.query(sql, [id]);
    return track;
}

export async function getPlaylistById(id) {
    const sql = `SELECT * FROM playlists where id = $1`;
    const { rows: [playlist] } = await db.query(sql, [id]);
    return playlist;
};