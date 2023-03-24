import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],

        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },

        // accounts: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Account",
        //     },
        // ],
        cash: {
            type: Number,
            // default: 0,
        },
        credit: {
            type: Number,
            min: [0, "Total credit should be positive only"],
            // default: 0,
        },
    },

    {

        toJSON: {
            virtuals: true,
            // Hide the _id and the __v field from the frontend
            transform: function (_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        },
        toObject: {
            virtuals: true,
            // Hide the _id and the __v field from the frontend
            transform: function (_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        },

    });

// Middleware - Create slug from name
export default mongoose.model('User', UserSchema);