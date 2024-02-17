import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { _id, name, imageUrl, ...otherUserInfo } = data;

  let filter = {};

  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }

  await User.updateOne(filter, { name, imageUrl });
  await User.findOneAndUpdate(filter, otherUserInfo, { upsert: true });

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return Response.json({});
  }
  return Response.json(await User.findOne({ email }));
}
