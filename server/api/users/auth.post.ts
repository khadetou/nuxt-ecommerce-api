import prisma from "~/lib/prisma";
import * as bcrypt from "bcryptjs";
import { generateToken } from "#imports";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(event, user.id);
    return {
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
    };
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }
});
