import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://ahdiaya0_db_user:uMmzGKsE3qybCdcD@cluster0.vokil0g.mongodb.net/InvoiceAI')
    .then(() => { console.log('DB CONNECTED')})
}