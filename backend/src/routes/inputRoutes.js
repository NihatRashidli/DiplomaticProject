import express from 'express';
import { saveInput, getInputs } from '../controllers/inputController.js';

const router = express.Router();

router.post('/', saveInput);
router.get('/', getInputs);

export default router;