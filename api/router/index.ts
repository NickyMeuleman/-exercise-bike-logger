import { z } from "zod";
import { t } from "../context";
import { exampleRouter } from "./example";
import { ritRouter } from "./rit";

export const appRouter = t.router({
  example: exampleRouter,
  rit: ritRouter,
  greeting: t.procedure
    .input(z.object({ name: z.string() }).nullish())
    .query(({ input }) => {
      return `hello tRPC v10, ${input?.name ?? "world"}!`;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
