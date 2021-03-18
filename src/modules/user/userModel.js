import mongoose from 'mongoose';
import { listRoles } from '../permission/roles.js';

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    email: {
      type: String,
      required: false,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },

    name: {
      type: String,
      unique: false,
      trim: true,
      default: '',
    },

    firstName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      match: /^[A-Za-z\-']{1,20}$/,
      default: '',
    },

    lastName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      match: /^[A-Za-z\-']{1,20}$/,
      default: '',
    },

    password: {
      type: String,
      select: false,
      required: true,
    },

    resetPassword: {
      hash: { type: String, select: false },
      date: {
        select: false,
        type: Date,
        required: false,
      },
      history: [
        {
          date: Date,
        },
      ],
    },

    roles: [
      {
        type: String,
        required: true,
        enum: listRoles,
      },
    ],

  },

  { timestamps: {}, versionKey: false },
);

export default mongoose.model('User', userSchema);
