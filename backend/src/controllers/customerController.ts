// src/controllers/customerController.ts
import { Request, Response, Router } from "express";
import { CustomerService } from "../services/customerService";

const router = Router();
const customerService = new CustomerService();

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     description: Adds a new customer to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - points
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               points:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Error creating customer
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        const customer = await customerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).send("Error creating customer");
    }
});

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieves a list of all customers.
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Error fetching customers
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const customers = await customerService.getCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).send("Error fetching customers");
    }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     description: Retrieves detailed information about a customer by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the customer to retrieve
 *     responses:
 *       200:
 *         description: Detailed information about the customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Error fetching customer
 */
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await customerService.getCustomerById(Number(id));
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).send("Customer not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching customer");
    }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer
 *     description: Updates the information of an existing customer.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the customer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: janedoe
 *               points:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Error updating customer
 */
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await customerService.updateCustomer(Number(id), req.body);
        res.json(customer);
    } catch (error) {
        res.status(500).send("Error updating customer");
    }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     description: Deletes an existing customer from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the customer to delete
 *     responses:
 *       204:
 *         description: Customer deleted successfully
 *       500:
 *         description: Error deleting customer
 */
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await customerService.deleteCustomer(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).send("Error deleting customer");
    }
});

export default router;
