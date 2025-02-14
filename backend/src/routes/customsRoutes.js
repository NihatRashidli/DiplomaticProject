import express from 'express';
import { calculateCustomsFees } from '../controllers/customController.js'; // Fayl adı düzəldildi

const router = express.Router();

router.post('/', calculateCustomsFees);

export default router;