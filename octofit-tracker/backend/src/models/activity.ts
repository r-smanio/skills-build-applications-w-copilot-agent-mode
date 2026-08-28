import mongoose, { Schema } from 'mongoose';

export interface IActivity {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  date: Date;
  calories?: number;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, default: 0 },
  date: { type: Date, default: () => new Date() },
  calories: { type: Number },
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
