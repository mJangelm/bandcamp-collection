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

  const [editingBand, setEditingBand] = useState<Band | null>(null);

  function addBanda(nuevaBanda: Band) {
    setBandas([...bandas, nuevaBanda]);
  }

  function deleteBanda(id: number) {
    setBandas(bandas.filter((banda) => banda.id !== id));
  }

  function editBanda(id: number) {
    const banda = bandas.find((banda) => banda.id === id);

    if (!banda) {
      return;
    }

    console.log("Banda encontrada:", banda);
    setEditingBand(banda);
  }

  function updateBanda(bandaEditada: Band) {
    setBandas(
      bandas.map((bandaActual) => {
        if (bandaActual.id === bandaEditada.id) {
          return bandaEditada;
        }
        setEditingBand(null);

        return bandaActual;
      }),
    );
  }
  return (
    <>
      <Header />
      <BandList
        bandas={bandas}
        onDeleteBand={deleteBanda}
        onEditBand={editBanda}
      />
      <BandForm
        onUpdateBand={updateBanda}
        onAddBand={addBanda}
        editingBand={editingBand}
      />
      <Footer />
    </>
  );
}

export default App;
