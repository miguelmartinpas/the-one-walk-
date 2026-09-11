# SPEC 02 — Mapa real de la Tierra Media con ruta de Frodo

> **Status:** Implemented
> **Depends on:** SPEC 01
> **Date:** 2026-09-11
> **Objective:** Reemplazar el mapa pixel art dibujado a mano por el mapa vectorial real de la Tierra Media (3200×2400, CC BY 4.0) y re-ubicar sobre él la ruta de Frodo con marcadores circulares y tooltip de tres distancias.

## Scope

**In:**

- Reemplazar el fondo SVG dibujado a mano (`MapBackground.tsx`) por el mapa vectorial real `references/mapa/Map_of_Middle-Earth.svg` (3200×2400, CC BY 4.0).
- Integrar el mapa como asset estático y dibujar la ruta como overlay SVG del mismo viewBox (sin incrustar los 1.7 MB en el bundle).
- Re-ubicar los 24 waypoints existentes sobre la geografía real del mapa, apoyándose en ríos, montañas y topónimos visibles.
- Marcadores circulares y líneas de ruta suaves (con colores por etapa), sustituyendo el estilo pixel.
- Tooltip con tres distancias: al siguiente waypoint, acumulada desde el inicio y desde el punto previo.
- Casos extremos: Bolsón Cerrado muestra "Inicio" (0 km); Monte del Destino muestra "Fin de la ruta" (2.863 km acumulados).
- Crédito del mapa (CC BY 4.0) en el pie de la página `/mapa`.
- Actualizar el texto descriptivo de la página (mencionaba solo "distancia del tramo siguiente").

**Out of scope (for future specs):**

- Animación de trazado progresivo de la ruta.
- Panel detallado de etapa al hacer click.
- Integración con APIs de mapas reales (Leaflet/Mapbox).
- Añadir o remodelar etapas, waypoints o distancias (se conservan los 24 de SPEC 01 y los 5 tramos).
- Integrar el nuevo mapa en otras secciones de la app fuera de `/mapa`.

## Data model

Se conservan `Stage` y los 24 waypoints con las mismas distancias por tramo, pero `Waypoint` cambia:

```ts
type Waypoint = {
  id: string;
  name: string;
  distance: number;            // km al siguiente waypoint (se conserva)
  distanceFromStart: number;   // km acumulados desde Bolsón Cerrado (NUEVO)
  coordinates: { x: number; y: number };  // en el viewBox del mapa real 0 0 3200 2400 (NUEVO)
  stage: number;               // 1-5 (sin cambios)
};
```

La distancia al punto previo no se almacena: se deriva en el tooltip como `distance` del waypoint anterior (0 para el primero).

```ts
// Ejemplo de los casos extremos (coordenadas re-ubicadas durante la implementación)
{ id: "bolson-cerrado",   name: "Bolsón Cerrado",               distance: 32,  distanceFromStart: 0,    stage: 1 },
{ id: "monte-destino",    name: "Monte del Destino (Orodruin)", distance: 0,   distanceFromStart: 2863, stage: 5 },
```

Convenciones:

- Coordenadas en píxeles relativos al viewBox `0 0 3200 2400` del mapa real.
- `distanceFromStart` se calcula acumulando la columna `Distancia estimada` de `references/recorrido_detallado.md` (suma total: 2.863 km).
- La composición es mapa estático + overlay, ambos con el mismo viewBox, por lo que los markers y la ruta se alinean con la geografía del mapa.

## Implementation plan

1. Copiar `references/mapa/Map_of_Middle-Earth.svg` a `public/mapa/Map_of_Middle-Earth.svg` como asset estático. El original queda como fuente en `references/`. Manual: la página sigue funcionando con el mapa antiguo.
2. Reescribir `app/mapa/components/MiddleEarthMap.tsx` para renderizar un `<svg viewBox="0 0 3200 2400">` con el mapa como `<image>` estático y dibujar encima la misma lógica de rutas y markers, escalando provisionalmente las coordenadas actuales (×8/3). Manual: la página muestra el mapa real con la ruta reescalada (posiciones provisionales).
3. Ampliar el modelo en `app/mapa/data/waypoints.ts`: añadir `distanceFromStart` con los 24 valores acumulados de `references/recorrido_detallado.md` y actualizar el tipo `Waypoint`. Manual: compilación sin errores de tipos.
4. Re-ubicar manualmente las coordenadas de los 24 waypoints sobre la geografía real del mapa, tramo a tramo (Comarca-Rivendel, Rivendel-Lothlórien, Anduin-Rauros, Rauros-Cirith Ungol, Cirith Ungol-Orodruin), apoyándose en ríos, montañas y topónimos del SVG. Manual: cada marker queda sobre el lugar correcto.
5. Cambiar la estética: markers circulares rellenos con el color de la etapa y borde, y líneas de ruta suaves (stroke con extremos/union redondeados, ancho ~7, opacidad ~0.85). Eliminar cuadrados y `crispEdges`. Manual: ruta y markers se ven prolijos sobre el mapa.
6. Extender el tooltip a tres distancias: "al siguiente", "desde el inicio" (acumulado) y "desde el punto previo". Casos extremos: Bolsón Cerrado muestra "Inicio" (0 km); Monte del Destino muestra "Fin de la ruta". Ajustar el tamaño del tooltip a 3 líneas. Manual: hover en cada waypoint muestra las tres cifras.
7. Actualizar `app/mapa/page.tsx`: añadir en el pie del mapa el crédito "Mapa basado en mapome (CC BY 4.0)" con enlace a la fuente, y corregir el texto que describía solo "la distancia del tramo siguiente". Manual: crédito visible y texto coherente.
8. Revisión visual final tramo a tramo: cada waypoint sobre su ubicación real, la ruta sigue la geografía (Anduin, montañas, Mordor) y el total acumulado termina en 2.863 km.

