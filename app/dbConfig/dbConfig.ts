import  mongoose  from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const db = mongoose.connection;
    db.once("connected", function () {
      console.log("Connected to the database.");
    });
  } catch (error) {
    console.log("Something went wrong while connecting to the database.");
    console.log(error);
  }
}
