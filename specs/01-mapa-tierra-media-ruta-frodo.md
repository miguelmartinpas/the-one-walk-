# SPEC 01 — Mapa de la Tierra Media: Ruta de Frodo

> **Status:** Implemented
> **Depends on:** —
> **Date:** 2026-09-10
> **Objective:** Crear un mapa SVG interactivo estilo pixel art que muestre la ruta completa de Frodo por la Tierra Media con hover en cada waypoint.

## Scope

**In:**

- Componente SVG dibujado a mano con estilo pixel art de la Tierra Media
- 5 tramos principales con sus subtramos visibles
- Datos de waypoints y distancias extraídos de `references/recorrido_detallado.md`
- Hover sobre cada waypoint muestra nombre del tramo y distancia
- Ruta `/mapa` como página completa
- Diseño responsive

**Out of scope (for future specs):**

- Animación de trazado progresivo de la ruta
- Click para panel detallado de cada etapa
- Integración con APIs de mapas reales
- Datos de clima, terreno o eventos históricos

## Data model

```ts
type Waypoint = {
  id: string;
  name: string;
  distance: number; // km al siguiente waypoint
  coordinates: { x: number; y: number }; // posición en el SVG
  stage: number; // 1-5
};

type Stage = {
  id: number;
  name: string;
  totalDistance: number;
  color: string;
};

const stages: Stage[] = [
  { id: 1, name: "La Comarca a Rivendel", totalDistance: 737, color: "#4a7c59" },
  { id: 2, name: "Rivendel a Lothlórien", totalDistance: 743, color: "#7b68ee" },
  { id: 3, name: "Lothlórien a Rauros", totalDistance: 626, color: "#4682b4" },
  { id: 4, name: "Rauros a Cirith Ungol", totalDistance: 624, color: "#8b4513" },
  { id: 5, name: "Cirith Ungol al Monte del Destino", totalDistance: 133, color: "#dc143c" },
];

const waypoints: Waypoint[] = [
  { id: "bolsón-cerrado", name: "Bolsón Cerrado", distance: 32, coordinates: { x: 100, y: 200 }, stage: 1 },
  // ... todos los waypoints de recorrido_detallado.md
];
```

Conventions:

- Coordenadas en píxeles relativos al SVG viewBox
- Cada stage tiene un color asignado para la línea de ruta

## Implementation plan

1. Crear estructura de archivos: `app/mapa/page.tsx`, `app/mapa/components/MiddleEarthMap.tsx`, `app/mapa/data/waypoints.ts`
2. Definir waypoints y stages en `waypoints.ts` con todas las coordenadas y distancias de `references/recorrido_detallado.md`
3. Crear componente SVG base con viewBox y estilo pixel art en `MiddleEarthMap.tsx`
4. Dibujar contornos de la Tierra Media (shorelines, ríos principales, montañas) en SVG
5. Implementar líneas de ruta por stage con colores diferenciados
6. Añadir waypoints circulares con hover que muestra tooltip (nombre + distancia)
7. Crear página `/mapa` que renderiza el componente del mapa
8. Añadir responsive design para diferentes tamaños de pantalla

## Acceptance criteria

- [ ] La página `/mapa` carga sin errores en consola
- [ ] El mapa SVG se renderiza correctamente con estilo pixel art
- [ ] Los 5 tramos aparecen con colores diferenciados
- [ ] Los subtramos de cada etapa son visibles
- [ ] Hover sobre cualquier waypoint muestra tooltip con nombre y distancia
- [ ] El mapa es responsive en desktop, tablet y móvil
- [ ] Todos los waypoints de `references/recorrido_detallado.md` están representados

## Decisions

- **Yes:** SVG dibujado a mano. Ligero, estilizable, sin dependencias externas ni API keys.
- **No:** Leaflet/Mapbox. Requiere API key y no da control total sobre el estilo pixel art.
- **Yes:** Pixel art / retro. Se alinea con la estética del proyecto y es más sencillo de implementar en SVG.
- **No:** Animación de trazado. Complejidad innecesaria para un mapa estático.
- **Yes:** Tooltip en hover (no click). Suficiente para mostrar info sin sobrecargar la UI.
- **No:** Panel lateral con info detallada. Se deja para un spec futuro si se necesita.
- **Yes:** Coordenadas manuales en el SVG. Control total sobre la posición de cada waypoint.
- **No:** Coordenadas geográficas reales. El mapa es ilustrativo, no cartográfico.

## What is **not** in this spec

- Animación de trazado progresivo de la ruta
- Click para panel detallado de cada etapa
- Integración con APIs de mapas reales
- Datos de clima, terreno o eventos históricos
- Versión mobile optimizada (solo responsive básico)

Cada uno de esos, si llega, va en su propio spec.