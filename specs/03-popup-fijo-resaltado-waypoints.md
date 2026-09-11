# SPEC 03 — Popup fijo en la esquina y resaltado del waypoint activo

> **Status:** Implemented
> **Depends on:** SPEC 02
> **Date:** 2026-09-11
> **Objective:** Mostrar el popup de cada waypoint siempre fijo en la esquina superior derecha del mapa y resaltar el waypoint activo, con apertura por hover (se cierra al retirar el ratón) o por clic (permanece abierto hasta la siguiente interacción).

## Scope

**In:**

- Popup con posición **fija en la esquina superior derecha** del SVG del mapa (misma posición para todos los waypoints), en lugar de la posición actual junto al punto.
- Eliminar la línea conectora vertical que une el punto con el popup.
- **Resaltado del waypoint activo**: aumentar ligeramente el radio del punto y añadir un anillo/glow alrededor.
- **Dos modos de apertura del popup:**
  - **Hover:** se abre al pasar el ratón sobre el waypoint y se cierra al retirarlo.
  - **Clic/tap:** fija el popup abierto; permanece hasta que se haga clic o hover sobre otro waypoint o sobre el mismo (el clic sobre el punto ya fijado lo cierra, y cualquier interacción posterior cancela el fijado).
- En táctil, el toque actúa como clic.
- Contenido del popup sin cambios (nombre, distancia al siguiente, acumulada desde el inicio y desde el punto previo).

**Out of scope (for future specs):**

- Cambiar el contenido o el diseño interno de la tarjeta del popup (colores, textos, cierre manual con botón X).
- Panel lateral o detalle de etapa.
- Animación del popup (entrada/salida).
- Modificar waypoints, etapas o distancias.

## Data model

Se omite: no se introduce ninguna estructura de datos nueva. El modelo existente (`Waypoint`, `Stage`, `waypoints`, `stages`) queda intacto. El cambio es 100 % de estado de UI dentro de `MiddleEarthMap.tsx`:

- `hovered: Waypoint | null` — punto bajo el ratón (efímero).
- `pinned: Waypoint | null` — punto fijado por clic.
- Popup visible = `hovered ?? pinned`; resaltado aplica al punto que esté mostrando el popup.

## Implementation plan

1. Sustituir el estado `hovered` de `MiddleEarthMap.tsx` por dos estados: `hovered` (efímero) y `pinned` (fijado por clic). Manual: la página sigue compilando y el hover funciona como antes.
2. Modificar `WaypointMarker` para recibir las props de interacción: `onHover`, `onLeave` y `onClick`, y una flag `isActive`. `onMouseEnter` → marco `hovered` y cancelo `pinned`; `onMouseLeave` → limpio `hovered`; `onClick` → si el punto ya está `pinned`, lo desfijo; si no, lo fijo (y limpio `hovered`). Manual: el clic fija y el hover sigue cerrando al salir.
3. Añadir el **resaltado** en `WaypointMarker`: cuando `isActive`, aumentar el radio del anillo exterior y añadir un halo (círculo adicional tipo glow con el color de la etapa). Manual: al pasar el ratón o fijar un punto, se ve resaltado.
4. Reubicar `WaypointTooltip` en la **esquina superior derecha**: calcular `tipX`/`tipY` fijos de la esquina (en el viewBox 3200×2400), eliminando el cálculo centrado sobre el punto y la línea conectora vertical; mantener `pointerEvents="none"` y el tamaño/posición del contenedor con márgenes. Manual: el popup de cualquier waypoint aparece arriba a la derecha, sin línea conectora.
5. Renderizar el popup de `hovered ?? pinned` (en ese orden de prioridad) y el resaltado acorde. Manual: con un clic el popup queda fijo hasta la siguiente interacción; con hover se abre/cierra.
6. Revisión visual: hover y clic en varios waypoints (incluido Bolsón Cerrado y Monte del Destino), comportamiento con punto fijado y hover sobre otro, y vista táctil simulada.

## Acceptance criteria

- [ ] La página `/mapa` carga sin errores en consola.
- [ ] El popup de cualquier waypoint aparece siempre fijo en la esquina superior derecha del mapa (misma posición para los 24).
- [ ] La línea conectora vertical entre el punto y el popup ya no existe.
- [ ] Al pasar el ratón por un waypoint se abre el popup y el punto se resalta (radio aumentado + halo/Calibri around the point).
- [ ] Al retirar el ratón, el popup desaparece y el punto vuelve al estado normal (solo si no hay nada fijado).
- [ ] Al hacer clic en un waypoint, el popup se fija permanentemente.
- [ ] Con un punto fijado, hacer clic en otro punto fija el nuevo y cierra el anterior.
- [ ] Con un punto fijado, hacer clic en el mismo lo desfija (toggle).
- [ ] Con un punto fijado, hacer hover sobre otro punto cierra el fijado y abre el popup del hover.
- [ ] Al retirar el ratón tras el hover anterior, el popup desaparece (no regresa el fijado).
- [ ] En entorno táctil, un toque en un waypoint fija el popup (misma lógica que clic).
- [ ] El contenido del popup es el mismo (nombre, distancia al siguiente, acumulada desde el inicio y desde el punto previo).
- [ ] `npm run build` y `npm run lint` terminan sin errores.

## Decisions

- **Sí:** Popup fijo en la esquina superior derecha del mapa. Evita que tape la ruta central, es consistente independientemente de dónde esté el waypoint y es sencillo de implementar (posición constante en el viewBox).
- **No:** Popup flotante cerca del punto con restricción de caja. Más complejo (cálculo de bounds) y más inconsistente entre waypoints con y sin espacio libre arriba.
- **No:** Línea conectora. Con la posición fija sobra, entorpece la legibilidad visualmente y compleja el posicionamiento.
- **Sí:** Anillo/glow para resaltar el punto activo. Suficiente para distinguir el punto sin ser invasivo ni consumir recursos extra.
- **No:** Atenuar los demás puntos (fade). Más trabajo, menos intuitivo y con riesgo de que la ruta completa se vea apagada.
- **Sí:** `hovered` + `pinned` como dos estados separados. Implementa limpiamente las dos fuentes de interacción (hover y clic) con prioridad clara (`hovered ?? pinned`).
- **No:** Estado único `active` con campo `mode`. Más confuso al rastrear si un punto se cerró por hover o por clic, y complicaría la lógica de cancelación.
- **Sí:** Hover cancela el `pinned` (`hovered` tiene prioridad total). Interacción natural: lo que hago ahora es lo que veo, sin popup fantasma.
- **No:** `pinned` persiste bajo el hover y reaparece al salir. Provoca un popup que aparece/desaparece sin interacción clara del usuario.
- **Sí:** Toggle de `pinned` al hacer clic en el mismo punto. Interacción estándar de los popups y lo que el usuario pidió.
- **Sí:** Quick definition sin más preguntas. Feature de comportamiento bien definida, interacción clara, sin áreas abiertas.

## Risks

| Riesgo | Mitigación |
| ------ | ---------- |
| Popup fijo en la esquina derecha puede recortarse o ser muy ancho para nombres largos (p. ej., "Encrucijada de los Caminos"). | `tipX` se clampa a `MAP_WIDTH - tipWidth - 8` como ya se hacía; el popup escala proporcionalmente con el viewBox. Verificar visualmente el paso 6. |
| En pantallas muy estrechas, el popup fijo queda en la zona de地图右上角, pero al hacer zoom el contenido del SVG se mantiene legible. | El SVG es responsive por naturaleza (viewBox escala proporcionalmente); el popup no excede el área visible. |
