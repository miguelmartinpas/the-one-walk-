import { stages } from "./data/waypoints";
import MiddleEarthMap from "./components/MiddleEarthMap";

export default function MapaPage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="font-mono text-3xl font-bold tracking-wide text-zinc-900 dark:text-zinc-50">
          La Ruta del Anillo
        </h1>
        <p className="mt-2 max-w-xl font-mono text-sm text-zinc-600 dark:text-zinc-400">
          El viaje de Frodo Bolsón por la Tierra Media, desde Bolsón Cerrado hasta
          el Monte del Destino. 2.863 km en 5 etapas. Pasa el ratón por cada
          waypoint para ver su nombre y la distancia del tramo siguiente.
        </p>
      </header>
      <MiddleEarthMap />
      <section aria-label="Leyenda de etapas" className="flex flex-wrap justify-center gap-3">
        {stages.map((stage) => (
          <span
            key={stage.id}
            className="flex items-center gap-2 font-mono text-xs text-zinc-700 dark:text-zinc-300"
          >
            <span
              className="inline-block h-3 w-3"
              style={{ backgroundColor: stage.color }}
              aria-hidden="true"
            />
            {stage.id}. {stage.name} ({stage.totalDistance} km)
          </span>
        ))}
      </section>
    </main>
  );
}