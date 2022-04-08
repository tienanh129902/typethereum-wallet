import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { isAuthen } from "../middlewares/isAuthen";
import {run_shell_command} from "../utils/runShell";

@Resolver()
export class TransferResolver {
  @Query(() => String)
  async transferHello() {
    return "Hello transfer";
  }

  @Mutation(() => String)
  @UseMiddleware(isAuthen)
  async tokenTransfer(@Arg("ReceiverID")_receiverID: string,
                      @Arg("Amount") _amount: number,) {
    run_shell_command(`npx hardhat faucet ${_receiverID} ${_amount}`);
    return "Transfer done";
  }
}
