export function Footer() {
  return (
    <footer className="sticky top-0 z-40 w-full flex-none bg-slate-100 backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10">
      <div className="container mx-auto lg:px-20">
        <div className="border-0 border-t border-slate-900/10 p-4 lg:px-0">
          <small>
            Gemaakt door{" "}
            <a
              href="https://twitter.com/NMeuleman"
              target={"_blank"}
              className="underline decoration-sky-600 hover:text-sky-800"
              rel="noreferrer"
            >
              Nicky Meuleman
            </a>
          </small>
        </div>
      </div>
    </footer>
  );
}
