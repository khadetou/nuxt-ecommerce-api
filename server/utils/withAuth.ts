// server/utils/withAuth.ts

import { EventHandler, EventHandlerRequest, H3Event } from "h3";

export function withAuth<T extends EventHandlerRequest>(
  handler: EventHandler<T>
): EventHandler<T> {
  return defineEventHandler(async (event: H3Event) => {
    // Check if user is authenticated
    if (!event.context.auth) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorized",
      });
    }

    // If authenticated, call the original handler
    return handler(event);
  });
}
