import { t } from "../context";
import { z } from "zod";

export const ritRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.rit.findMany();
  }),
  get: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.rit.findUnique({ where: { id: input.id } });
    }),
  create: t.procedure
    .input(
      z.object({
        date: z.date(),
        duration: z.number().int(),
        distance: z.number().int(),
        calories: z.number().int(),
        resistance: z.number().int(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.rit.create({ data: input });
    }),
  updateCompletely: t.procedure
    .input(
      z.object({
        id: z.string().cuid(),
        date: z.date(),
        duration: z.number().int(),
        distance: z.number().int(),
        calories: z.number().int(),
        resistance: z.number().int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      await ctx.prisma.rit.update({
        where: {
          id,
        },
        data: rest,
      });
    }),
  delete: t.procedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.rit.delete({ where: { id: input.id } });
    }),
});
