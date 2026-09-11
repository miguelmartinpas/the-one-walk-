"use client";

import { useState } from "react";

import { stages, waypoints, type Waypoint } from "../data/waypoints";

const MAP_WIDTH = 3200;
const MAP_HEIGHT = 2400;
const MAP_SRC = "/mapa/Map_of_Middle-Earth.svg";

function pointsForStage(stageId: number): string {
  const stagePoints = waypoints
    .filter((w) => w.stage === stageId)
    .map((w) => `${w.coordinates.x},${w.coordinates.y}`);

  const nextStagePoint = waypoints.find((w) => w.stage === stageId + 1);
  const next = nextStagePoint
    ? `${nextStagePoint.coordinates.x},${nextStagePoint.coordinates.y}`
    : "";

  return [...stagePoints, next].filter(Boolean).join(" ");
}

export default function MiddleEarthMap() {
  const [hovered, setHovered] = useState<Waypoint | null>(null);

  return (
    <div className="w-full max-w-6xl border-4 border-zinc-800 bg-white p-2 font-mono shadow-[8px_8px_0_0_#1a1c22]">

      <svg
        aria-label="Mapa de la Tierra Media"
        role="img"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="block h-auto w-full"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="4" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffffff" floodOpacity="0.9" />
          </filter>
        </defs>
        <image
          href={MAP_SRC}
          x={0}
          y={0}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
        />
        {stages.map((stage) => (
          <g key={stage.id}>
            <polyline
              points={pointsForStage(stage.id)}
              fill="none"
              stroke="#000000"
              strokeWidth={16}
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#shadow)"
            />
            <polyline
              points={pointsForStage(stage.id)}
              fill="none"
              stroke={stage.color}
              strokeWidth={9}
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#glow)"
            />
          </g>
        ))}
        {waypoints.map((w) => (
          <WaypointMarker key={w.id} waypoint={w} onHover={setHovered} />
        ))}
        {hovered && <WaypointTooltip waypoint={hovered} />}
      </svg>
    </div>
  );
}

function WaypointMarker({
  waypoint,
  onHover,
}: {
  waypoint: Waypoint;
  onHover: (w: Waypoint | null) => void;
}) {
  const { x, y } = waypoint.coordinates;
  const radius = 22;

  return (
    <g
      onMouseEnter={() => onHover(waypoint)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      <circle
        cx={x}
        cy={y}
        r={radius + 6}
        fill="#000000"
        filter="url(#shadow)"
      />
      <circle
        cx={x}
        cy={y}
        r={radius + 3}
        fill="#ffffff"
        filter="url(#glow)"
      />
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={stages.find((s) => s.id === waypoint.stage)?.color ?? "#f5e9c9"}
        stroke="#000000"
        strokeWidth={4}
      />
    </g>
  );
}

function WaypointTooltip({ waypoint }: { waypoint: Waypoint }) {
  const stage = stages.find((s) => s.id === waypoint.stage);
  const { x, y } = waypoint.coordinates;

  const prevWaypoint = waypoints.find((w) => w.id === waypoint.id && w.stage === waypoint.stage && w.distanceFromStart < waypoint.distanceFromStart)
    ?? waypoints.filter((w) => w.distanceFromStart < waypoint.distanceFromStart).pop();
  const distanceFromPrev = prevWaypoint ? waypoint.distanceFromStart - prevWaypoint.distanceFromStart : 0;

  const eta = waypoint.distance > 0 ? `${waypoint.distance} km al siguiente` : "Fin de la ruta";
  const accumulated = waypoint.distanceFromStart === 0 ? "Inicio" : `${waypoint.distanceFromStart} km desde el inicio`;
  const fromPrev = waypoint.distanceFromStart === 0 ? "" : `${distanceFromPrev} km desde el punto previo`;

  const tipWidth = Math.max(waypoint.name.length, eta.length, accumulated.length, fromPrev.length) * 30 + 96;
  const tipHeight = fromPrev ? 264 : 216;
  const tipY = y - tipHeight - 96;
  const tipX = Math.min(Math.max(x - tipWidth / 2, 8), MAP_WIDTH - tipWidth - 8);

  return (
    <g pointerEvents="none">
      <line
        x1={x}
        y1={y - 48}
        x2={x}
        y2={y - 96}
        stroke="#3a3224"
        strokeWidth={12}
      />
      <rect
        x={tipX}
        y={tipY}
        width={tipWidth}
        height={tipHeight}
        fill="#1c1f26"
        stroke="#f5e9c9"
        strokeWidth={9}
        rx={12}
      />
      <text x={tipX + 48} y={tipY + 72} fill={stage?.color ?? "#fff"} fontSize={54} fontWeight="bold">
        {waypoint.name}
      </text>
      <text x={tipX + 48} y={tipY + 138} fill="#f5e9c9" fontSize={48}>
        {eta}
      </text>
      <text x={tipX + 48} y={tipY + 198} fill="#f5e9c9" fontSize={48}>
        {accumulated}
      </text>
      {fromPrev && (
        <text x={tipX + 48} y={tipY + 258} fill="#f5e9c9" fontSize={48}>
          {fromPrev}
        </text>
      )}
    </g>
  );
}