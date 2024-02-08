import { Router, Request, Response } from 'express';
import { OrderService } from '../services/orderService';

const router = Router();
const orderService = new OrderService();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               orderStatus:
 *                 type: string
 *             required:
 *               - customerId
 *               - bookId
 *               - orderStatus
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error creating the order
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).send('Error creating order');
    }
});

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error fetching the order
 */
router.get('/:orderId', async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const order = await orderService.getOrderById(orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching order');
    }
});

/**
 * @swagger
 * /api/orders/{orderId}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found or already canceled
 *       500:
 *         description: Error canceling the order
 */
router.patch('/:orderId/cancel', async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const order = await orderService.cancelOrder(orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).send('Order not found or already canceled');
        }
    } catch (error) {
        res.status(500).send('Error canceling order');
    }
});

export default router;
