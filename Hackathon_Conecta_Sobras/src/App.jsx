import { Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import { DonationProvider } from "./context/DonationContext.jsx";
import DonationDetailsPage from "./pages/DonationDetailsPage.jsx";
import DonationsPage from "./pages/DonationsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ImpactPage from "./pages/ImpactPage.jsx";
import NewDonationPage from "./pages/NewDonationPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ReservationsPage from "./pages/ReservationsPage.jsx";

export default function App() {
  return (
    <DonationProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="cadastro" element={<RegisterPage />} />
          <Route path="doacoes" element={<DonationsPage />} />
          <Route path="doacoes/nova" element={<NewDonationPage />} />
          <Route path="doacoes/:donationId" element={<DonationDetailsPage />} />
          <Route path="reservas" element={<ReservationsPage />} />
          <Route path="impacto" element={<ImpactPage />} />
          <Route path="historico" element={<HistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </DonationProvider>
  );
}
