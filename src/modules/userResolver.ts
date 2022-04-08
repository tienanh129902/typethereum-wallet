import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx
} from "type-graphql";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";
import { isAuthen } from "../middlewares/isAuthen";
import { MyContext } from "./typeDef/MyContext";
import { UserTypeDefs } from "./typeDef/userType";
import { LoginResponse } from "./typeDef/loginRespones";

@Resolver()
export class UserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Query(() => String)
  @UseMiddleware(isAuthen)
  async getCurrentID(@Ctx() { payload }: MyContext) {
    return `Your user id : ${payload!.userId}`;
  }

  @Mutation(() => Boolean)
  async Register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("phoneNumber") phoneNumber: string
  ) {
    const hashedPassword = await hash(password, 8);
    const isExist = await this.userByEmail(email);
    if (isExist) {
      throw new Error("Email is already existed!");
    } else {
      // let user = null;
      try {
        await User.create({
          name: name,
          email: email,
          password: hashedPassword,
          phoneNumber: phoneNumber
        });
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    }
  }

  @Query(() => UserTypeDefs)
  @UseMiddleware(isAuthen)
  async userById(@Arg("userId") _userId: string) {
    const data = await User.findOne({ _id: _userId });
    return data;
  }

  @Query(() => UserTypeDefs)
  @UseMiddleware(isAuthen)
  async userByEmail(@Arg("email") _email: string) {
    const data = await User.findOne({ email: _email });
    return data;
  }

  @Mutation(() => LoginResponse)
  async Login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await this.userByEmail(email);
    if (!user) {
      throw new Error("Could not find user");
    }
    const verify = await compare(password, user.password);
    if (!verify) {
      throw new Error("Bad password");
    }

    return {
      accessToken: sign({ userId: user._id }, "MySecretKey", {
        expiresIn: "30m"
      })
    };
  }
}
