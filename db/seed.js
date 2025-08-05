import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  async function seedTracks() {
    for (let i = 0; i < 20; i++) {
      const track = {
        name: faker.music.songName(),
        duration_ms: faker.number.int({ min: 60000, max: 600000 }),
      };
      await createTrack(track);
      console.log(`Created Track: ${track.name}`);
    }
  }

  async function seedPlaylists() {}

  async function seedPlaylistsTracks() {}
}
