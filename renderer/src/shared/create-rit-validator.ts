import { z } from "zod";

export const createRitValidator = z.object({
  startTijd: z.date(),
  duur: z.number().int().positive(),
  afstand: z.number().positive(),
  calorie: z.number().int().positive(),
  weerstand: z.number().int().positive(),
});

export type CreateRitInputType = z.infer<typeof createRitValidator>;
