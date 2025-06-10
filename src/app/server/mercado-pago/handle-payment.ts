import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import { db } from "@/app/_lib/prisma";
const TIME_EXPIRATION = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 dias
export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const userEmail = metadata.user_email; // Os metadados do Mercado Pago são convertidos para snake_case
  const testeId = metadata.teste_id; // Os metadados do Mercado Pago são convertidos para snake_case
  if (userEmail && testeId) {
    await db.user.update({
      where: { id: testeId },
      data: {
        monthlypayment: true,
        subscriptionExpiresAt: TIME_EXPIRATION, // 30 dias
      },
    });
  }

  return;
}