## Acceptance criteria

- [ ] La página `/mapa` carga sin errores en consola.
- [ ] El mapa mostrado es `Map_of_Middle-Earth.svg` (mapome, 3200×2400) y no el fondo pixel art anterior.
- [ ] `MapBackground.tsx` deja de renderizarse (se elimina o se deja sin referencia).
- [ ] Los 24 waypoints se re-ubican sobre su ubicación real, verificable tramo a tramo: Bolsón Cerrado en la Comarca, Rivendel en su valle, Caras Galadhon en Lothlórien, Rauros junto al Anduin, Cirith Ungol y el Monte del Destino en Mordor.
- [ ] Los markers son circulares (relleno con color de etapa y borde) y las líneas de ruta son suaves, sin cuadrados ni `crispEdges`.
- [ ] Los 5 tramos conservan sus colores diferenciados.
- [ ] El tooltip de cada waypoint muestra las tres distancias: al siguiente, acumulada desde el inicio y desde el punto previo.
- [ ] El waypoint inicial muestra "Inicio" con 0 km; el final muestra "Fin de la ruta", 2.863 km acumulados y 48 km desde el punto previo.
- [ ] El acumulado del último waypoint es exactamente 2.863 km.
- [ ] El crédito CC BY 4.0 del mapa aparece en el pie de la página `/mapa`.
- [ ] El texto descriptivo de la página describe las tres distancias del tooltip.
- [ ] `npm run build` y `npm run lint` terminan sin errores.

## Decisions

- **Sí:** Asset estático en `public/mapa/` + overlay SVG del mismo viewBox. No infla el bundle y conserva la lógica de volúmenes; el coste extra es mínimo.
- **No:** Incrustar el SVG completo (1.7 MB) como componente React. Bundle enorme y conversión JSX impráctica.
- **No:** Extraer solo algunos grupos del SVG. Menos fiel y no aporta nada frente al overlay estático.
- **Sí:** `mapome-slim.svg` (k1tesurfen/mapome) como mapa. Es el fichero completo del que procede el anterior (truncado a mitad del trazado), misma resolución 3200×2400 y licencia CC BY 4.0.
- **No:** "Sketch Map of Middle-earth" de Wikimedia. Menos detalle y CC BY-SA 4.0 obliga a liberar el trabajo con la misma licencia.
- **Sí:** Re-ubicar los 24 waypoints sobre la geografía real.
- **No:** Escalar mecánicamente las coordenadas antiguas ×8/3 como resultado final (se usa solo como paso provisional del plan).
- **Sí:** Markers circulares y líneas suaves. El pixelart choca con un mapa realista; se prioriza legibilidad.
- **No:** Conservar el pixel art. Queda superpuesto sin cohesión sobre el mapa real.
- **Sí:** Conservar `distance` (al siguiente) y añadir `distanceFromStart`; "desde el punto previo" se deriva del `distance` del waypoint anterior, sin duplicar datos.
- **No:** Guardar las tres distancias en cada waypoint. Redundancia evitable con una sola fuente de verdad.
- **Sí:** Crédito CC BY 4.0 en el pie de la página. Es requisito de la licencia.
- **No:** Crédito solo en el README. El usuario quiere que se vea en la página.

## Risks

| Riesgo | Mitigación |
| ------ | ---------- |
| Mapa de 1.7 MB con 3.184 paths puede ir lento en móviles | Se renderiza como `<image>` estático (una sola pieza, sin DOM por path); el hover solo afecta a los 24 markers del overlay. Se verifica en el paso 8 sobre viewport móvil. |
| Los topónimos del SVG usan la fuente "Mirza" que no está en el proyecto | El navegador usa una fuente de respaldo; el mapa sigue siendo usable. Si la tipografía se quiere exacta, colocar la fuente en `public/fonts/` en un spec posterior. |
| La precisión de la re-ubicación depende de legibilidad de etiquetas | Localizar usando también ríos, montañas y costa (no solo textos). Verificación visual en el paso 8. |

## What is **not** in this spec

- Animación de trazado progresivo de la ruta.
- Panel detallado de etapa al hacer click.
- Integración con APIs de mapas reales (Leaflet/Mapbox).
- Modificación de etapas, waypoints o distancias más allá del campo nuevo `distanceFromStart`.
- El nuevo mapa en otras secciones de la app fuera de `/mapa`.
- Fuente "Mirza" para los topónimos del mapa (solo respaldo del navegador).

Cada uno de esos, si llega, va en su propio spec.