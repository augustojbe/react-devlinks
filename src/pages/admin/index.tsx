import Header from "../../components/Header";
import Input from "../../components/input";
import { FormEvent, useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";

import { db } from "../../service/firebaseConnections";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinsProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInpu, setUrlInput] = useState("");
  const [textColorInput, setTextColoInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgrounbColorInput] = useState("#121212");

  const [links, setLinks] = useState<LinsProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinsProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegistre(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInpu === "") {

      alert("Prencha todo os campos");
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInpu,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
  }

  async function handleDeletLink(id: string) {
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)

  }

  return (
    <div className="flex items-center flex-col max-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-3 mb-3 w-full max-w-xl"
        onSubmit={handleRegistre}
      >
        <label className=" text-white font-medium mt-2 mb-2">
          Nome do Link
        </label>
        <Input
          placeholder="Digite o nome do Link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className=" text-white font-medium mt-2 mb-2">URL do link</label>
        <Input
          placeholder="Digite a url..."
          type="url"
          value={urlInpu}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className=" text-white font-medium mt-2 mb-2">
              Fundo do link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColoInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className=" text-white font-medium mt-2 mb-2">
              Fundo do link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgrounbColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className=" flex items-center justify-start flex-col mb-7 border-gray-100/25 border rounded-md">
            <label className=" text-white font-medium mt-2 mb-3">
              Veja como esta ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p style={{ color: textColorInput, fontWeight: "bold" }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
      {links.map((item) => (
        <article
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p>{item.name}</p>
          <button
            className="border border-dashed p-1 rounded bg-neutral-900"
            onClick={() => handleDeletLink(item.id)}
          >
            <FiTrash size={18} color="#fff" />
          </button>
        </article>
      ))}
    </div>
  );
}
