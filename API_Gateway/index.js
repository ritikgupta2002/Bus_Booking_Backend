const express = require("express");
const morgan = require("morgan");

const authenticate=require('./middlewares/authmiddleware');
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");

const app = express();

const PORT = 3003;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 mins
  max: 5,
});

app.use(morgan("combined"));
app.use(limiter);

app.use(
  "/bookingservice",
  authenticate,
  createProxyMiddleware({
    target: "http://localhost:3002/",
    changeOrigin: true,
  })
);
app.use(
  "/reminderservice",authenticate,
  createProxyMiddleware({
    target: "http://localhost:3004/",
    changeOrigin: true,
  })
);
app.use(
  "/bussearchservice",
  authenticate,
  createProxyMiddleware({
    target: "http://localhost:3005/",
    changeOrigin: true,
  })
);

app.get("/home", (req, res) => {
  return res.json({ Message: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
