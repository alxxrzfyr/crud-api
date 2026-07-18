const express = require('express');
const cluster = require('cluster');
const os = require('os');
const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./swagger/openapi.json');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// High performance Express configuration
app.disable('x-powered-by');
app.set('etag', false);

// Standard body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// API Routes
app.use('/', taskRoutes);

// Fallback for 404 routes
app.use((req, res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end('{"error":"Route not found."}');
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end('{"error":"Internal server error."}');
});

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`Task API server (PID: ${process.pid}) running at http://localhost:${PORT}`);
    console.log(`Swagger UI documentation at http://localhost:${PORT}/docs`);
  });

  // Tune HTTP Keep-Alive for max connection throughput
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
  return server;
};

if (process.env.NODE_ENV !== 'test') {
  const numCPUs = os.cpus().length;
  if (process.env.USE_CLUSTER === 'true' && cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running. Scaling across ${numCPUs} CPU cores...`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`Worker process ${worker.process.pid} died. Forking replacement worker...`);
      cluster.fork();
    });
  } else {
    startServer();
  }
}

module.exports = app;
