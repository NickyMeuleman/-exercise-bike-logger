import { z } from "zod";

export const editRitValidator = z.object({
  startTijd: z.date().nullish(),
  duur: z.number().int().positive().nullish(),
  afstand: z.number().positive().nullish(),
  calorie: z.number().int().positive().nullish(),
  weerstand: z.number().int().positive().nullish(),
});

export type EditRitInputType = z.infer<typeof editRitValidator>;
