

import { eq, and } from "drizzle-orm";
import { emailCreds, emailOtp, generatePassword } from "../../common/utils/utils.js";
import db from "../../common/db/db.js";
import { usersTable } from "../../common/db/schema.js";
import bcrypt from "bcrypt";
import ApiError from "../../common/utils/api-error.js";

type RegisterUser = {
  name: string;
  email: string;
  mobile: string;
};

type LoginUser = {
  email: string;
  password: string;
};

const register = async (userData: RegisterUser) => {
  const password = generatePassword();
  const hashPassword = await bcrypt.hash(password, 10); 

  const [user] = await db
    .insert(usersTable)
    .values({
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      password: hashPassword,
    })
    .returning();

    if(!user){
      throw new ApiError(500, "User not created");
    }

    const email = await emailCreds({ email: userData.email, password });

  const {password : _, otp: __, otpCreatedAt: ___, ...rest} = user

  return rest;
};

const login = async ({ email, password }: LoginUser) => {
    const [existing] = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (!existing) {
        throw ApiError.notFound("User not found")
    }

    const isMatch = await bcrypt.compare(password, existing?.password as string)

    if (!isMatch) {
        throw ApiError.unauthorized("Invalid password")
    }

    return { id: existing?.id, name: existing?.name, email: existing?.email }
}

const sendOtp = async (email: string) => {
  const [existing] = await db.select().from(usersTable).where(eq(usersTable.email, email))

  if (!existing) {
    throw ApiError.notFound("User not found")
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const updated = await db
    .update(usersTable)
    .set({
      otp,
      otpCreatedAt: new Date(),
    })
    .where(eq(usersTable.email, email));
    
  if(!updated){
    throw new ApiError(500, "OTP not updated");
  }

  const emailSent = await emailOtp({ email, otp });

  return { email, otp };
}

const verifyOtp = async (
  {email, otp}: {email: string, otp: string}
) => {
  const [existing] = await db.select().from(usersTable).where(eq(usersTable.email, email))

  if (!existing) {
    throw ApiError.notFound("User not found")
  }

  const isOtpValid = existing.otp === otp && existing.otpCreatedAt && new Date(existing.otpCreatedAt).getTime() + 5 * 60 * 1000 > Date.now();

  if (!isOtpValid) {
    throw ApiError.badRequest("Invalid OTP");
  }

  await db
    .update(usersTable)
    .set({
      otp: null,
      otpCreatedAt: null,
    })
    .where(eq(usersTable.email, email));

    const {password : _, otp: __, otpCreatedAt: ___, ...rest} = existing
  return rest;
};


export default {
  register,
  login,
  sendOtp,
  verifyOtp,
};