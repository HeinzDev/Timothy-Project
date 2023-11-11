import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  name: string;
  username: string;
  password: string;
  icon: string;
  favoriteGames: mongoose.Types.ObjectId[];
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
  favoriteGames: [{ type: Schema.Types.ObjectId, ref: 'Games' }],
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
