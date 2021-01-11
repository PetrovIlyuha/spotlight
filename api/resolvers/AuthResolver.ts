import { Arg, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from '../entities/User';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, password }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email had been taken.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.SESSION_SECRET || '');
    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new Error(
        'Your Email gave no User registered back from our database.',
      );
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const payload = {
      id: existingUser.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || '');
    return { user: existingUser, token };
  }
}
