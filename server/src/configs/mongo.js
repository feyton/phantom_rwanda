import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URL || '';

const connect = mongoose.connect(uri, { autoIndex: true });

export default connect;
