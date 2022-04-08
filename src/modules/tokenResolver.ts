import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
// import { Token } from "../entity/Token";
import { isAuthen } from "../middlewares/isAuthen";
// import { TokenTypeDefs } from "../../";
import {run_shell_command} from "../utils/runShell";

@Resolver()
export class TokenResolver {
  @Query(() => String)
  async tokenHello() {
    return "Hello Token";
  }

  @Mutation(() => String)
  @UseMiddleware(isAuthen)
  async tokenDeploy(@Arg("Scripts")arg1: string,
                    @Arg("Network")arg2: string) {
    run_shell_command(`npx hardhat run ${arg1} --network ${arg2}`); //npx hardhat run scripts/deploy.ts --network localhost
    return "Depoyed done";
  }
}
