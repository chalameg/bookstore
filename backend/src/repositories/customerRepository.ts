import { AppDataSource } from "../data-source";
import { Customer } from "../entities/Customer";

export class CustomerRepository {
    async createCustomer(customerDetails: Partial<Customer>): Promise<Customer> {
        const customerRepository = AppDataSource.getRepository(Customer);
        const customer = customerRepository.create(customerDetails);
        return customerRepository.save(customer);
    }

    async getCustomers(): Promise<Customer[]> {
        const customerRepository = AppDataSource.getRepository(Customer);
        return customerRepository.find();
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        const customerRepository = AppDataSource.getRepository(Customer);
        return customerRepository.findOneBy({ id });
    }

    async updateCustomer(id: number, customerDetails: Partial<Customer>): Promise<Customer | null> {
        const customerRepository = AppDataSource.getRepository(Customer);
        await customerRepository.update(id, customerDetails);
        return this.getCustomerById(id);
    }

    async deleteCustomer(id: number): Promise<void> {
        const customerRepository = AppDataSource.getRepository(Customer);
        await customerRepository.delete(id);
    }
}
