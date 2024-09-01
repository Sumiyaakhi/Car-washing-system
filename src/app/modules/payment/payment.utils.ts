import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
export const initiatePayment = async (bookingDetails: any) => {
  try {
    const response = await axios.post(process.env.PAYMENT_URL!, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      tran_id: bookingDetails.tran_id,
      success_url: "http://www.merchantdomain.com/successpage.html",
      fail_url: "http://www.merchantdomain.com/failedpage.html",
      cancel_url: "http://www.merchantdomain.com/cancelpage.html",
      amount: bookingDetails.amount,
      currency: "BDT",
      desc: "Service Booking Payment",
      cus_name: bookingDetails.customer.name,
      cus_email: bookingDetails.customer.email,
      cus_add1: bookingDetails.customer.address,
      cus_city: bookingDetails.customer.city || "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: bookingDetails.customer.phone,
      type: "json",
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Payment initiation failed:", error);
    throw new Error("Payment initiation failed");
  }
};
