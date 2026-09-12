import { stages } from "./data/waypoints";
import MiddleEarthMap from "./components/MiddleEarthMap";

const TOTAL_KM = stages.reduce((sum, stage) => sum + stage.totalDistance, 0);

export default function MapaPage() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col items-center bg-parchment px-4 py-10 text-ink sm:px-6 sm:py-14">
      <header className="flex w-full max-w-4xl flex-col items-center text-center">
        <h1 className="font-mono text-3xl font-bold uppercase leading-tight tracking-[0.18em] text-ink sm:text-4xl md:text-5xl">
          La Ruta del Anillo
        </h1>
        <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-ink-soft sm:text-base">
          El viaje de Frodo Bolsón por la Tierra Media, desde Bolsón Cerrado hasta
          el Monte del Destino. 2.863 km en 5 etapas. Pasa el ratón por cada
          waypoint para ver su nombre, la distancia al siguiente punto, la distancia
          acumulada desde el inicio y la distancia desde el punto previo.
        </p>
        <div
          aria-hidden="true"
          className="mt-6 flex h-1.5 w-full max-w-xl overflow-hidden rounded-sm"
        >
          {stages.map((stage) => (
            <span
              key={stage.id}
              className="h-full"
              style={{
                width: `${(stage.totalDistance / TOTAL_KM) * 100}%`,
                backgroundColor: stage.color,
              }}
            />
          ))}
        </div>
      </header>

      <div className="mt-8 w-full max-w-6xl">
        <MiddleEarthMap />
      </div>

      <section
        aria-label="Leyenda de etapas"
        className="mt-8 w-full max-w-6xl border-2 border-ink/70 bg-parchment-deep p-4 font-mono text-xs text-ink sm:text-sm"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
          {stages.map((stage) => (
            <span key={stage.id} className="flex items-center gap-2">
              <span
                className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-ink/60 shadow-[0_0_0_1px_#f5e9c9]"
                style={{ backgroundColor: stage.color }}
                aria-hidden="true"
              />
              {stage.id}. {stage.name} ({stage.totalDistance} km)
            </span>
          ))}
        </div>
      </section>

      <footer className="mt-6 py-2 font-mono text-xs text-ink-soft">
        Mapa basado en{" "}
        <a
          href="https://github.com/k1tesurfen/mapome"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-ink"
        >
          mapome (CC BY 4.0)
        </a>
      </footer>
    </main>
  );
}