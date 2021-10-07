export const ROUTER_UTILS = {
  config: {
    base: {
      home: '',
      detail: 'detail',
      dashboard: 'dashboard',
      wallet: 'wallet',
      tradingHistory: 'trading-history'
    },
    admin: {
      root:'admin',
      marketplace: 'marketplace'
    },
    auth: {
      root: 'auth',
      signIn: 'sign-in',
      signUp: 'sign-up',
      forgotPassword: 'forgot-password',
      forgotPasswordEmailSent: 'forgot-password-email-sent',
      passwordReset: 'password-reset',
      passwordResetFailed: 'password-reset-failed',
      passwordResetSucceeded: 'password-reset-succeeded',
    },
    settings: {
      root: 'settings',
      account: 'account',
      appearance: 'appearance',
      billing: 'billing',
      blockedUsers: 'blocked-users',
      notifications: 'notifications',
      security: 'security',
      securityLog: 'security-log',
    },
    user: {
      root: 'users',
      overview: 'overview',
      profile: ':username',
    },
    errorResponse: {
      notFound: '404',
    },
  },
};
