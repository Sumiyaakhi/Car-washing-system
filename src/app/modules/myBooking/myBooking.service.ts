import config from "../../config";
import { Booking } from "../booking/bookings.model";
import { User } from "../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getMyBookingsFromDB = async (authorizationHeader: string) => {
  // Verify and decode the JWT token
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token is missing or invalid");
  }

  const token = authorizationHeader.split(" ")[1];
  let userEmail;
  try {
    const decodedToken = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    userEmail = decodedToken.email;
  } catch (err) {
    throw new Error("Invalid token");
  }

  // Find the user by email
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error("User not found");
  }

  // Find the bookings for the logged-in user
  const myBookings = await Booking.find({ "customer.email": userEmail }).select(
    {
      service: 1,
      slot: 1,
      vehicleType: 1,
      vehicleBrand: 1,
      vehicleModel: 1,
      manufacturingYear: 1,
      registrationPlate: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  );

  return myBookings;
};
