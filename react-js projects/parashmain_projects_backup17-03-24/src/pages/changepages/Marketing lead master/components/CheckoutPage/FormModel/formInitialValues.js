import checkoutFormModel from './checkoutFormModel';
const {
  formField: {
    firstName,
    leadNature,
    leadStatus,
    leadType,
    leadReference,
    leadDetails,
    comment,
    useAddressForPaymentDetails,
    companyName,
    companyOwner,
    contactPerson,
    documentType,
    documentName,
    // image,
  }
} = checkoutFormModel;

export default {
  [firstName.name]: '',
  [leadNature.name]: '',
  [leadStatus.name]: '',
  [leadType.name]: '',
  [leadReference.name]: '',
  [leadDetails.name]: '',
  [comment.name]: '',
  [useAddressForPaymentDetails.name]: false,
  [companyName.name]: '',
  [companyOwner.name]: '',
  [contactPerson.name]: '',
  [documentType.name]: '',
  [documentName.name]: '',
  // [image.name]: '',
};
