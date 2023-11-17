import Stripe from "stripe";
import { CheckoutItemDTO } from "../Dtos/checkout/checkout.item.dto";
import { OrderDTO } from "../Dtos/order/order.dto";
import { OrderItemDTO } from "../Dtos/order/order.item.dto";
import {
  DatabaseErrorResponse,
  ResourceNotFoundErrorResponse,
} from "../common/api.error";
import config from "../config/config";
import { Order } from "../models/order.model";
import { OrderItem } from "../models/orderItem.model";
import OrderItemRepository from "../repositories/order.item.repository";
import OrderRepository from "../repositories/order.repository";
import CartService from "../services/cart.service";
import { UserDTO } from "../Dtos/user/user.dto";
import Decimal from "decimal.js";
import { SessionDTO } from "../Dtos/checkout/session.dto";

// supply success and failure url for stripe
const successURL = config.client.baseUrl + "payment/success";
const failedURL = config.client.baseUrl + "payment/failed";

// set the private key
const apiKey = config.payment.secret;

class OrderService {
  private cartService = CartService;
  private orderRepository = OrderRepository;
  private orderItemRepository = OrderItemRepository;

  constructor() {}

  async getOrder(id: number, userId: number) {
    const orderDTO = await this.orderRepository.getById(id, userId);
    const order = await this.getOrderItemsFromOrderDTO(orderDTO);
    return order;
  }
  private async getOrderItemsFromOrderDTO(orderDTO: OrderDTO | null) {
    if (orderDTO === null) {
      throw new ResourceNotFoundErrorResponse();
    }

    const orderItems = await this.orderItemRepository.getById(orderDTO.id!);
    const order: Order = {
      ...orderDTO,
      orderItems: orderItems!,
    };

    return order;
  }
  async listOrders(userDTO: UserDTO) {
    const orderDTOs = await this.orderRepository.getAll(userDTO.id);
    if (orderDTOs === null) {
      throw new ResourceNotFoundErrorResponse();
    }
    const orders: Order[] = [];
    for (const orderDTO of orderDTOs) {
      const order = await this.getOrderItemsFromOrderDTO(orderDTO);

      orders.push(order);
    }

    return orders;
  }

  async createSession(
    checkoutListItemDTOs: CheckoutItemDTO[] // : Promise<Stripe.Response<Stripe.Checkout.Session>>
  ) {
    try {
      const stripe = new Stripe(apiKey, {
        apiVersion: "2023-10-16",
      });

      const lineItems = checkoutListItemDTOs.map((item) =>
        this.createSessionLineItem(item)
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${successURL}`,
        cancel_url: `${failedURL}`,
      });

      return session;
    } catch (error) {
      throw error;
    }
  }
  async placeOrder(user: UserDTO, sessionDTO: SessionDTO) {
    // Fetch the latest cart items
    const cartDTO = await this.cartService.getCartItems(user);

    // Validate the it exist
    if (cartDTO === null) {
      throw new ResourceNotFoundErrorResponse();
    }
    const cartItems = cartDTO.cartItems;
    // Validate the cart has items
    if (!cartItems) {
      throw new DatabaseErrorResponse();
    }

    // create DTO
    const newOrder: OrderDTO = {
      createdDate: new Date(),
      sessionId: sessionDTO.sessionId,
      userId: user.id,
      totalPrice: cartDTO.totalCost,
    };
    // Insert orders
    const result = await this.orderRepository.create(newOrder);

    // Insert each cart item into new order
    for (const cartItemDTO of cartItems) {
      const orderItem: OrderItemDTO = {
        price: cartItemDTO.price,
        productId: cartItemDTO.productId,
        quantity: cartItemDTO.quantity,
        orderId: result?.id!,
      };

      // Save each user
      await this.orderItemRepository.insert(orderItem);
    }
    // Remove the cart if it all done
    await this.cartService.removeCart(user);
  }

  private createSessionLineItem(checkoutItemDto: CheckoutItemDTO) {
    return {
      price_data: this.createPriceData(checkoutItemDto),
      quantity: checkoutItemDto.quantity,
    };
  }
  private createPriceData(checkoutItemDto: CheckoutItemDTO) {
    return {
      currency: "usd",
      product_data: {
        name: checkoutItemDto.productName,
      },
      unit_amount: new Decimal(checkoutItemDto.price).mul(100).toNumber(),
    };
  }
}

export default new OrderService();
