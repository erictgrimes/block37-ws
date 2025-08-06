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
  await seedTracks();
  await seedPlaylists();
  await seedPlaylistsTracks();

  async function seedTracks() {
    for (let i = 0; i < 20; i++) {
      const track = {
        name: faker.music.songName(),
        duration_ms: faker.number.int({ min: 60000, max: 600000 }),
      };
      await createTrack(track.name, track.duration_ms);
      console.log(`Created Track: ${track.name}`);
    }
  }

  async function seedPlaylists() {
    for (let i = 0; i < 10; i++) {
      const playlist = {
        name: faker.music.genre(),
        description: faker.lorem.sentence(),
      };
      await createPlaylist(playlist.name, playlist.description);
      console.log(`Created Playlist: ${playlist.name}`);
    }
  }

  async function seedPlaylistsTracks() {
    for (let i = 0; i < 15; i++) {
      const playlist_track = {
        playlistId: faker.number.int({ min: 1, max: 10 }),
        trackId: faker.number.int({ min: 11, max: 20 }),
      };
      await createPlaylists_tracks(
        playlist_track.playlistId,
        playlist_track.trackId
      );
      console.log(
        `Created Playlist-Track Link: Playlist ID ${playlist_track.playlistId}, Track ID ${playlist_track.trackId}`
      );
    }
  }
}
