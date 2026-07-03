import Header from "./components/Header";
import Footer from "./components/Footer";
import BandList from "./components/BandList";
import BandForm from "./components/BandForm";
import { useState } from "react";
import type { Band } from "./types/Band";

function App() {
  const [bandas, setBandas] = useState<Band[]>([
    {
      id: 0,
      nombre: "Death",
      genero: "Death Metal",
      enlace: "https://death.bandcamp.com",
    },
    {
      id: 1,
      nombre: "Bathory",
      genero: "Black Metal",
      enlace: "https://bathory.bandcamp.com",
    },
    {
      id: 2,
      nombre: "Discharge",
      genero: "Crust Punk",
      enlace: "https://discharge.bandcamp.com",
    },
  ]);

  function addBanda(nuevaBanda: Band) {
    setBandas([...bandas, nuevaBanda]);
  }

  function deleteBanda(id: number) {
    setBandas(bandas.filter((banda) => banda.id !== id));
  }

  return (
    <>
      <Header />
      <BandList bandas={bandas} onDeleteBand={deleteBanda} />
      <BandForm onAddBand={addBanda} />
      <Footer />
    </>
  );
}

export default App;
