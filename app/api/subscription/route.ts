import stripeClient from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const public_domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'

    const { email, userId, priceId, fullName } = await req.json()

    const isExisitingCustomer = await stripeClient.customers.list({ email })

    let customer

    if (isExisitingCustomer.data.length) {
      customer = isExisitingCustomer.data[0]
    }

    if (!customer) {
      customer = await stripeClient.customers.create({
        email,
        metadata: {
          userId,
        },
        name: fullName,
      })
    }

    const subscription = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customer.id,
      success_url: `${public_domain}`,
      cancel_url: `${public_domain}`,
    })

    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const customers = await stripeClient.customers.list({ email: email! });

    if (!customers.data.length) return NextResponse.json("Basic");

    const subscriptions = await stripeClient.subscriptions.list({
      customer: customers.data[0].id,
    });

    if (!subscriptions.data.length) return NextResponse.json("Basic");

    return NextResponse.json("Pro");
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}