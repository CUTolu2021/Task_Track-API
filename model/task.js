const {model, Schema} = require('mongoose');

const taskSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['not done', 'in progress', 'done'],
      default: 'not done',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });

module.exports = model('Task', taskSchema);