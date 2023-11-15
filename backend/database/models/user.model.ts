import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  name: string;
  username: string;
  password: string;
  icon: string;
  favoriteGames: mongoose.Types.ObjectId[];
  currentGame: string;
  currentGameCover: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  icon: String,
  favoriteGames: [
    {
      gameId: { type: Schema.Types.ObjectId, ref: 'Games' },
      medal: { type: Number, required: true },
    },
  ],
  currentGame: String,
  currentGameCover: String,
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
