// controllers/paymentController.js
const paypalClient = require('../config/paypal');
const paypal = require('@paypal/checkout-server-sdk');

const createPayment = async (req, res) => {
    const { totalAmount, currency, returnUrl, cancelUrl } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: currency || 'USD',
                    value: totalAmount,
                },
            },
        ],
        application_context: {
            return_url: returnUrl,
            cancel_url: cancelUrl,
        },
    });

    try {
        const order = await paypalClient.execute(request);
        res.status(200).json({ id: order.result.id });
    } catch (error) {
        console.error('Error creating PayPal payment', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const capturePayment = async (req, res) => {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await paypalClient.execute(request);
        res.status(200).json({ status: 'success', data: capture.result });
    } catch (error) {
        console.error('Error capturing PayPal payment', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createPayment, capturePayment };
