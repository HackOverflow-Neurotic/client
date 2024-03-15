
import { createTRPCRouter } from "~/server/api/trpc";
import { QnaRouter } from "./routers/qna";
import { ImageRouter } from "./routers/image";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  qnaRouter: QnaRouter,
  imageRouter: ImageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
