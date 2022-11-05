import { t } from "../context";
import { z } from "zod";
import { dialog } from "electron";
import fs from "node:fs";

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
  deleteAll: t.procedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.rit.deleteMany();
  }),
  makeCSV: t.procedure.mutation(async ({ ctx }) => {
    const allRitten = await ctx.prisma.rit.findMany();

    const header = Object.keys(allRitten[0]);
    const rows = allRitten.map((rit) => Object.values(rit));
    const csv = [header.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const { filePath } = await dialog.showSaveDialog({
      title: "Choose path to save CSV",
      filters: [{ name: "Comma seperated values", extensions: ["csv"] }],
    });

    if (filePath) {
      fs.writeFileSync(filePath, csv, { encoding: "utf-8" });
      return allRitten;
    }
  }),
  loadCSV: t.procedure
    .input(
      z.object({
        type: z.enum(["datum-uur-gecombineerd", "datum-uur-gesplitst"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "Comma seperated values", extensions: ["csv"] }],
      });

      const csv = fs.readFileSync(filePaths[0], { encoding: "utf-8" });
      const lines = csv.split(/\r?\n/);
      const keys = lines.shift()?.split(",");

      const imported = [];

      for (const line of lines) {
        const obj: Record<string, string> = {};
        const vals = line.split(",");

        for (const i in keys) {
          const idx = parseInt(i); // why JavaScript, why
          const key = keys[idx];
          const val = vals[idx];
          obj[key] = val;
        }

        const ritValidator = z.object({
          date: z.date(),
          duration: z.number().int(),
          distance: z.number().int(),
          calories: z.number().int(),
          resistance: z.number().int(),
        });

        let rit = null;
        if (input.type === "datum-uur-gecombineerd") {
          rit = ritValidator.parse({
            date: new Date(obj.date),
            duration: parseInt(obj.duration),
            distance: parseInt(obj.distance),
            calories: parseInt(obj.calories),
            resistance: parseInt(obj.resistance),
          });
        } else {
          rit = ritValidator.parse({
            date: new Date(`${obj.datum}T${obj.uur}`),
            duration: parseInt(obj.tijd),
            distance: Math.floor(parseFloat(obj.distance) * 1000),
            calories: parseInt(obj.calories),
            resistance: parseInt(obj.weerstand),
          });
        }

        const saved = await ctx.prisma.rit.create({ data: rit });
        imported.push(saved);
      }

      return imported;
    }),
});
