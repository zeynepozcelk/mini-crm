const logger = require('../lib/logger');
const { v4: uuidv4 } = require('uuid');

const requestLogger = (req, res, next) => {
  // Trace ID oluştur ve hem isteğe hem cevaba ekle
  const traceId = uuidv4();
  req.traceId = traceId;
  res.setHeader('X-Trace-ID', traceId);

  // Request Logu (INFO seviyesi)
  logger.info(`[${traceId}] REQUEST: ${req.method} ${req.url}`);

  // Response tamamlandığında logla
  res.on('finish', () => {
    logger.info(`[${traceId}] RESPONSE: ${res.statusCode}`);
  });

  next();
};

module.exports = requestLogger;