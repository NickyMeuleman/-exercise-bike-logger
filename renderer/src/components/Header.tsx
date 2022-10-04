import { PlusIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export function Header({ dark }: { dark?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 w-full flex-none border-b-2 ${
        dark
          ? "border-slate-100/10 bg-transparent"
          : "border-slate-900/10 bg-slate-100/75"
      }  backdrop-blur-sm transition-colors duration-500`}
    >
      <div className="container mx-auto lg:px-20">
        <div className="mx-4 py-4 lg:mx-0">
          <div className="relative flex items-center">
            <Link
              to={"/"}
              className={`mr-3 flex-none overflow-hidden text-xl ${
                dark ? "text-slate-100" : "text-slate-800"
              } underline decoration-sky-600 hover:text-sky-900`}
            >
              Overzicht
            </Link>
            <nav className="relative ml-auto items-center text-sm font-semibold leading-6 text-slate-700">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    to={"/add"}
                    className={`flex items-center justify-center gap-1 rounded-full border-2 ${
                      dark
                        ? "border-transparent bg-green-700 text-slate-100 hover:bg-green-600"
                        : "border-green-700 bg-transparent text-green-700 hover:bg-green-700"
                    }  py-2 px-3 text-base leading-normal outline-none hover:text-green-100 focus:ring-1 focus:ring-green-700 focus:ring-offset-2 active:ring-0 active:ring-offset-0`}
                  >
                    <span className="font-semibold">Nieuwe rit</span>
                    <PlusIcon className="h-full w-4" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
