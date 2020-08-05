import winston from 'winston';

const { combine, timestamp, label, simple, json, colorize } = winston.format;

const dev = combine(
  colorize(),
  label({ label: 'Wetty' }),
  timestamp(),
  simple(),
);

const prod = combine(label({ label: 'Wetty' }), timestamp(), json());

export const logger = winston.createLogger({
  format: process.env.NODE_ENV === 'development' ? dev : prod,
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
      handleExceptions: true,
    }),
  ],
});
