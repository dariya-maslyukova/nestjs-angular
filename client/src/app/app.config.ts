export const CONFIG = {
  localStorageUserKey: 'currentUser',
  apiUrls: {
    Users: '/users',
    Profile: '/profile',
    Login: '/user/login',
    Logout: '/user/logout',
    Register: '/user/register',
    RequestPasswordReset: '/user/password-reset',
    PasswordChange: '/user/password-change',
    HomeSlider: '/slider',
    MockupProducts: 'https://www.coolandsexy.com.tr/category/autoSearch/', // TODO: remove test url products later
    enums: {
    }
  },
  mediaBreakpoints: {
    desktop: 1440,
    smallDesktop: 1200,
    tablet: 1024
  },
  errorMessages: {
    required: 'This field is required',
    email: 'Invalid email format',
    website: 'Invalid website url',
    minlength: 'Value is too short',
    maxlength: 'Value is too long',
    dateComparison: 'Invalid date',
    confirmPassword: 'Passwords are different'
  },
  infoMessages: {
    itemNotFound: 'Item not found'
  },
  dateFormat: 'd MMM y',
  timeFormat: 'hh:mm'
};
