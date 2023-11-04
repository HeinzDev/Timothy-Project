import mongoose, { Document, Schema } from 'mongoose';

interface Games extends Document {
  name: string;
  image: string;
  stars: number;
  Comments: number;
}

const gamesSchema = new Schema<Games>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stars: Number,
  Comments: Number,
});

const GamesModel = mongoose.model<Games>('Games', gamesSchema);

export default GamesModel;
