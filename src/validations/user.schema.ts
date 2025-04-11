import * as yup from 'yup';

export const GetUserSchema = yup.object({
  userId: yup.string().required('UserId is required'),
});
