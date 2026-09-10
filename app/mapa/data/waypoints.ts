export type Waypoint = {
  id: string;
  name: string;
  distance: number;
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
  { id: "bolson-cerrado", name: "Bolsón Cerrado", distance: 32, coordinates: { x: 160, y: 140 }, stage: 1 },
  { id: "casa-de-los-gamos", name: "Casa de los Gamos", distance: 35, coordinates: { x: 210, y: 160 }, stage: 1 },
  { id: "quebradas-de-los-tumulos", name: "Quebradas de los Túmulos", distance: 24, coordinates: { x: 295, y: 185 }, stage: 1 },
  { id: "bree", name: "Bree", distance: 193, coordinates: { x: 365, y: 200 }, stage: 1 },
  { id: "cima-de-los-vientos", name: "Cima de los Vientos", distance: 386, coordinates: { x: 455, y: 225 }, stage: 1 },
  { id: "vado-del-bruinen", name: "Vado del Bruinen", distance: 67, coordinates: { x: 575, y: 250 }, stage: 1 },

  // Etapa 2: Rivendel a Lothlórien (~743 km)
  { id: "rivendel", name: "Rivendel", distance: 480, coordinates: { x: 612, y: 232 }, stage: 2 },
  { id: "pie-paso-redhorn", name: "Pie del Paso de Redhorn (Caradhras)", distance: 80, coordinates: { x: 600, y: 340 }, stage: 2 },
  { id: "puertas-de-moria", name: "Puertas de Moria", distance: 64, coordinates: { x: 545, y: 395 }, stage: 2 },
  { id: "puerta-este-moria", name: "Puerta Este de Moria", distance: 37, coordinates: { x: 655, y: 385 }, stage: 2 },
  { id: "frontera-de-lothlorien", name: "Frontera de Lothlórien", distance: 82, coordinates: { x: 705, y: 425 }, stage: 2 },

  // Etapa 3: Lothlórien a Rauros (~626 km)
  { id: "caras-galadhon", name: "Caras Galadhon", distance: 16, coordinates: { x: 745, y: 462 }, stage: 3 },
  { id: "embarcadero-del-anduin", name: "Embarcadero del Anduin", distance: 578, coordinates: { x: 760, y: 495 }, stage: 3 },
  { id: "argonath", name: "Argonath", distance: 32, coordinates: { x: 795, y: 630 }, stage: 3 },

  // Etapa 4: Rauros a Cirith Ungol (~624 km)
  { id: "rauros", name: "Cataratas del Rauros", distance: 137, coordinates: { x: 798, y: 690 }, stage: 4 },
  { id: "cienagas-de-los-muertos", name: "Ciénagas de los Muertos", distance: 177, coordinates: { x: 852, y: 705 }, stage: 4 },
  { id: "morannon", name: "El Morannon (Puerta Negra)", distance: 161, coordinates: { x: 905, y: 660 }, stage: 4 },
  { id: "henneth-annun", name: "Henneth Annûn", distance: 80, coordinates: { x: 880, y: 745 }, stage: 4 },
  { id: "encrucijada-de-los-caminos", name: "Encrucijada de los Caminos", distance: 19, coordinates: { x: 850, y: 800 }, stage: 4 },
  { id: "entrada-valle-morgul", name: "Entrada del Valle de Morgul", distance: 50, coordinates: { x: 882, y: 790 }, stage: 4 },

  // Etapa 5: Cirith Ungol al Monte del Destino (~133 km)
  { id: "torre-cirith-ungol", name: "Torre de Cirith Ungol", distance: 48, coordinates: { x: 912, y: 768 }, stage: 5 },
  { id: "paso-isenmouthe", name: "Paso de Isenmouthe", distance: 37, coordinates: { x: 982, y: 700 }, stage: 5 },
  { id: "meseta-gorgoroth", name: "Meseta de Gorgoroth", distance: 48, coordinates: { x: 950, y: 662 }, stage: 5 },
  { id: "monte-destino", name: "Monte del Destino (Orodruin)", distance: 0, coordinates: { x: 975, y: 625 }, stage: 5 },
];