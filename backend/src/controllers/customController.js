export const calculateCustomsFees = async (req, res) => {
  const {
    vehicleType,
    engineType,
    totalValue,
    engineVolume,
    productionDate,
    originCountry,
  } = req.body;

  let customsRate = 0.1;

  if (vehicleType === "Sedan") {
    customsRate += 0.25;
  } else if (vehicleType === "Yük Maşını") {
    customsRate += 0.1;
  }

  switch (engineType) {
    case "Benzin":
      customsRate += 0.1;
      break;
    case "Dizel":
      customsRate += 0.07;
      break;
    case "Hibrid-benzin":
      customsRate += 0.035;
      break;
    case "Hibrid-dizel":
      customsRate += 0.03;
      break;
    case "Qaz":
      customsRate += 0.01;
      break;
    case "Elektrik":
      customsRate -= 0.05;
      break;
    default:
      break;
  }

  if (engineVolume > 2000) {
    customsRate += 0.05;
  } else if (engineVolume > 4000) {
    customsRate += 0.1;
  }

  const currentYear = new Date().getFullYear();
  const productionYear = new Date(productionDate).getFullYear();
  const vehicleAge = currentYear - productionYear;
  if (vehicleAge > 10) {
    customsRate += 0.05;
  }

  if (originCountry === "Vergidən azad") {
    customsRate -= 0.05;
  }

  const totalCustomsFees = totalValue * customsRate;

  const customsFees = {
    vehicleType,
    engineType,
    totalValue,
    engineVolume,
    productionDate,
    originCountry,
    total: totalCustomsFees,
  };

  res.status(200).json(customsFees);
};
