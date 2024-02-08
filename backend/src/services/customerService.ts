import { CustomerRepository } from "../repositories/customerRepository";
import { Customer } from "../entities/Customer";

export class CustomerService {
    private customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async createCustomer(customerDetails: Partial<Customer>): Promise<Customer> {
        return this.customerRepository.createCustomer(customerDetails);
    }

    async getCustomers(): Promise<Customer[]> {
        return this.customerRepository.getCustomers();
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        return this.customerRepository.getCustomerById(id);
    }

    async getCustomerByUsername(username: string): Promise<Customer | null> {
        return this.customerRepository.findByUsername(username);
    }

    async updateCustomer(id: number, customerDetails: Partial<Customer>): Promise<Customer | null> {
        return this.customerRepository.updateCustomer(id, customerDetails);
    }

    async deleteCustomer(id: number): Promise<void> {
        return this.customerRepository.deleteCustomer(id);
    }
}
