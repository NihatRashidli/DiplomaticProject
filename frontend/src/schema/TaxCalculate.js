import * as Yup from "yup";

const TaxCalculateSchema = Yup.object().shape({
  vehicleType: Yup.string().required("Mütləq daxil edilməlidir"),
  engineType: Yup.string().required("Mütləq daxil edilməlidir"),
  invoiceValue: Yup.number().min(0, "Sıfırdan böyük və ya sıfıra bərabər olmalıdır").required("Mütləq daxil edilməlidir"),
  transportCost: Yup.number().min(0, "Sıfırdan böyük və ya sıfıra bərabər olmalıdır").required("Mütləq daxil edilməlidir"),
  otherCosts: Yup.number().min(0, "Sıfırdan böyük və ya sıfıra bərabər olmalıdır").required("Mütləq daxil edilməlidir"),
  engineVolume: Yup.number().min(0, "Sıfırdan böyük və ya sıfıra bərabər olmalıdır").required("Mütləq daxil edilməlidir"),
  productionDate: Yup.date().required("Mütləq daxil edilməlidir"),
  originCountry: Yup.string().required("Mütləq daxil edilməlidir"),
});

export default TaxCalculateSchema;