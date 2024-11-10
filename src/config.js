let API_BASE_URL;

const env = process.env.APP_ENV;

switch (env) {
    case 'testing':
        API_BASE_URL = 'https://doctorpetsolution.azurewebsites.net/api';
        break;
    case 'beta':
        API_BASE_URL = 'https://beta.api.alquranclasses.com/api';
        break;
    case 'staging':
        API_BASE_URL = 'https://staging.api.alquranclasses.com/api';
        break;
    case 'local':
    default:
        //API_BASE_URL = 'https://test.api.alquranclasses.com/api';
        API_BASE_URL = 'https://doctorpetsolution.azurewebsites.net/api';
        break;
}

const STRIPE_PACKAGES= [
    { id: process.env.REACT_APP_STRIPE_PACKAGE_BASIC, name: 'Basic', price: 35, classes: 1 },
    { id: process.env.REACT_APP_STRIPE_PACKAGE_STANDARD, name: 'Standard', price: 65, classes: 2 },
    { id: process.env.REACT_APP_STRIPE_PACKAGE_PLUS, name: 'Plus', price: 79, classes: 3 },
    { id: process.env.REACT_APP_STRIPE_PACKAGE_PREMIUM, name: 'Premium', price: 95, classes: 4 },
    { id: process.env.REACT_APP_STRIPE_PACKAGE_VIP, name: 'Vip', price: 119, classes: 5 },
];

export { API_BASE_URL, STRIPE_PACKAGES};
