import { useState, useEffect } from "react";
import type { Band } from "../types/Band";

interface BandFormProps {
  onAddBand: (band: Band) => void;
  onUpdateBand: (band: Band) => void;
  editingBand: Band | null;
}

function BandForm({ onAddBand, editingBand, onUpdateBand }: BandFormProps) {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [enlace, setEnlace] = useState("");

  const [errors, setErrors] = useState<{
    nombre?: string;
    genero?: string;
    enlace?: string;
  }>({});

  useEffect(() => {
    if (!editingBand) {
      return;
    }

    setNombre(editingBand.nombre);
    setGenero(editingBand.genero);
    setEnlace(editingBand.enlace);
  }, [editingBand]);
  function handleSubmit() {
    const newErrors: typeof errors = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!genero.trim()) {
      newErrors.genero = "El género es obligatorio";
    }

    if (!enlace.trim()) {
      newErrors.enlace = "El enlace es obligatorio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (editingBand) {
      const bandaEdit: Band = {
        id: editingBand.id,
        nombre: nombre,
        genero: genero,
        enlace: enlace,
      };
      onUpdateBand(bandaEdit);
      setNombre("");
      setGenero("");
      setEnlace("");
      setErrors({});
    } else {
      const nuevaBanda: Band = {
        id: Date.now(),
        nombre: nombre.trim(),
        genero: genero.trim(),
        enlace: enlace.trim(),
      };

      onAddBand(nuevaBanda);

      setNombre("");
      setGenero("");
      setEnlace("");
      setErrors({});
    }
  }

  return (
    <>
      <h2>{editingBand ? "Editar banda" : "Añadir banda"}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor="nombre">Nombre</label>
          <br />
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
        </div>

        <br />

        <div>
          <label htmlFor="genero">Género</label>
          <br />
          <input
            id="genero"
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
          {errors.genero && <p style={{ color: "red" }}>{errors.genero}</p>}
        </div>

        <br />

        <div>
          <label htmlFor="enlace">Bandcamp</label>
          <br />
          <input
            id="enlace"
            type="url"
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
          />
          {errors.enlace && <p style={{ color: "red" }}>{errors.enlace}</p>}
        </div>

        <br />

        <button type="submit">
          {editingBand ? "Guardar cambios" : "Añadir banda"}
        </button>
      </form>
    </>
  );
}

export default BandForm;
