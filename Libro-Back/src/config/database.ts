import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

export async function connectDatabase(): Promise<void> {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB with URI:', uri);
    if (!uri) {
        throw new Error('Missing required environment variable: MONGODB_URI');
    }

    await mongoose.connect(uri);
}

export default mongoose;
