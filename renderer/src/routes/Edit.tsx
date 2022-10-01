import bikeImg from "../assets/bike-roller.jpg";
import { trpc } from "../utils/trpc";
import { RitForm } from "../components/RitForm";
import { useNavigate, useParams } from "react-router-dom";

const EditPageContent: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  const { data } = trpc.rit.get.useQuery({ id });
  const { mutate: updateMutate } = trpc.rit.updateCompletely.useMutation({
    onSuccess: () => {
      navigate("/");
    },
  });
  const { mutate: deleteMutate } = trpc.rit.delete.useMutation({
    onSuccess: () => {
      navigate("/");
    },
  });

  if (!data) return <div>no data</div>;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center bg-slate-200 p-4">
      <div className="flex w-full lg:w-11/12 xl:w-3/4">
        <img
          src={bikeImg}
          alt="fiets"
          className="hidden h-auto w-full rounded-l-lg object-cover lg:block lg:w-1/2"
        />
        <div className="w-full rounded-lg bg-white p-5 lg:w-1/2 lg:rounded-l-none">
          <h1 className="text-center text-4xl text-gray-800">Rit aanpassen</h1>
          <RitForm data={data} onSubmit={updateMutate} />
          <hr className="mx-auto mb-6 w-4/5 border-t" />
          <button
            className="mx-auto block rounded-full px-4 py-2 text-sm text-red-500 outline-offset-4 outline-red-700 hover:bg-red-700 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => {
              deleteMutate({ id });
            }}
          >
            Rit verwijderen
          </button>
        </div>
      </div>
    </div>
  );
};

const EditPage = () => {
  const params = useParams();
  const { id } = params;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }

  return (
    <>
      <EditPageContent id={id} />;
    </>
  );
};

export default EditPage;
// import Head from "next/head";
// import bikeImg from "../../bike-roller.jpg";
// import { trpc } from "../../utils/trpc";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import {
//   CreateRitInputType,
//   createRitValidator,
// } from "../../shared/create-rit-validator";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller } from "react-hook-form";

// // https://webreflection.medium.com/using-the-input-datetime-local-9503e7efdce

// function toDateTimeString(date: Date): string {
//   const isoString = date.toISOString();
//   // the datetime-local can't handle the Z at the end, remove it
//   // also remove :ss.SSSS
//   return isoString.substring(0, isoString.length - 8);
// }

// const EditPageContent: React.FC<{ id: string }> = ({ id }) => {
//   const router = useRouter();
//   const { data } = trpc.useQuery(["rit.getById", { id }]);
//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<CreateRitInputType>({
//     resolver: zodResolver(createRitValidator),
//   });
//   const { mutate: updateMutate } = trpc.useMutation(["rit.updateCompletely"], {
//     onSuccess: () => {
//       router.push("/");
//     },
//   });
//   const { mutate: deleteMutate } = trpc.useMutation(["rit.delete"], {
//     onSuccess: () => {
//       router.push("/");
//     },
//   });

//   if (!data) return <div>no data</div>;

