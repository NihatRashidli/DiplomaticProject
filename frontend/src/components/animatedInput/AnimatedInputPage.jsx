import React, { useState } from 'react';
import './AnimatedInputPage.scss';
import axios from 'axios';

const AnimatedInputPage = () => {
    const [vehicleType, setVehicleType] = useState('');
    const [engineType, setEngineType] = useState('');
    const [invoiceValue, setInvoiceValue] = useState('');
    const [transportCost, setTransportCost] = useState('');
    const [otherCosts, setOtherCosts] = useState('');
    const [engineVolume, setEngineVolume] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [originCountry, setOriginCountry] = useState('other');
    const [customsFees, setCustomsFees] = useState({});

    const handleCalculate = async () => {
        const totalValue = (parseFloat(invoiceValue) + parseFloat(transportCost) + parseFloat(otherCosts)) || 0;
        try {
            const response = await axios.post('http://localhost:5000/api/customs', {
                vehicleType, engineType, totalValue, engineVolume, productionDate, originCountry
            });
            setCustomsFees(response.data);
        } catch (error) {
            console.error('Error calculating customs fees:', error);
        }
    };

    return (
        <div className="animated-input-page">
            <div className="input-section">
                <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                    <option value="">Maşın Növü</option>
                    <option value="car">Sedan</option>
                    <option value="truck">Yük Maşını</option>
                </select>
                <select value={engineType} onChange={(e) => setEngineType(e.target.value)}>
                    <option value="">Mühərrikin Növü</option>
                    <option value="petrol">Benzin</option>
                    <option value="diesel">Dizel</option>
                    <option value="hybrid-petrol">Hibrid-benzin</option>
                    <option value="hybrid-diesel">Hibrid-dizel</option>
                    <option value="gas">Qaz</option>
                    <option value="electric">Elektrik</option>




                </select>
                <input type="number" placeholder="İnvoys Dəyəri (USD)" value={invoiceValue} onChange={(e) => setInvoiceValue(e.target.value)} />
                <input type="number" placeholder="Nəqliyyat Xərci (USD)" value={transportCost} onChange={(e) => setTransportCost(e.target.value)} />
                <input type="number" placeholder="Digər Xərclər (USD)" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value)} />
                <input type="number" placeholder="Mühərrikin Həcmi (cc)" value={engineVolume} onChange={(e) => setEngineVolume(e.target.value)} />
                <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} />
                <div>
                    <label>
                        <input type="radio" value="other" checked={originCountry === 'other'} onChange={() => setOriginCountry('other')} /> Digər Ölkələr
                    </label>
                    <label>
                        <input type="radio" value="trade" checked={originCountry === 'trade'} onChange={() => setOriginCountry('trade')} /> Azad ticarət sazişi bağlanan istehsal olunub ordan gətirilir
                    </label>
                </div>
                <button onClick={handleCalculate}>Calculate</button>
            </div>
            <div className="result-section">
                <h2>Nəticə</h2>
                <ul>
                    <li>Vehicle Type: {vehicleType}</li>
                    <li>Engine Type: {engineType}</li>
                    <li>Invoice Value: {invoiceValue} AZN</li>
                    <li>Transport Cost: {transportCost} AZN</li>
                    <li>Other Costs: {otherCosts} AZN</li>
                    <li>Engine Volume: {engineVolume} cc</li>
                    <li>Production Date: {productionDate}</li>
                    <li>Origin Country: {originCountry}</li>
                    <li>Total Customs Fees: {customsFees.total || 0} AZN</li>
                </ul>
            </div>
        </div>
    );
};

export default AnimatedInputPage;