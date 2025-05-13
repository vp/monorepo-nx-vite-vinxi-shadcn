export const isServer = () => typeof window === 'undefined';
export const isClient = () => typeof window !== 'undefined';

export const isDev = () => process.env.NODE_ENV === 'development';
const logPrefix = () => (isServer() ? '[SERVER]' : '[CLIENT]');

export const log = (...args: any[]) => {
  if (isDev()) {
    console.log(logPrefix(), ...args);
  }
};
export const warn = (...args: any[]) => {
  if (isDev()) {
    console.warn(logPrefix(), ...args);
  }
};
export const error = (...args: any[]) => {
  if (isDev()) {
    console.error(logPrefix(), ...args);
  }
};

export const logger = {
  log,
  warn,
  error,
};