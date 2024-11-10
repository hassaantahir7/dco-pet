import * as yup from 'yup';

export const generateValidationSchema = (fields) => {
    return yup.object().shape(
        fields.reduce((acc, field) => {
            switch (field.name) {
                case 'firstName':
                case 'lastName':
                    acc[field.name] = yup
                        .string()
                        .min(2, 'Name must be at least 2 characters')
                        .max(20, 'Name must be at most 20 characters')
                        .matches(/^[A-Za-z ]+$/, 'Name must only contain letters')
                        .required('Name is required');
                    break;
                case 'age':
                    acc[field.name] = yup
                        .number()
                        .typeError('Age must be a number')
                        .positive('Age must be a positive number')
                        .integer('Age must be an integer')
                        .min(2, 'Age must be at least 2')
                        .max(100, 'Age must be at most 100')
                        .required('Age is required');
                    break;
                case 'email':
                    acc[field.name] = yup
                        .string().email('Invalid email')
                        .required('Email is required');
                    break;
                case 'password':
                    acc[field.name] = yup
                        .string()
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                            'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
                        )
                        .required('Password is required');
                    break;
                case 'confirm-password':
                    acc[field.name] = yup
                        .string()
                        .oneOf([yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required');
                    break;
                case 'otp':
                    acc[field.name] = yup
                        .string()
                        .matches(/^[0-9]{4}$/, 'OTP must be 4 digits')
                        .required('OTP is required');
                    break;
                case 'mobile':
                    acc[field.name] = yup
                        .string()
                        .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits')
                        .required('Phone number is required');
                    break;
                case 'agree':
                    acc[field.name] = yup
                        .boolean()
                        .oneOf([true], 'Must Agree to Proceed')
                        .required('You must agree to proceed');
                    break;
                case 'profile_photo_url':
                    acc[field.name] = yup
                        .mixed()
                        .test('fileSize', 'File size should be less than 2MB', value => {
                            return !value || value.size <= 2 * 1024 * 1024;
                        })
                        .test('fileType', 'Supported formats are .jpg, .jpeg, .png', value => {
                            return !value || ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
                        });
                    break;
                case 'attachments':
                    acc[field.name] = yup
                        .array()
                        .of(
                            yup
                                .mixed()
                                .test('fileSize', 'File size should be less than 2MB', value => {
                                    return !value || value.size <= 2 * 1024 * 1024;
                                })
                                .test('fileType', 'Supported formats are .jpg, .jpeg, .png', value => {
                                    return !value || ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
                                })
                        );
                    break;
                case 'subject':
                    acc[field.name] = yup
                        .string()
                        .min(10, 'Subject must be at least 10 characters')
                        .max(50, 'Subject must be at most 50 characters')
                        .required('Subject is required');
                    break;
                case 'department':
                    acc[field.name] = yup
                        .string()
                        .required('Department is required');
                    break;
                case 'description':
                    acc[field.name] = yup
                        .string()
                        .min(10, 'Description must be at least 10 characters')
                        .max(100, 'Description must be at most 500 characters')
                        .required('Description is required');
                    break;
                case 'change-teacher-reason':
                    acc[field.name] = yup
                        .number()
                        .typeError('Change teacher reason is required')
                        .min(1, 'Change teacher reason is required')
                        .required('Change teacher reason is required');

                    break;
                case 'time-slot-shift':
                    acc[field.name] = yup
                        .array()
                        .min(1, 'Select at least one shift')
                        .max(2, 'Select at most two one shifts')
                        .required('Shift is required');
                    break;
                case 'coupon_code':
                    acc[field.name] = yup
                        .string()
                        .min(5, 'Coupon code must be at least 5 characters')
                        .max(10, 'Coupon code must be at most 10 characters')
                        .required('Coupon code is required');
                    break;
                case 'to':
                    acc[field.name] = yup
                        .string()
                        .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits')
                        .required('Phone number is required');
                    break;
                case 'code':
                    acc[field.name] = yup
                        .string()
                        .min(6, 'Verification code must be at least 6 characters')
                        .max(6, 'Verification code must be at most 6 characters')
                        .required('Verification code is required');
                    break;
                case 'type':
                    acc[field.name] = yup
                        .string()
                        .required('Type is required');
                    break;
                case 'course_name':
                    acc[field.name] = yup
                        .string()
                        .required('Course is required');
                    break;
                case 'student_name':
                    acc[field.name] = yup
                        .string()
                        .required('Student is required');
                    break;
                case 'parental_lock_pin':
                    acc[field.name] = yup
                        .string()
                        .matches(/^[0-9]{4}$/, 'Pin must be 4 digits')
                        .required('Pin is required');
                    break;
                default:
                    break;
            }
            return acc;
        }, {})
    );
};