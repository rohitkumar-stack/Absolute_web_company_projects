import * as Yup from 'yup';
import moment from 'moment';
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
    companyName,
    companyOwner,
    contactPerson,
    documentType,
    documentName,
    // image,



    
  }
} = checkoutFormModel;

const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [leadNature.name]: Yup.string().required(`${leadNature.requiredErrorMsg}`),
    [leadStatus.name]: Yup.string().required(`${leadStatus.requiredErrorMsg}`),
    [leadType.name]: Yup.string()  .nullable().required(`${leadType.requiredErrorMsg}`),
    [leadDetails.name]: Yup.string()  .nullable().required(`${leadDetails.requiredErrorMsg}`),
    [comment.name]: Yup.string()  .nullable().required(`${comment.requiredErrorMsg}`),
    [leadReference.name]: Yup.string() .nullable().required(`${leadReference.requiredErrorMsg}`),
    // [companyOwner.name]: Yup.string().required(`${companyOwner.requiredErrorMsg}`)
  }),
  
  Yup.object().shape({
    [companyName.name]: Yup.string().required(`${companyName.requiredErrorMsg}`),
    [companyOwner.name]: Yup.string().required(`${companyOwner.requiredErrorMsg}`),
  }),

  Yup.object().shape({
    [contactPerson.name]: Yup.string().required(`${contactPerson.requiredErrorMsg}`),
  }),

  Yup.object().shape({
    [documentType.name]: Yup.string().required(`${documentType.requiredErrorMsg}`),
    [documentName.name]: Yup.string().required(`${documentName.requiredErrorMsg}`),
    // [documentName.image]: Yup.string().required(`${image.requiredErrorMsg}`),
  }),






];
