import { NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.PAYMOB_API_KEY!
const IFRAME_ID = process.env.PAYMOB_IFRAME_ID!
const INTEGRATION_ID_CARD = process.env.PAYMOB_INTEGRATION_ID_CARD!
const INTEGRATION_ID_WALLET = process.env.PAYMOB_INTEGRATION_ID_WALLET!

export async function POST(req: NextRequest) {
  try {
    const { cart, customer, paymentMethod } = await req.json()

    const amount_cents = Math.round(
      cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) * 100
    )

    // Get Auth Token
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: API_KEY }),
    })

    const authData = await authRes.json()
    const auth_token = authData.token

    // Create Order
    const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token,
        delivery_needed: false,
        amount_cents,
        currency: "EGP",
        items: [],
      }),
    })

    const orderData = await orderRes.json()
    const order_id = orderData.id

    // Choose Integration ID based on payment method
    const integration_id =
      paymentMethod === "mobile_wallets"
        ? INTEGRATION_ID_WALLET
        : INTEGRATION_ID_CARD

    // Get Payment Key
    const paymentKeyRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token,
        amount_cents,
        expiration: 3600,
        order_id,
        billing_data: {
          apartment: "NA",
          email: customer.email || "test@example.com",
          floor: "NA",
          first_name: customer.firstName || "Test",
          street: "NA",
          building: "NA",
          phone_number: "+2" + customer.phone || "+201234567890",
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: customer.lastName || "User",
          state: "NA",
        },
        currency: "EGP",
        integration_id,
      }),
    })

    const paymentKeyData = await paymentKeyRes.json()
    const payment_token = paymentKeyData.token

    const payment_url = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${payment_token}`

    return NextResponse.json({ payment_url })
  } catch (error) {
    console.error("Paymob Error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
