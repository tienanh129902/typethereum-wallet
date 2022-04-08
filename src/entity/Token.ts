import mongoose from "mongoose";
// import {ObjectType} from "type-graphql";

const tokenSchema = new mongoose.Schema({
  address:{
    type: String,
    require: true,
    unique: true
  },
  name: {
    type: String,
    require: true
  },
  symbol: {
    type: String,
    require: true
  },
  accountID: {
    type: String,
    require: true
  }
})
const Token = mongoose.model('Tokens',tokenSchema);

export {Token};