import Header from "./components/Header";
import Footer from "./components/Footer";
import BandList from "./components/BandList";
import BandForm from "./components/BandForm";
import { useState } from "react";
import type { Band } from "./types/Band";
import Modal from "./components/Modal";
import {
  exportarBandasExcel,
  importarBandasExcel,
} from "./services/excelService";

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
    setBandas((prev) => [...prev, nuevaBanda]);
  }

  function deleteBanda(id: number) {
    setBandas((prev) => prev.filter((banda) => banda.id !== id));
  }

  function editBanda(id: number) {
    cerrarFormulario();

    const banda = bandas.find((banda) => banda.id === id);

    if (!banda) {
      return;
    }

    setEditingBand(banda);
  }

  function updateBanda(bandaEditada: Band) {
    setBandas((prev) =>
      prev.map((bandaActual) =>
        bandaActual.id === bandaEditada.id ? bandaEditada : bandaActual,
      ),
    );

    setEditingBand(null);
  }

  function importarExcel(event: React.ChangeEvent<HTMLInputElement>) {
    const archivo = event.target.files?.[0];

    if (!archivo) {
      return;
    }

    importarBandasExcel(archivo, (bandasImportadas) => {
      setBandas(bandasImportadas);
    });
  }

  function exportarExcel() {
    exportarBandasExcel(bandas);
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
          className="btn btn-primary shadow rounded-circle position-fixed"
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

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-success" onClick={exportarExcel}>
            📥 Exportar colección
          </button>

          <label className="btn btn-primary mb-0">
            📂 Importar colección
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={importarExcel}
              hidden
            />
          </label>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
