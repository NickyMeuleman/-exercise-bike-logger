import { useState } from "react";
import { trpc } from "../utils/trpc";

interface Message {
  type: string;
  text: string;
}

const Alert: React.FC<Message> = ({ text, type }) => {
  /* tailwind doesn't know what to include if color is a viarable, classes have to be statically known beforehand */

  return type === "info" ? (
    <div
      className="flex rounded-lg bg-green-100 p-4 text-sm text-green-700"
      role="alert"
    >
      <svg
        className="mr-3 inline h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div>
        <span className="font-medium capitalize">{type}:</span> {text}
      </div>
    </div>
  ) : (
    <div
      className="flex rounded-lg bg-red-100 p-4 text-sm text-red-700"
      role="alert"
    >
      <svg
        className="mr-3 inline h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div>
        <span className="font-medium capitalize">{type}:</span> {text}
      </div>
    </div>
  );
};

export const AdminPage: React.FC = () => {
  const utils = trpc.useContext();
  const { mutate: makeCSV } = trpc.rit.makeCSV.useMutation({
    onSuccess: (data) => {
      if (data?.length) {
        setMessage({
          type: "info",
          text: `${data.length} ritten geexporteerd`,
        });
      }
    },
  });
  const { mutate: loadCSV } = trpc.rit.loadCSV.useMutation({
    onSuccess: async (data) => {
      setMessage({
        type: "info",
        text: `${data.length} ritten geimporteerd`,
      });

      await utils.rit.getAll.invalidate();
    },
  });
  const { mutate: deleteAll } = trpc.rit.deleteAll.useMutation({
    onSuccess: async (data) => {
      setMessage({
        type: "opgelet",
        text: `${data.count} ritten verwijderd`,
      });

      await utils.rit.getAll.invalidate();
    },
  });
  const [message, setMessage] = useState<Message | null>(null);
  return (
    <div className="container mx-auto my-4 flex flex-col justify-center gap-4 bg-slate-200 lg:px-20">
      {message ? <Alert {...message} /> : null}
      <h2 className="border-2 border-b-slate-300 pb-2 text-2xl font-normal">
        Import/Export
      </h2>
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Importeren</h2>
          <p>
            Ritten importeren uit een CSV bestand met of zonder <code>id</code>
          </p>
        </div>
        <button
          className={`rounded-full border-2
                border-sky-700 bg-transparent py-2
             px-4 text-base leading-normal text-sky-700 outline-none hover:bg-sky-700 hover:text-sky-100 focus:ring-1 focus:ring-sky-700 focus:ring-offset-2 active:ring-0 active:ring-offset-0`}
          onClick={() => {
            loadCSV();
          }}
        >
          <span className="font-semibold">Importeren</span>
        </button>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Exporteren</h2>
          <p>
            Ritten exporteren naar een CSV bestand met <code>id</code>
          </p>
        </div>
        <button
          className={`rounded-full border-2
                border-sky-700 bg-transparent py-2
             px-4 text-base leading-normal text-sky-700 outline-none hover:bg-sky-700 hover:text-sky-100 focus:ring-1 focus:ring-sky-700 focus:ring-offset-2 active:ring-0 active:ring-offset-0`}
          onClick={() => {
            makeCSV();
          }}
        >
          <span className="font-semibold">Exporteren</span>
        </button>
      </div>
      <h2 className="border-2 border-b-slate-300 pb-2 text-2xl font-normal">
        HIGHWAY TO THE ... DANGER ZONE
      </h2>
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Verwijderen</h2>
          <p>Alle ritten verwijderen</p>
        </div>
        <button
          className={`rounded-full border-2
          border-red-700 bg-transparent py-2
       px-4 text-base leading-normal text-red-700 outline-none hover:bg-red-700 hover:text-red-100 focus:ring-1 focus:ring-red-700 focus:ring-offset-2 active:ring-0 active:ring-offset-0`}
          onClick={() => {
            deleteAll();
          }}
        >
          <span className="font-semibold">Verwijderen</span>
        </button>
      </div>
    </div>
  );
};
