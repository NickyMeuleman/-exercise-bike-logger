import bikeImg from "../assets/bike-roller.jpg";
import { RitForm } from "../components/RitForm";
import { trpc } from "../utils/trpc";
import { useNavigate } from "react-router-dom";

const AddPageContent: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = trpc.rit.create.useMutation({
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <div className="container mx-auto flex flex-col items-center justify-center bg-slate-200 p-4">
      <div className="flex w-full lg:w-11/12 xl:w-3/4">
        <img
          src={bikeImg}
          alt="fiets"
          className="hidden h-auto w-full rounded-l-lg object-cover lg:block lg:w-1/2"
        />
        <div className="w-full rounded-lg bg-white p-5 lg:w-1/2 lg:rounded-l-none">
          <h1 className="text-center text-4xl text-gray-800">Rit toevoegen</h1>
          <RitForm data={undefined} onSubmit={mutate} />
        </div>
      </div>
    </div>
  );
};

const AddPage = () => {
  return (
    <>
      <AddPageContent />;
    </>
  );
};

export default AddPage;
// import type { NextPage } from "next";
// import Head from "next/head";
// import bikeImg from "../bike-roller.jpg";
// import { trpc } from "../utils/trpc";
// const AddPage: NextPage = () => {
//   const mutation = trpc.useMutation(["rit.create"]);

//   return (
//     <>
//       <Head>
//         <title>Nieuwe rit toevoegen</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <div className="container mx-auto flex flex-col items-center justify-center p-4 bg-slate-200">
//         <div className="w-full xl:w-3/4 lg:w-11/12 flex">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={bikeImg.src}
//             alt="fiets"
//             className="w-full h-auto hidden lg:block lg:w-1/2 rounded-l-lg object-cover"
//           />
//           <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
//             <form
//               className="px-8 pt-6 pb-8 bg-white rounded flex flex-col gap-6"
//               onSubmit={(event) => {
//                 event.preventDefault();
//                 const data = new FormData(event.target as any);
//                 const date = data.get("starttijd");
//                 const duration = data.get("duur");
//                 const distance = data.get("afstand");
//                 const calories = data.get("calorie");
//                 const resistance = data.get("weerstand");

//                 if (
//                   typeof date == "string" &&
//                   typeof duration == "string" &&
//                   typeof distance == "string" &&
//                   typeof calories == "string" &&
//                   typeof resistance == "string"
//                 ) {
//                   mutation.mutate({
//                     date: new Date(date),
//                     duration: parseInt(duration),
//                     distance: parseInt(distance),
//                     calories: parseInt(calories),
//                     resistance: parseInt(resistance),
//                   });
//                 }
//               }}
//             >
//               <h1 className="text-4xl text-center text-gray-800">
//                 Rit toevoegen
//               </h1>
//               <div className="grid gap-4">
//                 <label className="block">
//                   <span className="text-gray-700">Starttijd</span>
//                   <input
//                     type="datetime-local"
//                     className="
//                     mt-1
//                     block
//                     w-full
//                     rounded-md
//                     border-gray-300
//                     shadow-sm
//                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                   "
//                     name="starttijd"
//                     required
//                   />
//                 </label>
//                 <label className="block">
//                   <span className="text-gray-700">Duur</span>
//                   <input
//                     type="number"
//                     className="
//                     mt-1
//                     block
//                     w-full
//                     rounded-md
//                     border-gray-300
//                     shadow-sm
//                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                   "
//                     step={1}
//                     min={0}
//                     name="duur"
//                     required
//                   />
//                 </label>
//                 <label className="block">
//                   <span className="text-gray-700">Afstand</span>
//                   <input
//                     type="number"
//                     className="
//                   mt-1
//                     block
//                     w-full
//                     rounded-md
//                     border-gray-300
//                     shadow-sm
//                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                     "
//                     step={0.1}
//                     min={0}
//                     name="afstand"
//                     required
//                   />
//                 </label>
//                 <label className="block">
//                   <span className="text-gray-700">Calorieën</span>
//                   <input
//                     type="number"
//                     className="
//                   mt-1
//                     block
//                     w-full
//                     rounded-md
//                     border-gray-300
//                     shadow-sm
//                     focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                     "
//                     step={1}
//                     min={0}
//                     name="calorie"
//                     required
//                   />
//                 </label>
//                 <label className="block">
//                   <span className="text-gray-700">Weerstand</span>
//                   <input
//                     type="number"
//                     className="
//                   mt-1
//                   block
//                   w-full
//                   rounded-md
//                   border-gray-300
//                   shadow-sm
//                   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
//                   "
//                     step={1}
//                     min={0}
//                     name="weerstand"
//                     required
//                   />
//                 </label>
//               </div>
//               <button
//                 className="self-end text-center w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-500 focus:bg-green-500 outline-green-700 outline-offset-4"
//                 type="submit"
//               >
//                 Toevoegen
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddPage;
