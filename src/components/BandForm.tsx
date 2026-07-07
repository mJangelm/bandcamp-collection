import { useState, useEffect } from "react";
import type { Band } from "../types/Band";

interface BandFormProps {
  onAddBand: (band: Band) => void;
  onUpdateBand: (band: Band) => void;
  editingBand: Band | null;
  onCerrarFormulario: () => void;
}

function BandForm({
  onAddBand,
  editingBand,
  onCerrarFormulario,
  onUpdateBand,
}: BandFormProps) {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [enlace, setEnlace] = useState("");
  const [embed, setEmbed] = useState("");

  const [errors, setErrors] = useState<{
    nombre?: string;
    genero?: string;
    enlace?: string;
    embed?: string;
  }>({});

  useEffect(() => {
    if (!editingBand) {
      return;
    }

    setNombre(editingBand.nombre);
    setGenero(editingBand.genero);
    setEnlace(editingBand.enlace);
    setEmbed(editingBand.embed);
  }, [editingBand]);

  function extraerSrc(codigo: string): string {
    const match = codigo.match(/src="([^"]+)"/);

    return match ? match[1] : codigo.trim();
  }

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

    if (!embed.trim()) {
      newErrors.embed = "El reproductor es obligatorio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const embedLimpio = extraerSrc(embed);

    if (editingBand) {
      const bandaEdit: Band = {
        id: editingBand.id,
        nombre: nombre.trim(),
        genero: genero.trim(),
        enlace: enlace.trim(),
        embed: embedLimpio,
      };

      onUpdateBand(bandaEdit);
      onCerrarFormulario();
    } else {
      const nuevaBanda: Band = {
        id: Date.now(),
        nombre: nombre.trim(),
        genero: genero.trim(),
        enlace: enlace.trim(),
        embed: embedLimpio,
      };

      onAddBand(nuevaBanda);
      onCerrarFormulario();
    }

    setNombre("");
    setGenero("");
    setEnlace("");
    setEmbed("");
    setErrors({});
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

        <div>
          <label htmlFor="embed">Embed de Bandcamp</label>
          <br />
          <textarea
            id="embed"
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
            placeholder="https://bandcamp.com/EmbeddedPlayer/..."
          />
          {errors.embed && <p style={{ color: "red" }}>{errors.embed}</p>}
        </div>

        <br />

        <button type="submit">
          {editingBand ? "Guardar cambios" : "Añadir"}
        </button>
        <button onClick={() => onCerrarFormulario()}>Cancelar</button>
      </form>
    </>
  );
}

export default BandForm;
