import mongoose, { Schema } from 'mongoose';

export interface IExercise {
  name: string;
  reps?: number;
  sets?: number;
  durationMinutes?: number;
}

export interface IWorkout {
  user: mongoose.Types.ObjectId;
  name: string;
  exercises: IExercise[];
  createdAt?: Date;
}

const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  reps: { type: Number },
  sets: { type: Number },
  durationMinutes: { type: Number },
});

const WorkoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  exercises: { type: [ExerciseSchema], default: [] },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
