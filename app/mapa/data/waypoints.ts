export type Waypoint = {
  id: string;
  name: string;
  distance: number;
  distanceFromStart: number;
  coordinates: { x: number; y: number };
  stage: number;
};

export type Stage = {
  id: number;
  name: string;
  totalDistance: number;
  color: string;
};

export const stages: Stage[] = [
  { id: 1, name: "La Comarca a Rivendel", totalDistance: 737, color: "#4a7c59" },
  { id: 2, name: "Rivendel a Lothlórien", totalDistance: 743, color: "#7b68ee" },
  { id: 3, name: "Lothlórien a Rauros", totalDistance: 626, color: "#4682b4" },
  { id: 4, name: "Rauros a Cirith Ungol", totalDistance: 624, color: "#8b4513" },
  { id: 5, name: "Cirith Ungol al Monte del Destino", totalDistance: 133, color: "#dc143c" },
];

export const waypoints: Waypoint[] = [
  // Etapa 1: La Comarca a Rivendel (~737 km)
  { id: "bolson-cerrado", name: "Bolsón Cerrado", distance: 32, distanceFromStart: 0, coordinates: { x: 620, y: 595 }, stage: 1 },
  { id: "casa-de-los-gamos", name: "Casa de los Gamos", distance: 35, distanceFromStart: 32, coordinates: { x: 800, y: 700 }, stage: 1 },
  { id: "quebradas-de-los-tumulos", name: "Quebradas de los Túmulos", distance: 24, distanceFromStart: 67, coordinates: { x: 930, y: 680 }, stage: 1 },
  { id: "bree", name: "Bree", distance: 193, distanceFromStart: 91, coordinates: { x: 1015, y: 620 }, stage: 1 },
  { id: "cima-de-los-vientos", name: "Cima de los Vientos", distance: 386, distanceFromStart: 284, coordinates: { x: 1150, y: 580 }, stage: 1 },
  { id: "vado-del-bruinen", name: "Vado del Bruinen", distance: 67, distanceFromStart: 670, coordinates: { x: 1290, y: 590 }, stage: 1 },

  // Etapa 2: Rivendel a Lothlórien (~743 km)
  { id: "rivendel", name: "Rivendel", distance: 480, distanceFromStart: 737, coordinates: { x: 1390, y: 570 }, stage: 2 },
  { id: "pie-paso-redhorn", name: "Pie del Paso de Redhorn (Caradhras)", distance: 80, distanceFromStart: 1217, coordinates: { x: 1280, y: 980 }, stage: 2 },
  { id: "puertas-de-moria", name: "Puertas de Moria", distance: 64, distanceFromStart: 1297, coordinates: { x: 1190, y: 1400 }, stage: 2 },
  { id: "puerta-este-moria", name: "Puerta Este de Moria", distance: 37, distanceFromStart: 1361, coordinates: { x: 1290, y: 1420 }, stage: 2 },
  { id: "frontera-de-lothlorien", name: "Frontera de Lothlórien", distance: 82, distanceFromStart: 1398, coordinates: { x: 1490, y: 1240 }, stage: 2 },

  // Etapa 3: Lothlórien a Rauros (~626 km)
  { id: "caras-galadhon", name: "Caras Galadhon", distance: 16, distanceFromStart: 1480, coordinates: { x: 1475, y: 1170 }, stage: 3 },
  { id: "embarcadero-del-anduin", name: "Embarcadero del Anduin", distance: 578, distanceFromStart: 1496, coordinates: { x: 1680, y: 1150 }, stage: 3 },
  { id: "argonath", name: "Argonath", distance: 32, distanceFromStart: 2074, coordinates: { x: 1940, y: 1530 }, stage: 3 },

  // Etapa 4: Rauros a Cirith Ungol (~624 km)
  { id: "rauros", name: "Cataratas del Rauros", distance: 137, distanceFromStart: 2106, coordinates: { x: 2000, y: 1600 }, stage: 4 },
  { id: "cienagas-de-los-muertos", name: "Ciénagas de los Muertos", distance: 177, distanceFromStart: 2243, coordinates: { x: 2170, y: 1700 }, stage: 4 },
  { id: "morannon", name: "El Morannon (Puerta Negra)", distance: 161, distanceFromStart: 2420, coordinates: { x: 2050, y: 1696 }, stage: 4 },
  { id: "henneth-annun", name: "Henneth Annûn", distance: 80, distanceFromStart: 2581, coordinates: { x: 2100, y: 1860 }, stage: 4 },
  { id: "encrucijada-de-los-caminos", name: "Encrucijada de los Caminos", distance: 19, distanceFromStart: 2661, coordinates: { x: 2210, y: 1970 }, stage: 4 },
  { id: "entrada-valle-morgul", name: "Entrada del Valle de Morgul", distance: 50, distanceFromStart: 2680, coordinates: { x: 2280, y: 2050 }, stage: 4 },

  // Etapa 5: Cirith Ungol al Monte del Destino (~133 km)
  { id: "torre-cirith-ungol", name: "Torre de Cirith Ungol", distance: 48, distanceFromStart: 2730, coordinates: { x: 2460, y: 1900 }, stage: 5 },
  { id: "paso-isenmouthe", name: "Paso de Isenmouthe", distance: 37, distanceFromStart: 2778, coordinates: { x: 2370, y: 1700 }, stage: 5 },
  { id: "meseta-gorgoroth", name: "Meseta de Gorgoroth", distance: 48, distanceFromStart: 2815, coordinates: { x: 2530, y: 1870 }, stage: 5 },
  { id: "monte-destino", name: "Monte del Destino (Orodruin)", distance: 0, distanceFromStart: 2863, coordinates: { x: 2560, y: 1900 }, stage: 5 },
];