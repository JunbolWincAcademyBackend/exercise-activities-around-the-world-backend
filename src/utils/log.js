import winston from 'winston';

// Create a Winston logger instance with configuration
const logger = winston.createLogger({
  level: 'info', // Set the default log level to "info" (can be adjusted)
  
  // Format the logs in JSON format (useful for structured logging)
  format: winston.format.json(),
  
  // ✅ Updated: Meta information to add to each log message (e.g., service name)
  defaultMeta: { service: 'activities-api' },  
});

// Conditionally add console logging during development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      // During development, use simple text format for console output
      format: winston.format.simple(),
    })
  );
}

// Export the logger instance for use in other files
export default logger;


