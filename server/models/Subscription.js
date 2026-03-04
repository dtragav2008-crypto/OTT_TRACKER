import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            required: [true, 'Platform name is required'],
            trim: true,
        },
        plan: {
            type: String,
            required: [true, 'Plan type is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        startDate: {
            type: String,
            required: [true, 'Start date is required'],
        },
        expiryDate: {
            type: String,
            required: [true, 'Expiry date is required'],
        },
        notes: {
            type: String,
            default: '',
            trim: true,
        },
        icon: {
            type: String,
            default: '📺',
        },
        color: {
            type: String,
            default: '#FF2B2B',
        },
    },
    {
        timestamps: true,
    }
)

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription
