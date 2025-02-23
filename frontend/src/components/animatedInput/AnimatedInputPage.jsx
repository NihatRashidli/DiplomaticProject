import React, { useState } from "react";
import "./AnimatedInputPage.scss";
import axios from "axios";
import { useFormik } from "formik";
import TaxCalculateSchema from "../../schema/TaxCalculate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnimatedInputPage = () => {
  const [customsFees, setCustomsFees] = useState({});

  const formik = useFormik({
    initialValues: {
      vehicleType: "",
      engineType: "",
      invoiceValue: "",
      transportCost: "",
      otherCosts: "",
      engineVolume: "",
      productionDate: "",
      originCountry: "",
    },
    validationSchema: TaxCalculateSchema,
    onSubmit: async (values) => {
      const totalValue =
        parseFloat(values.invoiceValue) +
          parseFloat(values.transportCost) +
          parseFloat(values.otherCosts) || 0;
      try {
        const response = await axios.post("http://localhost:5000/api/customs", {
          vehicleType: values.vehicleType,
          engineType: values.engineType,
          totalValue,
          engineVolume: values.engineVolume,
          productionDate: values.productionDate,
          originCountry: values.originCountry,
        });
        setCustomsFees(response.data);
        toast.success("Gömrük dəyəri uğurla hesablandı!");
      } catch (error) {
        console.error("Error calculating customs fees:", error);
        toast.error("Gömrük dəyəri hesablanarkən xəta baş verdi.");
      }
    },
  });

  return (
    <div className="animated-input-page">
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="input-section">
        <select
          name="vehicleType"
          value={formik.values.vehicleType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Maşın Növü</option>
          <option value="Sedan">Sedan</option>
          <option value="Yük Maşını">Yük Maşını</option>
        </select>
        {formik.touched.vehicleType && formik.errors.vehicleType ? (
          <div className="yup-tax">{formik.errors.vehicleType}</div>
        ) : null}

        <select
          name="engineType"
          value={formik.values.engineType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Mühərrikin Növü</option>
          <option value="Benzin">Benzin</option>
          <option value="Dizel">Dizel</option>
          <option value="Hibrid-benzin">Hibrid-benzin</option>
          <option value="Hibrid-dizel">Hibrid-dizel</option>
          <option value="Qaz">Qaz</option>
          <option value="Elektrik">Elektrik</option>
        </select>
        {formik.touched.engineType && formik.errors.engineType ? (
          <div className="yup-tax">{formik.errors.engineType}</div>
        ) : null}

        <input
          type="number"
          name="invoiceValue"
          placeholder="İnvoys Dəyəri (AZN)"
          value={formik.values.invoiceValue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onWheel={(e) => e.target.blur()}
          min="0"
        />
        {formik.touched.invoiceValue && formik.errors.invoiceValue ? (
          <div className="yup-tax">{formik.errors.invoiceValue}</div>
        ) : null}

        <input
          type="number"
          name="transportCost"
          placeholder="Nəqliyyat Xərci (AZN)"
          value={formik.values.transportCost}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onWheel={(e) => e.target.blur()}
          min="0"
        />
        {formik.touched.transportCost && formik.errors.transportCost ? (
          <div className="yup-tax">{formik.errors.transportCost}</div>
        ) : null}

        <input
          type="number"
          name="otherCosts"
          placeholder="Digər Xərclər (AZN)"
          value={formik.values.otherCosts}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onWheel={(e) => e.target.blur()}
          min="0"
        />
        {formik.touched.otherCosts && formik.errors.otherCosts ? (
          <div className="yup-tax">{formik.errors.otherCosts}</div>
        ) : null}

        <input
          type="number"
          name="engineVolume"
          placeholder="Mühərrikin Həcmi (cc)"
          value={formik.values.engineVolume}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onWheel={(e) => e.target.blur()}
          min="0"
        />
        {formik.touched.engineVolume && formik.errors.engineVolume ? (
          <div className="yup-tax">{formik.errors.engineVolume}</div>
        ) : null}

        <input
          type="date"
          name="productionDate"
          value={formik.values.productionDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.productionDate && formik.errors.productionDate ? (
          <div className="yup-tax">{formik.errors.productionDate}</div>
        ) : null}

        <div>
          <label>
            <input
              type="radio"
              name="originCountry"
              value="Digər Ölkələr"
              checked={formik.values.originCountry === "Digər Ölkələr"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{" "}
            Digər Ölkələr
          </label>
          <label>
            <input
              type="radio"
              name="originCountry"
              value="Vergidən Azad"
              checked={formik.values.originCountry === "Vergidən Azad"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{" "}
            Azad ticarət sazişi bağlanan istehsal olunub ordan gətirilir
          </label>
        </div>

        {formik.touched.originCountry && formik.errors.originCountry ? (
          <div className="yup-tax">{formik.errors.originCountry}</div>
        ) : null}

        <button type="submit">Calculate</button>
      </form>
      <div className="result-section">
        <h2>Nəticə</h2>
        <ul>
          <li>Maşın Növü: {formik.values.vehicleType}</li>
          <li>Mühərrik Növü: {formik.values.engineType}</li>
          <li>Invoys Dəyəri: {formik.values.invoiceValue} AZN</li>
          <li>Nəqliyyat Xərci: {formik.values.transportCost} AZN</li>
          <li>Digər Xərclər: {formik.values.otherCosts} AZN</li>
          <li>Mühərrik Həcmi: {formik.values.engineVolume} cc</li>
          <li>İstehsal Tarixi: {formik.values.productionDate}</li>
          <li>Digər Ölkələr: {formik.values.originCountry}</li>
          <li>
            Ümumi Gömrük Dəyəri: {(customsFees.total || 0).toFixed(2)} AZN
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnimatedInputPage;
