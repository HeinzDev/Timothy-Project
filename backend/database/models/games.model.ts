import mongoose, { Document, Schema, Types } from 'mongoose';

interface Games extends Document {
  name: string;
  image: string;
  stars: number;
  comments: number;
  genre: string;
  postedBy: Types.ObjectId;
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
  comments: Number,
  genre: String,
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const GamesModel = mongoose.model<Games>('Games', gamesSchema);

export default GamesModel;
