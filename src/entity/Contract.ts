import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  address: {
    type: String
  },
  transactionID: {
    type: String,
    ref: 'Transactions'
  },
  value: {
    type: Number
  },
  gasUsed:{
    type: Number
  },
  block:{
    type: String
  },
  name: {
    type: String
  }

});
const Contracts = mongoose.model("Contracts", contractSchema);

export { Contracts };