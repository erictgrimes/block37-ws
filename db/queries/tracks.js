import db from "#db/client";

// get all tracks, create a new track, get a track by id, delete a track by id
export async function getTracks() {
  const sql = "SELECT * FROM tracks";
  const { rows: tracks } = await db.query(sql);
  return tracks;
};

export async function createTrack(name, duration_ms) {
  const sql = `INSERT INTO tracks (name, duration_ms)
        Value ($1, $2)
        RETURNING *`;
  const {
    rows: [tracks],
  } = await db.query(sql, [name, duration_ms]);
  return tracks;
};

export async function deleteTrack(id) {
    const sql = `DELETE FROM tracks WHERE id = $1 RETURNING *`;
    const { rows: [track] } = await db.query(sql, [id]);
    return track;
};


export async function getTrackById(id) {
    const sql = `SELECT * FROM tracks where id = $1`;
    const { rows: [track] } = await db.query(sql, [id]);
    return track;
};