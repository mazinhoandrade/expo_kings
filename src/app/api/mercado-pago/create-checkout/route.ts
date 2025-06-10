import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import mpClient from "@/lib/mercado-pago";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ status: 401 });
  }

  const { testeId, userEmail } = await req.json();

  try {
    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: testeId, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          testeId, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
          userEmail: userEmail,
          // plan: '123'
          //etc
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
          },
        }),

        items: [
          {
            id: "mensalidade-123",
            description: "Expoking",
            title: "Mensalidade do Expoking",
            quantity: 1,
            unit_price: parseFloat(
              process.env.PRICE_PLAN_MERCADO_PAGO as string,
            ), // process.env.PRICE_PLAN_MERCADO_PAGO,
            currency_id: "BRL",
            category_id: "category", // Recomendado inserir, mesmo que não tenha categoria - Aumenta a pontuação da sua integração com o Mercado Pago
          },
        ],
        payment_methods: {
          excluded_payment_types: [
            {
              id: "ticket",
            },
            {
              id: "credit_card", // Cartão de crédito
            },
            {
              id: "debit_card",
            },
            //   {
            //     id: "bolbradesco", // Cartão de crédito da Bradesco
            //   },
            //   {
            //     id: "pec",
            //   },
            // ],
            // excluded_payment_types: [
            //   {
            //     id: "debit_card", // Cartão de crédito
            //   },
            //   {
            //     id: "credit_card",
            //   },
          ],
          installments: 4, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/?status=sucesso`,
          failure: `${req.headers.get("origin")}/?status=falha`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
        },
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
