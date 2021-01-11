import { MyContext } from './../types/MyContext';
import { ObjectId } from 'mongodb';
import { User, UserModel } from './../entities/User';
import { Resolver, Query, Arg, UseMiddleware, Ctx } from 'type-graphql';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { isAuth } from '../middleware/isAuth';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('userId', () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async currentUser(
    @Ctx()
    ctx: MyContext,
  ): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId);
  }
}
