import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<main><h1>Descobertas</h1></main>} />
      <Route path="*" element={<main><h1>Página não encontrada</h1></main>} />
    </Routes>
  );
}
