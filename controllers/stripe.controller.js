import ApiError from "../error/api.error.js";
import fs from 'fs';
import {connect} from "../database.js";

// import {investor_aicite} from "../constant.js"

import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51NlrybSCW8aDCJjrv7qsmXM1GSQOEc6QFhwlhxzY98zQJKrLMKFgNdXdXF1TX9q38tc0kY6DkpLCfFG9QgDjXcbW00KOuhhN18')
const endpointSecret = "whsec_ed69cde107d165cd6a42ff0fdb788b9c4f6ebf0fb5f0b2709d231c85ff9e364c";



export const newstripe = async (req,res ,next)=> {

    console.log("working");
    res.send("working")

}


export const webhook =  async(req,res,next)=>{
    const sig = req.headers['stripe-signature'];
    let event;
    try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case 'customer.created':
      const customerCreated = event.data.object;
      fs.writeFileSync('customerCreated.json', JSON.stringify(customerCreated, null, 2));

      console.log(customerCreated)
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      console.log(checkoutSessionCompleted);
      break;
      case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!',paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!',paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}


