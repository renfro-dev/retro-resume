import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Point = { x: number; y: number };
type Pose = { left: number; top: number; rotate: number };

const PAIRS = [
  "Revenue Operator",      // Top of pyramid
  "Context Orchestrator",  // Middle left
  "GTM Strategist",        // Middle right
  "Frontier Researcher",   // Bottom left
  "Neo-Engineer",          // Bottom center
  "Growth Hacker",         // Bottom right
];

function regularPolygonVertices(sides: number, radiusPct = 40, startRotationDeg = -90): Point[] {
  const verts: Point[] = [];
  for (let i = 0; i < sides; i++) {
    const ang = ((i / sides) * 360 + startRotationDeg) * (Math.PI / 180);
    verts.push({ x: 50 + radiusPct * Math.cos(ang), y: 50 + radiusPct * Math.sin(ang) });
  }
  return verts;
}

function lerp(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function edgeAngleDeg(a: Point, b: Point): number {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

function layoutLines(): Pose[] {
  const poses: Pose[] = [];
  const startTop = 20;
  const step = 12;
  for (let i = 0; i < PAIRS.length; i++) {
    poses.push({ left: 50, top: startTop + i * step, rotate: 0 });
  }
  return poses;
}

function layoutPyramid(): Pose[] {
  const poses: Pose[] = [];
  const verticalSpacing = 15; // Space between rows
  const horizontalSpacing = 20; // Space between items in a row

  // Top row: 1 label (Revenue Operator)
  poses.push({ left: 50, top: 25, rotate: 0 });

  // Middle row: 2 labels
  poses.push({ left: 50 - horizontalSpacing / 2, top: 25 + verticalSpacing, rotate: 0 });
  poses.push({ left: 50 + horizontalSpacing / 2, top: 25 + verticalSpacing, rotate: 0 });

  // Bottom row: 3 labels
  poses.push({ left: 50 - horizontalSpacing, top: 25 + verticalSpacing * 2, rotate: 0 });
  poses.push({ left: 50, top: 25 + verticalSpacing * 2, rotate: 0 });
  poses.push({ left: 50 + horizontalSpacing, top: 25 + verticalSpacing * 2, rotate: 0 });

  return poses;
}

function layoutSquare(): Pose[] {
  const verts = regularPolygonVertices(4, 42);
  const edges: [Point, Point][] = [
    [verts[0], verts[1]],
    [verts[1], verts[2]],
    [verts[2], verts[3]],
    [verts[3], verts[0]],
  ];
  const edgeSlots = [[1 / 3, 2 / 3], [1 / 3, 2 / 3], [0.5], [0.5]]; // 2,2,1,1 = 6 labels
  const poses: Pose[] = [];
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    const ang = edgeAngleDeg(a, b);
    for (const t of edgeSlots[i]) {
      const p = lerp(a, b, t);
      poses.push({ left: p.x, top: p.y, rotate: ang });
    }
  }
  return poses;
}

function layoutHexagon(): Pose[] {
  const verts = regularPolygonVertices(6, 42);
  const poses: Pose[] = [];
  for (let i = 0; i < 6; i++) {
    const a = verts[i];
    const b = verts[(i + 1) % 6];
    const p = lerp(a, b, 0.5);
    const ang = edgeAngleDeg(a, b);
    poses.push({ left: p.x, top: p.y, rotate: ang });
  }
  return poses;
}

function layoutCircle(): Pose[] {
  const poses: Pose[] = [];
  const radius = 42;
  for (let i = 0; i < PAIRS.length; i++) {
    const angle = ((i / PAIRS.length) * 360 - 90) * (Math.PI / 180);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    const tangentAngle = ((i / PAIRS.length) * 360) % 360;
    poses.push({ left: x, top: y, rotate: tangentAngle });
  }
  return poses;
}

function layoutStar(): Pose[] {
  const poses: Pose[] = [];
  const outerRadius = 42;
  const innerRadius = 18;

  // Create 5-pointed star with labels at outer points and between
  for (let i = 0; i < PAIRS.length; i++) {
    const angle = ((i / PAIRS.length) * 360 - 90) * (Math.PI / 180);
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    poses.push({ left: x, top: y, rotate: 0 });
  }
  return poses;
}

function layoutInfinity(): Pose[] {
  const poses: Pose[] = [];
  const scale = 25;

  for (let i = 0; i < PAIRS.length; i++) {
    const t = (i / PAIRS.length) * 2 * Math.PI;
    // Lemniscate of Bernoulli formula
    const denom = 1 + Math.sin(t) ** 2;
    const x = 50 + (scale * Math.cos(t)) / denom;
    const y = 50 + (scale * Math.sin(t) * Math.cos(t)) / denom;
    const tangentAngle = Math.atan2(
      (Math.cos(t) ** 2 - Math.sin(t) ** 2) / denom,
      -(Math.sin(t) * (2 + Math.sin(t) ** 2)) / denom ** 2
    ) * (180 / Math.PI);
    poses.push({ left: x, top: y, rotate: tangentAngle });
  }
  return poses;
}

function layoutSpiral(): Pose[] {
  const poses: Pose[] = [];
  const maxRadius = 40;

  for (let i = 0; i < PAIRS.length; i++) {
    const t = i / (PAIRS.length - 1);
    const angle = t * 3 * Math.PI; // 1.5 rotations
    const radius = t * maxRadius;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    poses.push({ left: x, top: y, rotate: (angle * 180) / Math.PI + 90 });
  }
  return poses;
}

function layoutWave(): Pose[] {
  const poses: Pose[] = [];
  const amplitude = 20;
  const frequency = 2;

  for (let i = 0; i < PAIRS.length; i++) {
    const t = i / (PAIRS.length - 1);
    const x = 20 + t * 60;
    const y = 50 + amplitude * Math.sin(t * frequency * Math.PI);
    const tangentAngle = Math.atan2(
      amplitude * frequency * Math.PI * Math.cos(t * frequency * Math.PI),
      60
    ) * (180 / Math.PI);
    poses.push({ left: x, top: y, rotate: tangentAngle });
  }
  return poses;
}

function layoutStickFigure(walkProgress: number): Pose[] {
  const poses: Pose[] = [];
  const centerX = 30 + (walkProgress * 40); // Walk from left to right
  const centerY = 50;

  // Walking animation parameters - more fervent
  const walkCycle = Math.sin(walkProgress * Math.PI * 12); // 6 full steps for faster walking
  const legSwing = 50; // Increased rotation for more dramatic leg movement
  const armSwing = 15;

  // Head - "Revenue Operator" - hover above torso with clear gap
  poses.push({
    left: centerX,
    top: centerY - 25,
    rotate: 0
  });

  // Torso/Body - "Context Orchestrator"
  poses.push({
    left: centerX,
    top: centerY - 5,
    rotate: 90
  });

  // Left Arm - "GTM Strategist"
  poses.push({
    left: centerX - 12,
    top: centerY - 8 + (armSwing * walkCycle),
    rotate: -30 + (walkCycle * 20)
  });

  // Right Arm - "Frontier Researcher"
  poses.push({
    left: centerX + 12,
    top: centerY - 8 - (armSwing * walkCycle),
    rotate: 30 - (walkCycle * 20)
  });

  // Left Leg - "Neo-Engineer" - stays connected to torso vertically
  poses.push({
    left: centerX - 8,
    top: centerY + 15,
    rotate: 90 + (walkCycle * legSwing)
  });

  // Right Leg - "Growth Hacker" - stays connected to torso vertically
  poses.push({
    left: centerX + 8,
    top: centerY + 15,
    rotate: 90 - (walkCycle * legSwing)
  });

  return poses;
}

const SHAPES = [layoutLines, layoutPyramid];

export default function WordShapeMorph() {
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % SHAPES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const poses = useMemo(() => SHAPES[shapeIndex](), [shapeIndex]);

  return (
    <div className="relative mx-auto w-full max-w-3xl h-[320px] sm:h-[400px]">
      {PAIRS.map((label, i) => {
        const p = poses[i];
        return (
          <motion.div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ left: `${p.left}%`, top: `${p.top}%`, rotate: p.rotate }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <div className="px-3 py-1 rounded border border-[var(--terminal-green)] bg-black/50 text-[var(--terminal-green)] text-sm sm:text-base whitespace-nowrap drop-shadow-glow">
              {label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
