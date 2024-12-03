import { Link, useNavigate } from "react-router";
import Input from "../../components/input";
import { FormEvent, useState } from "react";
import { auth } from "../../service/firebaseConnections";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Prencha os campos");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logado com sucesso");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log("Error oa fazero Login");
        console.log(error);
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-1"
      >
        <Input
          placeholder="Digite seu email..."
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="*******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white transition-transform hover:scale-105"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
