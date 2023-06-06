import express from 'express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')('sk_test_51NFZwoDQ9vYTY0QA8A7kWErpVMSU978ZVucgssaJpfU0Y4K6cYwRxkDts9KCKHYFrDIaGRDTSQfKmuWPN3vJFY7100nikFrnYM')

const router = express.Router()

export const checkout = router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
    });

    res.send({ url: session.url });
});

