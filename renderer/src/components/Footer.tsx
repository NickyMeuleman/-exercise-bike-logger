export function Footer() {
    return (
      <footer className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-slate-100">
        <div className="container mx-auto lg:px-20">
          <div className="p-4 lg:px-0 border-t border-slate-900/10 border-0">
            <small>
              Gemaakt door <a href="https://twitter.com/NMeuleman" className="underline decoration-sky-600 hover:text-sky-800">Nicky Meuleman</a>
            </small>
          </div>
        </div>
      </footer>
    );
  }
  