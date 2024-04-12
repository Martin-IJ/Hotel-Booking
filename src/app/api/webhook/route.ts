import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/libs/apis";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      // Check if metadata is not null before accessing its properties
      if (session.metadata !== null) {
        const {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        } = session.metadata;

        // Now you can use the extracted metadata properties...
        await createBooking({
          adults: Number(adults),
          checkinDate,
          checkoutDate,
          children: Number(children),
          hotelRoom,
          numberOfDays: Number(numberOfDays),
          discount: Number(discount),
          totalPrice: Number(totalPrice),
          user,
        });

        // Update hotel Room
        await updateHotelRoom(hotelRoom);

        return NextResponse.json("Booking successful", {
          status: 200,
          statusText: "Booking Successful",
        });
      } else {
        console.warn("Metadata is null. Unable to process booking.");

        return new NextResponse(
          "Metadata is null. Unable to process booking.",
          { status: 400 }
        );
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
      return new NextResponse(`Unhandled event type ${event.type}`, {
        status: 400,
      });
  }
}
