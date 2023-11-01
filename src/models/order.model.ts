import { OrderItem } from "./orderItem.model";

export interface Order {
  id: number;
  createdDate: Date;
  totalPrice: number;
  sessionId: string;
  orderItems: OrderItem[];
  userId: number;
}
export function validateOrder(order: Order): void {
  if (!order.createdDate) {
    throw new Error("The createdDate property is required.");
  }

  if (!order.totalPrice) {
    throw new Error("The totalPrice property is required.");
  }

  if (!order.sessionId) {
    throw new Error("The sessionId property is required.");
  }

  if (!order.orderItems) {
    throw new Error("The orderItems property is required.");
  }

  if (!order.userId) {
    throw new Error("The user id property is required.");
  }
}
