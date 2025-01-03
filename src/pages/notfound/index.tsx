import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <h1 className="font-bold text-6xl mb-2">404</h1>
      <h2 className="font-bold text-4xl mb-4">Pagina não encontrada</h2>
      <p className="italic text-1x1 mb-4">
        Você caiu em uma pagina que não existe
      </p>

      <Link
        className="bg-gray-50/20 py-1 px-4 rounded-md transition-transform hover:scale-105 cursor-pointer"
        to="/"
      >
        Volta para home
      </Link>
    </div>
  );
}
