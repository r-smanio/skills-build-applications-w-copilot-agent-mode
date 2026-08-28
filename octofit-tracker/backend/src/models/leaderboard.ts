import mongoose, { Schema } from 'mongoose';

export interface ILeaderboardEntry {
  user: mongoose.Types.ObjectId;
  score: number;
  recordedAt?: Date;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  recordedAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
