const express = require("express");
const logger = require("./lib/logger");
const requestLogger = require('./middleware/loggerMiddleware'); // Yeni middleware

const customersRouter = require("./routes/customers");
const ordersRouter = require("./routes/orders");

const app = express();

// 1. Temel Middleware'ler
app.use(express.json());

// 2. Loglama Middleware (Rotalardan ÖNCE gelmeli ki her isteği yakalasın)
app.use(requestLogger); 

// NOT: Aşağıdaki eski "basit log" kısmını silebilirsin, 
// çünkü requestLogger zaten Trace ID ile daha detaylısını yapıyor.
/* app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
}); 
*/

// 3. Rotalar
app.use("/api/customers", customersRouter);
app.use("/api/orders", ordersRouter);

// 4. Hata Yakalama (En SONDA kalmalı)
app.use((err, req, res, next) => {
  const traceId = req.traceId || 'N/A';
  
  // Hata Logu (ERROR seviyesi)
  logger.error(`[${traceId}] HATA OLUŞTU: ${err.message}`, { stack: err.stack });

  res.status(err.status || 500).json({
    error: err.message,
    traceId: traceId 
  });
});

module.exports = app; // Testlerin çalışması için bu satır çok önemli!