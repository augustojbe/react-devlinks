import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/input";
import { db } from "../../service/firebaseConnections";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function NetWorks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loading() {
      const dorRef = doc(db, "social", "link");
      getDoc(dorRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    }
    loading();
  }, []);

  function hadleRegister(e: FormEvent) {
    e.preventDefault();
    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao salvas" + error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas Redes Sociais
      </h1>

      <form className="flex flex-col  max-w-xl w-full" onSubmit={hadleRegister}>
        <label className="text-white font-medium mt-2 mb-2">
          Links do facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a url do facebook..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Links do Intagram
        </label>
        <Input
          type="url"
          placeholder="Digite a url do Instagram..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Links do Youtube
        </label>
        <Input
          type="url"
          placeholder="Digite a url do Youtube..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex font-medium select-none transition-transform hover:scale-105 cursor-pointer mb-7 ">
          Salva links
        </button>
      </form>
    </div>
  );
}
