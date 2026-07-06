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
      nombre: "Midnight",
      genero: "Black n' roll",
      enlace: "https://death.bandcamp.com",
      embed:
        "https://bandcamp.com/EmbeddedPlayer/album=3635898980/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=1003606430/transparent=true/",
    },
  ]);

  const [editingBand, setEditingBand] = useState<Band | null>(null);
  const [showForm, setShowForm] = useState(false);

  function addBanda(nuevaBanda: Band) {
    setBandas([...bandas, nuevaBanda]);
  }

  function deleteBanda(id: number) {
    setBandas(bandas.filter((banda) => banda.id !== id));
  }

  function editBanda(id: number) {
    cerrarFormulario();
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

  function cerrarFormulario() {
    setShowForm((prev) => !prev);
  }
  return (
    <>
      <Header />
      <BandList
        bandas={bandas}
        onDeleteBand={deleteBanda}
        onEditBand={editBanda}
      />
      {showForm && (
        <BandForm
          onCerrarFormulario={cerrarFormulario}
          onAddBand={addBanda}
          onUpdateBand={updateBanda}
          editingBand={editingBand}
        />
      )}

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar formulario" : "Añadir banda"}
      </button>
      <Footer />
    </>
  );
}

export default App;
