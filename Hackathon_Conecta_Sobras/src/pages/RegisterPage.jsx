import { useState } from "react";
import { useDonations } from "../context/DonationContext.jsx";

export default function RegisterPage() {
  const { registerUser, users } = useDonations();
  const [form, setForm] = useState({ name: "", role: "coletor" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      registerUser(form);
      setForm({ name: "", role: "coletor" });
      setMessage("Perfil demonstrativo salvo neste navegador.");
    } catch (saveError) {
      setError(saveError.message);
    }
  }

  return (
    <section className="form-page">
      <p className="eyebrow">Participação local</p>
      <h1>Cadastro demonstrativo</h1>
      <p className="helper-text mt-2">Não há autenticação nem conta compartilhada. Não informe dados pessoais reais.</p>
      <form className="form-panel mt-6" onSubmit={submit}>
        {error && <p className="notice notice-error" role="alert">{error}</p>}
        {message && <p className="notice" role="status">{message}</p>}
        <label className="field">
          <span>Nome fictício ou organização</span>
          <input required maxLength="80" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label className="field mt-4">
          <span>Como deseja participar?</span>
          <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option value="doador">Doador</option>
            <option value="coletor">Coletor</option>
          </select>
        </label>
        <button className="button button-primary mt-6" type="submit">Salvar perfil local</button>
      </form>
      <p className="helper-text mt-4">{users.length} perfil(is) demonstrativo(s) salvo(s) neste navegador.</p>
    </section>
  );
}
