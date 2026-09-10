"use client";

import { useState } from "react";

import { stages, waypoints, type Waypoint } from "../data/waypoints";
import MapBackground from "./MapBackground";

function pointsForStage(stageId: number): string {
  const stagePoints = waypoints
    .filter((w) => w.stage === stageId)
    .map((w) => `${w.coordinates.x},${w.coordinates.y}`);

  const nextStagePoint = waypoints.find((w) => w.stage === stageId + 1);
  const next = nextStagePoint ? `${nextStagePoint.coordinates.x},${nextStagePoint.coordinates.y}` : "";

  return [...stagePoints, next].filter(Boolean).join(" ");
}

export default function MiddleEarthMap() {
  const [hovered, setHovered] = useState<Waypoint | null>(null);

  return (
    <div className="w-full max-w-6xl border-4 border-zinc-800 bg-[#2a2f3a] p-2 font-mono shadow-[8px_8px_0_0_#1a1c22]">

      <svg
        aria-label="Mapa de la Tierra Media"
        role="img"
        viewBox="0 0 1200 900"
        className="block h-auto w-full bg-[#e8dcc0]"
      >
        <MapBackground />
        {stages.map((stage) => (
          <polyline
            key={stage.id}
            points={pointsForStage(stage.id)}
            fill="none"
            stroke={stage.color}
            strokeWidth={6}
            strokeLinejoin="miter"
            strokeLinecap="square"
            opacity={0.85}
            shapeRendering="crispEdges"
          />
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
  return (
    <g
      onMouseEnter={() => onHover(waypoint)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      <rect
        x={waypoint.coordinates.x - 8}
        y={waypoint.coordinates.y - 8}
        width={16}
        height={16}
        fill="#f5e9c9"
        stroke="#3a3224"
        strokeWidth={3}
        shapeRendering="crispEdges"
      />
    </g>
  );
}

function WaypointTooltip({ waypoint }: { waypoint: Waypoint }) {
  const stage = stages.find((s) => s.id === waypoint.stage);
  const { x, y } = waypoint.coordinates;

  const eta = waypoint.distance > 0 ? `${waypoint.distance} km` : "Fin de la ruta";

  const tipWidth = Math.max(waypoint.name.length, eta.length) * 9 + 24;
  const tipHeight = 52;
  const tipY = y - tipHeight - 28;
  const tipX = Math.min(Math.max(x - tipWidth / 2, 8), 1200 - tipWidth - 8);

  return (
    <g pointerEvents="none">
      <line
        x1={x}
        y1={y - 12}
        x2={x}
        y2={y - 24}
        stroke="#3a3224"
        strokeWidth={3}
        shapeRendering="crispEdges"
      />
      <rect
        x={tipX}
        y={tipY}
        width={tipWidth}
        height={tipHeight}
        fill="#1c1f26"
        stroke="#f5e9c9"
        strokeWidth={2}
        rx={2}
      />
      <text x={tipX + 12} y={tipY + 18} fill={stage?.color ?? "#fff"} fontSize={16} fontWeight="bold">
        {waypoint.name}
      </text>
      <text x={tipX + 12} y={tipY + 40} fill="#f5e9c9" fontSize={14}>
        {eta}
      </text>
    </g>
  );
}