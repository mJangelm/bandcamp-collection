import Header from "./components/Header";
import Footer from "./components/Footer";
import BandList from "./components/BandList";
import BandForm from "./components/BandForm";
import { useState } from "react";
import type { Band } from "./types/Band";
import Modal from "./components/Modal";
import * as XLSX from "xlsx";
function App() {
  const [bandas, setBandas] = useState<Band[]>([
    {
      id: 0,
      nombre: "Midnight",
      genero: "Black n' roll",
      enlace: "https://death.bandcamp.com",
      embed:
        "https://bandcamp.com/EmbeddedPlayer/album=3635898980/size=small/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=1003606430/transparent=true/",
    },
    {
      id: 1,
      nombre: "Turnstile",
      genero: "Hc punk",
      enlace: "https://turnstilehc.bandcamp.com/album/nonstop-feeling",
      embed:
        "https://bandcamp.com/EmbeddedPlayer/album=2526813997/size=small/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=3969365675/transparent=true/",
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

  function exportarExcel() {
    const hoja = XLSX.utils.json_to_sheet(bandas);

    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, "Bandas");

    XLSX.writeFile(libro, "bandcamp-collection.xlsx");
  }

  function cerrarFormulario() {
    setShowForm((prev) => !prev);
  }
  return (
    <>
      <Header />
      <main className="container">
        <BandList
          bandas={bandas}
          onDeleteBand={deleteBanda}
          onEditBand={editBanda}
        />
        <Modal isOpen={showForm} onClose={cerrarFormulario}>
          <BandForm
            onCerrarFormulario={cerrarFormulario}
            onAddBand={addBanda}
            onUpdateBand={updateBanda}
            editingBand={editingBand}
          />
        </Modal>

        <button
          className="btn btn-danger rounded-circle position-fixed"
          style={{
            bottom: "30px",
            left: "30px",
            width: "65px",
            height: "65px",
            fontSize: "30px",
          }}
          onClick={cerrarFormulario}
        >
          {showForm ? "×" : "+"}
        </button>
        <button onClick={exportarExcel}>📥 Exportar colección</button>
      </main>

      <Footer />
    </>
  );
}

export default App;
