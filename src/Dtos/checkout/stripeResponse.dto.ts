export interface StripeResponse {
  sessionId?: string;
}
export function validateStripeResponse(stripeResponse: StripeResponse): void {
  if (!stripeResponse.sessionId) {
    throw new Error("The sessionId property is required.");
  }
}
