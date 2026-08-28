import mongoose, { Schema } from 'mongoose';

export interface ITeam {
  name: string;
  members: mongoose.Types.ObjectId[];
  createdAt?: Date;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
