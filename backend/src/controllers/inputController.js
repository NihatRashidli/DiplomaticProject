import Input from '../models/inputModel.js';

export const saveInput = async (req, res) => {
    try {
        const newInput = new Input(req.body);
        await newInput.save();
        res.status(201).json(newInput);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInputs = async (req, res) => {
    try {
        const inputs = await Input.find();
        res.status(200).json(inputs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};