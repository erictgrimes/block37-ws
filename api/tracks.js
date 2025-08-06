import express from "express";
const router = express.Router();
export default router;
import {
  getTracks,
  createTrack,
  deleteTrack,
  getTrackById,
} from "#db/queries/tracks";
