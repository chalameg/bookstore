import { Order } from '../entities/Order';
import { OrderRepository } from '../repositories/orderRepository';

export class OrderService {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(orderDetails: Partial<Order>): Promise<Order> {
        return this.orderRepository.createOrder(orderDetails);
    }

    async getOrderById(orderId: number): Promise<Order | null> {
        return this.orderRepository.getOrderById(orderId);
    }

    async cancelOrder(orderId: number): Promise<Order | null> {
        return this.orderRepository.cancelOrder(orderId);
    }
}
