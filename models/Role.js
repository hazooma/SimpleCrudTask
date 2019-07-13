// grab the things we need
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
// create a schema
const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    permission: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// the schema is useless so far
// we need to create a model using it
const Role = mongoose.model('Role', roleSchema);

// make this available to our users in our Node applications
export default Role;
