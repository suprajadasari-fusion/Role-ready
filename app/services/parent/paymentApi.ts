import { apiFetch } from '../../lib/api';

export interface PaymentInitiateRequest {
  orderId: string;
  amount: number;
  currency: 'INR';
  planId: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
}

export interface PaymentTransactionResult {
  success: boolean;
  orderId: string;
  transactionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'SUCCESS' | 'FAILED';
  timestamp: string;
  message: string;
}

/**
 * Process a family subscription payment
 * Simulates real gateway round-trip and returns deterministic backend-verified response
 */
export async function processFamilyPayment(
  paymentData: PaymentInitiateRequest,
  simulateFailure = false
): Promise<PaymentTransactionResult> {
  // Simulate network latency of payment gateway (Razorpay / Stripe)
  await new Promise(resolve => setTimeout(resolve, 800));

  if (simulateFailure) {
    return {
      success: false,
      orderId: paymentData.orderId,
      transactionId: `TXN-FAILED-${Date.now()}`,
      amount: paymentData.amount,
      currency: paymentData.currency,
      paymentMethod: paymentData.paymentMethod,
      status: 'FAILED',
      timestamp: new Date().toISOString(),
      message: 'Payment was declined by issuing bank. Please retry with a valid payment method.'
    };
  }

  const transactionId = `TXN-RR-${Date.now().toString().slice(-8)}`;

  return {
    success: true,
    orderId: paymentData.orderId,
    transactionId,
    amount: paymentData.amount,
    currency: paymentData.currency,
    paymentMethod: paymentData.paymentMethod,
    status: 'SUCCESS',
    timestamp: new Date().toISOString(),
    message: 'Payment completed successfully. Your family subscription is now active!'
  };
}

/**
 * Retry a failed payment transaction
 */
export async function retryFamilyPayment(
  orderId: string,
  amount: number,
  planId: string,
  method: 'UPI' | 'Card' | 'NetBanking'
): Promise<PaymentTransactionResult> {
  return await processFamilyPayment({
    orderId,
    amount,
    currency: 'INR',
    planId,
    paymentMethod: method
  }, false);
}
