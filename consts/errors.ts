export const ErrorMessages = {
  login: {
    loginWasUnsuccessful: 'Login was unsuccessful. Please correct the errors and try again.',
    credentialsIncorrect: 'The credentials provided are incorrect',
    emailRequired: 'Please enter your email',
    passwordRequired: 'Please enter your password'
  },
  register: {
    emailExists: 'The specified email already exists',
    passwordMismatch: 'The password and confirmation password do not match.',
    requiredFields: 'First name is required. Last name is required. Email is required.'
  },
  cart: {
    emptyCart: 'Your Shopping Cart is empty!',
    outOfStock: 'The product is out of stock'
  },
  checkout: {
    addressRequired: 'Address is required',
    cityRequired: 'City is required',
    zipRequired: 'Zip / postal code is required',
    phoneRequired: 'Phone number is required'
  }
} as const;

export const ValidationMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must meet the following rules: must have at least 6 characters',
  required: 'This field is required'
} as const; 