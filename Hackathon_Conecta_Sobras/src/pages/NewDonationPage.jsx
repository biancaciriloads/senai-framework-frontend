import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDonations } from "../context/DonationContext.jsx";
import { categories, localDateString, validateDonation } from "../lib/donations.js";

const emptyForm = {
  food: "",
  category: categories[0],
  quantityKg: "",
  expiresOn: "",
  pickupWindow: "",
  donor: "",
  pickupArea: "",
  notes: "",
};

export default function NewDonationPage() {
  const { addDonation } = useDonations();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState("");

  function update(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateDonation(form);
    setErrors(nextErrors);
    setSaveError("");
    if (Object.keys(nextErrors).length > 0) return;

    try {
      const donation = addDonation(form);
      navigate(`/doacoes/${donation.id}`);
    } catch (error) {
      setSaveError(error.message);
    }
  }

  return (
    <section className="form-page">
      <p className="eyebrow">Nova oferta</p>
      <h1>Compartilhe um excedente</h1>
      <p className="helper-text mt-2">Informe uma região geral, não um endereço residencial. Não use dados reais ou sensíveis.</p>
      <form className="form-panel mt-6" onSubmit={submit} noValidate>
        {saveError && <p className="notice notice-error" role="alert">{saveError}</p>}
        <label className="field">
          <span>Alimento *</span>
          <input value={form.food} onChange={update("food")} required aria-invalid={Boolean(errors.food)} />
          {errors.food && <small className="field-error">{errors.food}</small>}
        </label>
        <div className="form-grid">
          <label className="field">
            <span>Categoria *</span>
            <select value={form.category} onChange={update("category")} required>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            {errors.category && <small className="field-error">{errors.category}</small>}
          </label>
          <label className="field">
            <span>Quantidade (kg) *</span>
            <input type="number" min="0.1" step="0.1" value={form.quantityKg} onChange={update("quantityKg")} required aria-invalid={Boolean(errors.quantityKg)} />
            {errors.quantityKg && <small className="field-error">{errors.quantityKg}</small>}
          </label>
          <label className="field">
            <span>Validade *</span>
            <input type="date" min={localDateString()} value={form.expiresOn} onChange={update("expiresOn")} required aria-invalid={Boolean(errors.expiresOn)} />
            {errors.expiresOn && <small className="field-error">{errors.expiresOn}</small>}
          </label>
          <label className="field">
            <span>Janela de retirada *</span>
            <input placeholder="Ex.: hoje, 16h–18h" value={form.pickupWindow} onChange={update("pickupWindow")} required aria-invalid={Boolean(errors.pickupWindow)} />
            {errors.pickupWindow && <small className="field-error">{errors.pickupWindow}</small>}
          </label>
          <label className="field">
            <span>Doador ou organização *</span>
            <input value={form.donor} onChange={update("donor")} required aria-invalid={Boolean(errors.donor)} />
            {errors.donor && <small className="field-error">{errors.donor}</small>}
          </label>
          <label className="field">
            <span>Região de retirada *</span>
            <input placeholder="Bairro ou região geral" value={form.pickupArea} onChange={update("pickupArea")} required aria-invalid={Boolean(errors.pickupArea)} />
            {errors.pickupArea && <small className="field-error">{errors.pickupArea}</small>}
          </label>
        </div>
        <label className="field mt-4">
          <span>Observações</span>
          <textarea rows="3" maxLength="300" value={form.notes} onChange={update("notes")} />
        </label>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="button button-primary" type="submit">Publicar oferta</button>
          <Link className="button button-secondary" to="/doacoes">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
