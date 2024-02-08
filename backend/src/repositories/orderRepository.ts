import { AppDataSource } from '../data-source';
import { Order } from '../entities/Order';

export class OrderRepository {
    async createOrder(orderDetails: Partial<Order>): Promise<Order> {
        const orderRepository = AppDataSource.getRepository(Order);
        const order = orderRepository.create(orderDetails);
        return orderRepository.save(order);
    }

    async getOrderById(orderId: number): Promise<Order | null> {
        const orderRepository = AppDataSource.getRepository(Order);
        return orderRepository.findOne({
            where: { id: orderId },
            relations: ['customer', 'book'],
        });
    }

    async cancelOrder(orderId: number): Promise<Order | null> {
        const orderRepository = AppDataSource.getRepository(Order);
        let order = await orderRepository.findOneBy({ id: orderId });
        if (order) {
            order.orderStatus = 'canceled';
            order = await orderRepository.save(order);
        }
        return order;
    }

}
