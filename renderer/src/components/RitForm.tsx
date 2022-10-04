import { useForm, Controller } from "react-hook-form";
import {
  CreateRitInputType,
  createRitValidator,
} from "../shared/create-rit-validator";
import {
  EditRitInputType,
  editRitValidator,
} from "../shared/edit-rit-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Rit } from "@prisma/client";
import { InferProcedures } from "../utils/trpc";

// https://webreflection.medium.com/using-the-input-datetime-local-9503e7efdce

function toDateTimeString(date: Date): string {
  const isoString = date.toISOString();
  // the datetime-local can't handle the Z at the end, remove it
  // also remove :ss.SSSS
  return isoString.substring(0, isoString.length - 8);
}

// TODO: automatically infer correct type based on props (see comment below start of component)
export type createMutationInput = InferProcedures["rit"]["create"]["input"];
export type updateMutationInput =
  InferProcedures["rit"]["updateCompletely"]["input"];
type MutationFn = (args: createMutationInput | updateMutationInput) => void;
export const RitForm: React.FC<{
  data?: Rit;
  mutationFn: MutationFn;
}> = ({ data, mutationFn }) => {
  // I don't like that the data prop magically decides which type of form this generates
  // maybe make it explicit with a prop called "kind" that's an enum?
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditRitInputType | CreateRitInputType>({
    resolver: data
      ? zodResolver(editRitValidator)
      : zodResolver(createRitValidator),
  });

  return (
    <form
      className="flex flex-col gap-6 rounded bg-white px-8 pt-6 pb-8"
      onSubmit={() => {
        return handleSubmit((formData) => {
          // wait for mutation to complete, while in this function 'isSumitting' is true on 'formState'
          if (data) {
            mutationFn({
              id: data.id,
              date: formData.startTijd ?? data.date,
              duration: formData.duur ?? data.duration,
              distance: formData.afstand ?? data.distance,
              calories: formData.calorie ?? data.calories,
              resistance: formData.weerstand ?? data.resistance,
            });
          } else {
            if (
              formData.startTijd &&
              formData.duur &&
              formData.afstand &&
              formData.calorie &&
              formData.weerstand
            ) {
              mutationFn({
                date: formData.startTijd,
                duration: formData.duur,
                distance: formData.afstand,
                calories: formData.calorie,
                resistance: formData.weerstand,
              });
            }
          }
        });
      }}
    >
      <fieldset
        className="grid gap-4 disabled:opacity-60"
        disabled={isSubmitting}
      >
        <Controller
          name="startTijd"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <label className="block">
                <span className="text-gray-700">Starttijd</span>
                <input
                  type="datetime-local"
                  className="
                        mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      "
                  {...field}
                  value={
                    field.value
                      ? toDateTimeString(field.value)
                      : data
                      ? toDateTimeString(data.date)
                      : ""
                  }
                  onChange={(e) => {
                    // make sure to create a date using valueAsNumber and NOT value
                    // or JS will try to help and do weird timezone summertime shenanigans
                    field.onChange(new Date(e.target.valueAsNumber));
                  }}
                />
                {fieldState.error && (
                  <p className="mt-1 ml-1 text-sm font-medium tracking-wide text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Controller
          name="duur"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <label className="block">
                <span className="text-gray-700">Duur</span>
                <span className="ml-2 text-sm text-gray-700/75">(min)</span>
                <input
                  type="number"
                  className="
       mt-1
       block
       w-full
       rounded-md
       border-gray-300
       shadow-sm
       focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
     "
                  step={1}
                  {...field}
                  value={field.value ?? data?.duration ?? ""}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value);
                    field.onChange(isNaN(parsed) ? "" : parsed);
                  }}
                />
                {fieldState.error && (
                  <p className="mt-1 ml-1 text-sm font-medium tracking-wide text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Controller
          name="afstand"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <label className="block">
                <span className="text-gray-700">Afstand</span>
                <span className="ml-2 text-sm text-gray-700/75">(km)</span>
                <input
                  type="number"
                  className="
                      mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                        "
                  step={0.1}
                  {...field}
                  value={
                    fieldState.isDirty
                      ? typeof field.value === "number"
                        ? field.value / 1000
                        : ""
                      : data
                      ? data.distance / 1000
                      : ""
                  }
                  onChange={(e) => {
                    const km = parseFloat(e.target.value);
                    field.onChange(isNaN(km) ? "" : Math.floor(km * 1000));
                  }}
                />
                {fieldState.error && (
                  <p className="mt-1 ml-1 text-sm font-medium tracking-wide text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Controller
          name="calorie"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <label className="block">
                <span className="text-gray-700">Calorieën</span>
                <span className="ml-2 text-sm text-gray-700/75">(kcal)</span>
                <input
                  type="number"
                  className="
                      mt-1
                      block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                        "
                  {...field}
                  step={1}
                  value={field.value ?? data?.calories ?? ""}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value);
                    field.onChange(isNaN(parsed) ? "" : parsed);
                  }}
                />
                {fieldState.error && (
                  <p className="mt-1 ml-1 text-sm font-medium tracking-wide text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Controller
          name="weerstand"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <label className="block">
                <span className="text-gray-700">Weerstand</span>
                <input
                  type="number"
                  className="
                          mt-1
                          block
                          w-full
                          rounded-md
                          border-gray-300
                          shadow-sm
                          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                          "
                  {...field}
                  step={1}
                  value={field.value ?? data?.resistance ?? ""}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value);
                    field.onChange(isNaN(parsed) ? "" : parsed);
                  }}
                />
                {fieldState.error && (
                  <p className="mt-1 ml-1 text-sm font-medium tracking-wide text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </label>
            );
          }}
        />
      </fieldset>
      <input
        className="w-full self-end rounded-full bg-green-700 px-4 py-2 text-center font-bold text-white outline-offset-4 outline-green-700 hover:bg-green-500 focus:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        value={data ? "Aanpassen" : "Toevoegen"}
        disabled={isSubmitting}
      />
    </form>
  );
};
