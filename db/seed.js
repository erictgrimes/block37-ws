import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylists_tracks } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i <= 20; i++) {
    await createPlaylist(faker.music.genre(), faker.lorem.sentence());
    await createTrack(
      faker.music.songName(),
      faker.number.int({ min: 100000, max: 300000 })
    );
  }
  for (let i = 1; i <= 16; i++) {
    const playlistId = 1 + Math.floor(i / 2);

    await createPlaylists_tracks(playlistId, i);
  }
}
 