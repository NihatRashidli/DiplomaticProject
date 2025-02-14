import mongoose from 'mongoose';

const inputSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
});

const Input = mongoose.model('Input', inputSchema);

export default Input;