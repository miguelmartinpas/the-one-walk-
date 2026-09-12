# SPEC 05 — Rediseño atlas de pergamino de la página del mapa

> **Status:** Implemented
> **Depends on:** SPEC 04
> **Date:** 2026-09-12
> **Objective:** Rediseñar la interfaz de la página /mapa con estética de atlas de pergamino, ampliando la paleta del propio mapa y adaptándola a todos los tamaños de pantalla.

## Scope

**In:**

- Definir tokens de paleta propios en `globals.css` usando colores que el mapa ya posee: pergamino (`#f5e9c9`), pergamino-deep (`#e6d7b1`), tinta (`#1c1f26`), tinta-suave (`#4a4f58`).
- Restablecer el body para usar Geist Sans (variable del proyecto) en lugar del fallback genérico Arial.
- Rediseñar `app/mapa/page.tsx`: fondo pergamino explícito en ambos modos (claro/oscuro), título display grabado en mayúsculas (mono, tracking 0.18em), cinta horizontal proporcional con los 5 colores de etapa, leyenda como placa con filete tinta, footer en tinta suave.
- Adaptar la página a tamaños de pantalla móvil (390px), tableta (768px) y escritorio (1440px) con tamaños de texto, espaciado y layout responsivos.
- Cambiar el marco del mapa en `MiddleEarthMap.tsx` a placa de atlas: mat pergamino-deep, filete exterior tinta 6px + interior fino, sombra suave difusa. Eliminar la sombra offset neobrutalista anterior.
- No tocar el interior del SVG (waypoints, tooltip, estrella, polilíneas).

**Out of scope (for future specs):**

- Añadir un sistema de zoom/pan para dispositivos táctiles (el mapa es pequeño en móvil pero funcional).
- Cambiar la tipografía a serif (requiere una nueva fuente, decisión separada).
- Animaciones de entrada o transiciones en la cinta de etapas o leyenda.
- Modificar el contenido, datos o modelo de waypoints/etapas.

## Data model

No se introduce ninguna estructura de datos nueva. Se añaden cuatro tokens de color al tema de Tailwind v4 en `globals.css`:

- `--color-parchment`: `#f5e9c9`
- `--color-parchment-deep`: `#e6d7b1`
- `--color-ink`: `#1c1f26`
- `--color-ink-soft`: `#4a4f58`

El total de kilómetros se calcula en `page.tsx` con `stages.reduce()` para la proporción de la cinta de etapas (no duplica el valor fijo 2863 del modelo).

## Implementation plan

1. Añadir tokens de paleta en `globals.css` dentro de `@theme inline`. Cambiar el body font-family a `var(--font-geist-sans)`. Manual: `npm run lint` sin errores nuevos.
2. Rediseñar `app/mapa/page.tsx`: fondo pergamino, cinta proporcional con los 5 colores de etapa (`aria-hidden`, widths calculados por `stage.totalDistance / TOTAL_KM`), leyenda como placa con marcadores de colores, footer y responsive. Manual: la página muestra la cinta con 5 colores proporcionales y la leyenda enmarcada.
3. Cambiar el wrapper del mapa en `MiddleEarthMap.tsx`: reemplazar `border-4 border-zinc-800 bg-white p-2 shadow-[8px_8px_0_0_#1a1c22]` por `border-[6px] border-ink bg-parchment-deep p-1.5/2.5 shadow suave` con un `div` interior con `border border-ink/40`. Sin tocar el SVG interno. Manual: el mapa se ve enmarcado como placa sobre pergamino con doble filete.
4. Ejecutar el detector de impeccable sobre los 3 archivos y corregir cualquier hallazgo. Manual: detector devuelve `[]`.
5. Verificar interacciones: hover → tooltip, clic → pin, estrella activa, sin errores en consola.

## Acceptance criteria

- [ ] La página `/mapa` carga sin errores en consola (1440px, 768px, 390px).
- [ ] El fondo de la página es pergamino `#f5e9c9` tanto en modo claro como oscuro.
- [ ] El título "La Ruta del Anillo" se muestra en mono, mayúsculas y tracking amplio (estética de placa grabada).
- [ ] Bajo el título aparece una cinta con 5 segmentos de colores de etapa, proporcionales a los km de cada etapa (737/743/626/624/133).
- [ ] La leyenda es una placa enmarcada con borde tinta y fondo pergamino-deep, con marcadores de color redondeados para cada etapa.
- [ ] El mapa tiene un marco de placa de atlas: borde exterior tinta 6px, mat pergamino-deep, sombra suave. No se percibe overflow horizontal.
- [ ] Las interacciones del mapa (hover → tooltip, clic → pin, estrella activa) siguen funcionando correctamente.
- [ ] El detector impeccable (`detect --json`) devuelve `[]` sobre los 3 archivos modificados.
- [ ] `npm run build` y `npm run lint` terminan sin errores.

## Decisions

- **Sí:** Atlas de pergamino. La dirección visual hereda la paleta que el mapa ya posee (pergamino, tinta, colores de etapa) y la amplifica en toda la página. Identidad cohesionada sin primitivas nuevas.
- **No:** Pergamino oscuro/nocturno. Requeriría un fondo oscuro y reversión del mapa, perdiendo la coherencia con el arte de Middle Earth (que es claro).
- **Sí:** Mantener Geist Mono como fuente de la página. Es la voz del sistema existente. Mayúsculas + tracking amplio se lee como placa grabada cartográfica, evitando añadir una nueva fuente.
- **No:** Añadir una serif webfont para el título. Bolder dice no añadir primitivas nuevas sin que el usuario las pida; el usuario eligió una paleta (colores), no una tipografía nueva.
- **Sí:** Cinta proporcional a los km. Es una visualización de datos real (no decorativa), hereda el motivo de las polilíneas de etapa del mapa.
- **No:** Sombra offset 8px neobrutalista. El craft-floor lo clasifica como "costume" fuera de mundos neobrutalistas; el atlas pide profundidad suave con desenfoque.
- **Sí:** Placa de leyenda con borde tinta + fondo pergamino-deep. Eco del doble filete que el SVG del mapa ya dibuja en su propio marco (rects a x=14.2 y x=24.5).

## Risks

No hay riesgos relevantes: el cambio es puramente visual en 3 archivos, sin datos nuevos ni dependencias externas. La paleta usa colores que el mapa ya renderiza internamente, por lo que la coherencia está garantizada.

## What is **not** in this spec

- Sistema de zoom/pan para móviles (las waypoints son pequeñas en 390px pero el toque/pin funciona).
- Nueva tipografía serif o display.
- Animaciones en cinta de etapas o leyenda.
- Modificar waypoints, etapas, distancias o el modelo de datos.
- Cambiar el interior del SVG (waypoints, tooltip, estrella, polilíneas, filtros).

Cada uno de esos, si llega, va en su propio spec.
