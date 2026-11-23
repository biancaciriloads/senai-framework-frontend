import { useCallback, useEffect, useRef, useState } from "react";

interface ClockResponse {
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  status: string;
}

const apiUrl = (import.meta.env.VITE_CLOCK_API_URL ?? "http://localhost:4320")
  .trim()
  .replace(/\/+$/, "");

function isClockResponse(value: unknown): value is ClockResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const clock = value as Record<string, unknown>;
  return (
    typeof clock.dateTime === "string" &&
    typeof clock.date === "string" &&
    typeof clock.time === "string" &&
    typeof clock.timeZone === "string" &&
    typeof clock.status === "string" &&
    !Number.isNaN(Date.parse(clock.dateTime))
  );
}

function App() {
  const [clock, setClock] = useState<ClockResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const activeRequest = useRef<AbortController | null>(null);

  const loadClock = useCallback(async () => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`A API respondeu com o status ${response.status}.`);
      }

      const data: unknown = await response.json();
      if (!isClockResponse(data)) {
        throw new Error("A resposta da API não tem o formato esperado.");
      }

      setClock(data);
    } catch (requestError) {
      if (controller.signal.aborted) {
        return;
      }

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível consultar a API.",
      );
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadClock();
    const intervalId = window.setInterval(
      () => void loadClock(),
      30_000,
    );

    return () => {
      window.clearInterval(intervalId);
      activeRequest.current?.abort();
    };
  }, [loadClock]);

  return (
    <main className="page-shell">
      <section className="clock-card" aria-labelledby="page-title">
        <div className="card-topline">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span className="brand-name">SENAI · FRAMEWORKS FRONT-END</span>
          <span className={`connection-status${error ? " is-offline" : ""}`}>
            <span className="status-dot" aria-hidden="true" />
            {error ? "Sem conexão" : "API conectada"}
          </span>
        </div>

        <div className="clock-content">
          <p className="eyebrow">DATA E HORA DA API</p>
          <h1 id="page-title">Um instante, agora.</h1>
          <p className="intro">
            A hora oficial vem de uma API Express e é consultada em tempo real.
          </p>

          <div className="time-panel" aria-live="polite" aria-busy={isLoading}>
            <span className="time-label">HORÁRIO DE BRASÍLIA</span>
            {clock ? (
              <>
                <time className="time-value" dateTime={clock.dateTime}>
                  {clock.time}
                </time>
                <p className="date-value">{clock.date}</p>
              </>
            ) : (
              <p className="time-placeholder">
                {isLoading ? "Consultando..." : "Horário indisponível"}
              </p>
            )}
          </div>

          {error && (
            <p className="error-message" role="alert">
              {error} Confirme se a API está em execução e tente novamente.
            </p>
          )}

          <button
            className="refresh-button"
            type="button"
            onClick={() => void loadClock()}
            disabled={isLoading}
          >
            <span aria-hidden="true">↻</span>
            {isLoading ? "A consultar" : "Atualizar horário"}
          </button>
        </div>

        <footer className="card-footer">
          <span>Fonte: API própria · Express.js</span>
          <span>Fuso: {clock?.timeZone ?? "America/Sao_Paulo"}</span>
        </footer>
      </section>
      <p className="page-caption">ATIVIDADE 02 · CONSUMINDO APIs NO FRONT-END</p>
    </main>
  );
}

export default App;
