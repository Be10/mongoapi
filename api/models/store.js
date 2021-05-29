import mongoose from "mongoose"

const storeSchema = mongoose.Schema({
    firstName: String,
    phone: Number,
    address: String
})

export default mongoose.model("store", storeSchema)