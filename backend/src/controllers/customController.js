import Input from '../models/inputModel.js';

export const calculateCustomsFees = async (req, res) => {
    const { vehicleType, engineType, totalValue, engineVolume, productionDate, originCountry } = req.body;

    let customsRate = 0.1; // Default rate

    // Vehicle type factor
    if (vehicleType === 'car') {
        customsRate += 0.05;
    } else if (vehicleType === 'truck') {
        customsRate += 0.1;
    }

    // Engine volume factor
    if (engineVolume > 2000) {
        customsRate += 0.05;
    }

    // Production date factor
    const currentYear = new Date().getFullYear();
    const productionYear = new Date(productionDate).getFullYear();
    const vehicleAge = currentYear - productionYear;
    if (vehicleAge > 10) {
        customsRate += 0.05;
    }

    // Origin country factor
    if (originCountry === 'trade') {
        customsRate -= 0.05;
    }

    // Calculate total customs fees
    const totalCustomsFees = totalValue * customsRate;

    const customsFees = {
        vehicleType,
        engineType,
        totalValue,
        engineVolume,
        productionDate,
        originCountry,
        total: totalCustomsFees
    };

    res.status(200).json(customsFees);
};