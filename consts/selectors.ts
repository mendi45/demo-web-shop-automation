/**
 * Common selectors for the Demo Web Shop
 */

import { CategoryData, ProductTypeKey } from './types';

export const Selectors = {
  // Header
  header: {
    loginLink: 'a[href="/login"]',
    registerLink: 'a[href="/register"]',
    shoppingCartLink: 'a[href="/cart"]',
    wishlistLink: 'a[href="/wishlist"]',
    accountLink: 'a[href="/customer/info"]',
    logoutLink: 'a[href="/logout"]'
  },

  // Login Page
  login: {
    emailInput: '#Email',
    passwordInput: '#Password',
    rememberMeCheckbox: '#RememberMe',
    loginButton: 'input[value="Log in"]',
    forgotPasswordLink: 'a[href="/passwordrecovery"]',
    validationMessage: '.validation-summary-errors',
    title: 'Demo Web Shop. Login'
  },

  // Register Page
  register: {
    genderMale: '#gender-male',
    genderFemale: '#gender-female',
    firstName: '#FirstName',
    lastName: '#LastName',
    email: '#Email',
    password: '#Password',
    confirmPassword: '#ConfirmPassword',
    registerButton: '#register-button'
  },

  // Product
  product: {
    addToCartButton: 'input[value="Add to cart"]',
    addToWishlistButton: 'input[value="Add to wishlist"]',
    quantityInput: '#addtocart_EnteredQuantity',
    productName: '.product-name',
    productPrice: '.product-price'
  },

  // Shopping Cart
  cart: {
    cartTable: '.cart',
    updateCartButton: 'input[name="updatecart"]',
    continueShoppingButton: 'input[name="continueshopping"]',
    checkoutButton: 'input[name="checkout"]',
    removeItemCheckbox: 'input[name="removefromcart"]'
  },

  // Common
  common: {
    loadingIndicator: '.ajax-loading-block-window',
    successMessage: '.success',
    errorMessage: '.error',
    validationMessage: '.validation-summary-errors'
  }
} as const;

/**
 * Test data for the Demo Web Shop
 */
export const TestData = {
  categories: {
    books: {
      name: 'Books',
      productTypes: [
        'Computing and Internet',
        'Fiction',
        'Health',
        'Science',
        'Sports'
      ] as readonly ProductTypeKey[]
    },
    computers: {
      name: 'Computers',
      productTypes: [
        'Desktop',
        'Notebook',
        'Accessories'
      ] as readonly ProductTypeKey[]
    },
    electronics: {
      name: 'Electronics',
      productTypes: [
        'Camera, photo',
        'Cell phones'
      ] as readonly ProductTypeKey[]
    },
    apparel: {
      name: 'Apparel & Shoes',
      productTypes: [
        'Clothing',
        'Shoes',
        'Accessories'
      ] as readonly ProductTypeKey[]
    },
    digitalDownloads: {
      name: 'Digital downloads',
      productTypes: [
        'Music',
        'Software',
        'E-books'
      ] as readonly ProductTypeKey[]
    },
    jewelry: {
      name: 'Jewelry',
      productTypes: [
        'Necklaces',
        'Bracelets',
        'Earrings',
        'Rings'
      ] as readonly ProductTypeKey[]
    },
    giftCards: {
      name: 'Gift Cards',
      productTypes: [
        'Physical Gift Card',
        'Virtual Gift Card'
      ] as readonly ProductTypeKey[]
    }
  } as CategoryData,

  // Sort options
  sortOptions: {
    position: 'Position',
    nameAZ: 'Name: A to Z',
    nameZA: 'Name: Z to A',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    createdOn: 'Created on'
  }
} as const; 