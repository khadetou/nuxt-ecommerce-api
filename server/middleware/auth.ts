// import { H3Event, createError } from "h3";
// import jwt from "jsonwebtoken";
// import prisma from "~/lib/prisma";

// export default defineEventHandler(async (event: H3Event) => {
//   const token = getCookie(event, "jwt");
//   if (!token) {
//     throw createError({
//       statusCode: 401,
//       statusMessage: "Not authorized, no token",
//     });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       userId: number;
//     };

//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//       select: {
//         id: true,
//         email: true,
//         username: true,
//         firstName: true,
//         lastName: true,
//         role: true,
//       },
//     });

//     if (!user) {
//       throw createError({
//         statusCode: 401,
//         statusMessage: "User not found",
//       });
//     }

//     // Attach the user to the event context
//     event.context.auth = user;
//   } catch (error) {
//     console.error(error);
//     throw createError({
//       statusCode: 401,
//       statusMessage: "Not authorized, invalid token",
//     });
//   }
// });
