import mongoose, { Document, Schema, Types } from 'mongoose';

interface Comment extends Document {
  user: Types.ObjectId;
  text: string;
  postId: Types.ObjectId;
}

const commentSchema = new Schema<Comment>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: String,
  postId: { type: Schema.Types.ObjectId, ref: 'Games' },
});

const CommentModel = mongoose.model<Comment>('Comment', commentSchema);

export default CommentModel;
