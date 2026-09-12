# SPEC 04 — Waypoint activo como estrella de cinco puntas

> **Status:** Implemented
> **Depends on:** SPEC 03
> **Date:** 2026-09-11
> **Objective:** Convertir el marker del waypoint activo (hover o clic) en una estrella clásica de cinco puntas más grande (diámetro ~40), con halo de resplandor y anillo blanco, mientras los puntos no seleccionados se mantienen como círculos.

## Scope

**In:**

- Cambiar el marker del waypoint activo en `MiddleEarthMap.tsx` (`WaypointMarker`): de círculo a **estrella clásica de 5 puntas**.
- La estrella se muestra cuando el punto está activo, es decir, tanto en **hover** como en **clic/fijado** (misma condición que el resaltado actual de SPEC 03).
- Tamaño: **diámetro exterior ~40** (radio ~20), visiblemente más grande que el círculo activo actual (radio 28).
- Mantener el **halo actual** (glow del color de la etapa + anillo blanco) detrás de la estrella.
- Los waypoints **no activos se mantienen como círculos**, sin cambios.

**Out of scope (for future specs):**

- Cambiar la forma de los waypoints no activos.
- Animación de la estrella (rotación, pulsación, entrada/salida).
- Cambiar el contenido, tamaño o posición del tooltip/popup (SPEC 02 y 03).
- Añadir leyenda, marcador de inicio/fin u otros elementos al usar la estrella.
- Modificar waypoints, etapas, distancias o el modelo de datos.

## Data model

No se introduce ninguna estructura de datos nueva. El modelo existente (`Waypoint`, `Stage`, `waypoints`, `stages`) queda intacto. El cambio es 100 % visual: la renderización de `WaypointMarker` en `MiddleEarthMap.tsx` pasa de dibujar círculos a dibujar una estrella de 5 puntas cuando `isActive` es `true`.

## Implementation plan

1. Añadir la función auxiliar `starPoints(cx, cy, outerR, innerR, numPoints)` en `MiddleEarthMap.tsx`, antes del componente `WaypointMarker`. Genera una cadena de puntos para un `<polygon>` SVG de estrella clásica (5 puntas externas, 5 internas). Manual: el archivo compila sin errores.
2. Modificar `WaypointMarker`: cuando `isActive`, sustituir los tres círculos base por un `<polygon>` usando `starPoints(x, y, 20, 8, 5)` (diámetro ~40, radio interior ~8). Mantener el halo (glow + anillo blanco) tal cual. Los círculos base se mantienen solo cuando `!isActive`. Manual: al hacer hover o clic, el waypoint se ve como una estrella con halo; los demás siguen siendo círculos.
3. Revisión visual: probar hover y clic en varios waypoints (incluido Bolsón Cerrado y Monte del Destino), ajustar `innerR` si la estrella se ve muy fina o muy rechoncha. Verificar que el color de etapa y el halo se mantienen correctamente. Manual: estrella se ve clásica y proporcionada.
4. Ejecutar `npm run build` y `npm run lint` para confirmar que ambos terminan sin errores.

## Acceptance criteria

- [ ] La página `/mapa` carga sin errores en consola.
- [ ] El waypoint activo (hover o clic) se renderiza como **estrella de 5 puntas** (`<polygon>`) y no como círculo.
- [ ] La estrella tiene un diámetro exterior de ~40 (radio ~20), visiblemente más grande que el círculo normal (radio 22).
- [ ] La estrella aparece tanto al pasar el ratón (hover) como al fijar con clic.
- [ ] El halo (glow del color de etapa + anillo blanco) se mantiene detrás de la estrella.
- [ ] La estrella usa el color de su etapa como relleno y un borde oscuro para definición.
- [ ] Los waypoints no activos se mantienen como círculos, sin cambios respecto al estado actual.
- [ ] `npm run build` y `npm run lint` terminan sin errores.

## Decisions

- **Sí:** Estrella en hover y en clic (ambos activan el marker). Consistente con el resaltado de SPEC 03: lo que hago ahora es lo que veo.
- **No:** Estrella solo en clic, hover con el anillo circular actual. Sería inconsistente: dos visualmente distintos para el mismo estado "activo".
- **Sí:** Estrella clásica de 5 puntas. La forma universalmente reconocida como "estrella".
- **No:** 4 puntas (destello) o 6 puntas (David). No son lo que la mayoría entiende por "estrella" sin más contexto.
- **Sí:** Halo (glow + anillo blanco) detrás de la estrella. Cumple con "que se vea mejor": no solo más grande, sino con resplandor.
- **No:** Estrella sustituye todo (sin halo). Se perdería el énfasis visual que el glow aporta sobre el mapa.
- **Sí:** Diámetro ~40 (radio 20). Visiblemente más grande que el círculo actual (radio 22) y consistente con el halo existente (~34).
- **No:** Diámetro 50+. Taparía segmentos de la ruta en waypoints muy juntos (p. ej., Bolsón Cerrado–Casa de los Gamos).
- **No:** Animación de la estrella (rotación, pulsación). Requiere un spec propio por las decisiones de timing y accesibilidad.

## Risks

Al tratarse de un cambio puramente visual en un solo componente (`WaypointMarker`), sin datos nuevos ni dependencias externas, no hay riesgos relevantes que documentar.

## What is **not** in this spec

- Animación de la estrella (rotación, pulsación, entrada/salida).
- Cambiar la forma de los waypoints no activos.
- Modificar el contenido, tamaño o posición del tooltip/popup.
- Modificar waypoints, etapas, distancias o el modelo de datos.
- Añadir leyenda, marcador de inicio/fin o leyenda de colores.
- Integración con librerías externas de SVG o iconos.

Cada uno de esos, si llega, va en su propio spec.