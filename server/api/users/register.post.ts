import prisma from "~/lib/prisma";
import * as bcrypt from "bcryptjs";
import { generateToken } from "#imports";

export default defineEventHandler(async (event) => {
  const { email, password, lastname, firstname, username, role } =
    await readBody(event);
  console.log(email);

  const userExist = await prisma.user.findUnique({ where: { email } });

  if (userExist) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      firstName: firstname,
      lastName: lastname,
      username,
      password: hashedPassword,
      role: role || "USER",
    },
  });

  if (user) {
    generateToken(event, user.id);
    setResponseStatus(event, 201);
    return {
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      role: user.role,
    };
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid user data",
    });
  }
});
