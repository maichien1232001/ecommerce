// config/paypal.js
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config()

// Cấu hình PayPal API client
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Cấu hình môi trường PayPal
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