//   return (
//     <div className="container mx-auto flex flex-col items-center justify-center p-4 bg-slate-200">
//       <div className="w-full xl:w-3/4 lg:w-11/12 flex">
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img
//           src={bikeImg.src}
//           alt="fiets"
//           className="w-full h-auto hidden lg:block lg:w-1/2 rounded-l-lg object-cover"
//         />
//         <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
//           <h1 className="text-4xl text-center text-gray-800">Rit aanpassen</h1>
//           <form
//             className="px-8 pt-6 pb-8 bg-white rounded flex flex-col gap-6"
//             onSubmit={handleSubmit((formData) => {
//               // wait for mutation to complete, while in this function 'isSumitting' is true on 'formState'
//               updateMutate({
//                 id: data.id,
//                 date: formData.startTijd ?? data.date,
//                 duration: formData.duur ?? data.duration,
//                 distance: formData.afstand ?? data.distance,
//                 calories: formData.calorie ?? data.calories,
//                 resistance: formData.weerstand ?? data.resistance,
//               });
//             })}
//           >
//             <fieldset
//               className="grid gap-4 disabled:opacity-60"
//               disabled={isSubmitting}
//             >
//               <Controller
//                 name="startTijd"
//                 control={control}
//                 render={({ field, fieldState }) => {
//                   return (
//                     <label className="block">
//                       <span className="text-gray-700">Starttijd</span>
//                       <input
//                         type="datetime-local"
//                         className="
//                         mt-1
//                         block
//                         w-full
//                         rounded-md
//                         border-gray-300
//                         shadow-sm
//                         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                       "
//                         {...field}
//                         value={
//                           field.value
//                             ? toDateTimeString(field.value)
//                             : toDateTimeString(data.date)
//                         }
//                         onChange={(e) => {
//                           // make sure to create a date using valueAsNumber and NOT value
//                           // or JS will try to help and do weird timezone summertime shenanigans
//                           field.onChange(new Date(e.target.valueAsNumber));
//                         }}
//                         required
//                       />
//                       {fieldState.error && (
//                         <p className="font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
//                           {fieldState.error.message}
//                         </p>
//                       )}
//                     </label>
//                   );
//                 }}
//               />
//               <Controller
//                 name="duur"
//                 control={control}
//                 render={({ field, fieldState }) => {
//                   return (
//                     <label className="block">
//                       <span className="text-gray-700">Duur</span>
//                       <span className="text-gray-700/75 text-sm ml-2">
//                         (min)
//                       </span>
//                       <input
//                         type="number"
//                         className="
//        mt-1
//        block
//        w-full
//        rounded-md
//        border-gray-300
//        shadow-sm
//        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//      "
//                         step={1}
//                         min={0}
//                         required
//                         {...field}
//                         value={field.value ?? data.duration}
//                         onChange={(e) => {
//                           field.onChange(parseInt(e.target.value));
//                         }}
//                       />
//                       {fieldState.error && (
//                         <p className="font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
//                           {fieldState.error.message}
//                         </p>
//                       )}
//                     </label>
//                   );
//                 }}
//               />
//               <Controller
//                 name="afstand"
//                 control={control}
//                 render={({ field, fieldState }) => {
//                   return (
//                     <label className="block">
//                       <span className="text-gray-700">Afstand</span>
//                       <span className="text-gray-700/75 text-sm ml-2">
//                         (km)
//                       </span>
//                       <input
//                         type="number"
//                         className="
//                       mt-1
//                         block
//                         w-full
//                         rounded-md
//                         border-gray-300
//                         shadow-sm
//                         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                         "
//                         step={0.1}
//                         min={0}
//                         required
//                         {...field}
//                         value={
//                           field.value
//                             ? field.value / 1000
//                             : data.distance / 1000
//                         }
//                         onChange={(e) => {
//                           const km = parseFloat(e.target.value);
//                           const m = Math.floor(km * 1000);
//                           field.onChange(m);
//                         }}
//                       />
//                       {fieldState.error && (
//                         <p className="font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
//                           {fieldState.error.message}
//                         </p>
//                       )}
//                     </label>
//                   );
//                 }}
//               />
//               <Controller
//                 name="calorie"
//                 control={control}
//                 render={({ field, fieldState }) => {
//                   return (
//                     <label className="block">
//                       <span className="text-gray-700">Calorieën</span>
//                       <span className="text-gray-700/75 text-sm ml-2">
//                         (kcal)
//                       </span>
//                       <input
//                         type="number"
//                         className="
//                       mt-1
//                       block
//                         w-full
//                         rounded-md
//                         border-gray-300
//                         shadow-sm
//                         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                         "
//                         {...field}
//                         step={1}
//                         min={0}
//                         required
//                         value={field.value ?? data.calories}
//                         onChange={(e) => {
//                           field.onChange(parseInt(e.target.value));
//                         }}
//                       />
//                       {fieldState.error && (
//                         <p className="font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
//                           {fieldState.error.message}
//                         </p>
//                       )}
//                     </label>
//                   );
//                 }}
//               />
//               <Controller
//                 name="weerstand"
//                 control={control}
//                 render={({ field, fieldState }) => {
//                   return (
//                     <label className="block">
//                       <span className="text-gray-700">Weerstand</span>
//                       <input
//                         type="number"
//                         className="
//                           mt-1
//                           block
//                           w-full
//                           rounded-md
//                           border-gray-300
//                           shadow-sm
//                           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                           "
//                         {...field}
//                         step={1}
//                         min={0}
//                         required
//                         value={field.value ?? data.resistance}
//                         onChange={(e) => {
//                           field.onChange(parseInt(e.target.value));
//                         }}
//                       />
//                       {fieldState.error && (
//                         <p className="font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
//                           {fieldState.error.message}
//                         </p>
//                       )}
//                     </label>
//                   );
//                 }}
//               />
//             </fieldset>
//             <input
//               className="self-end text-center w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-500 focus:bg-green-500 outline-green-700 outline-offset-4 disabled:opacity-60 disabled:cursor-not-allowed"
//               type="submit"
//               value="Aanpassen"
//               disabled={isSubmitting}
//             />
//           </form>
//           <hr className="mx-auto w-4/5 mb-6 border-t" />
//           <button
//             className="mx-auto block px-4 py-2 rounded-full outline-red-700 outline-offset-4 disabled:opacity-60 disabled:cursor-not-allowed text-sm text-red-500 hover:text-red-200 hover:bg-red-700"
//             disabled={isSubmitting}
//             onClick={() => {
//               deleteMutate({ id });
//             }}
//           >
//             Rit verwijderen
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditPage = () => {
//   const { query } = useRouter();
//   const { id } = query;

//   if (!id || typeof id !== "string") {
//     return <div>No ID</div>;
//   }

//   return (
//     <>
//       <Head>
//         <title>Rit aanpassen</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <EditPageContent id={id} />;
//     </>
//   );
// };

// export default EditPage;
