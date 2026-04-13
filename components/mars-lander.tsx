"use client";

import { useEffect, useRef, useState } from "react";

type MissionStatus = "ready" | "running" | "landed" | "crashed";

type MissionSnapshot = {
  fuel: number;
  horizontalSpeed: number;
  verticalSpeed: number;
  angle: number;
  score: number | null;
  status: MissionStatus;
  message: string;
};

type TerrainPoint = {
  x: number;
  y: number;
};

type MissionState = {
  angle: number;
  fuel: number;
  height: number;
  horizontalSpeed: number;
  message: string;
  padWidth: number;
  padX: number;
  score: number | null;
  shipX: number;
  shipY: number;
  status: MissionStatus;
  terrain: TerrainPoint[];
  tick: number;
  verticalSpeed: number;
  width: number;
};

type ControlsState = {
  left: boolean;
  right: boolean;
  thrust: boolean;
};

const SHIP_HALF_WIDTH = 11;
const SHIP_HALF_HEIGHT = 15;
const GRAVITY = 0.026;
const THRUST = 0.052;
const ROTATION_SPEED = 0.036;
const MAX_LANDING_VERTICAL_SPEED = 1.28;
const MAX_LANDING_HORIZONTAL_SPEED = 0.62;
const MAX_LANDING_ANGLE = 0.22;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function generateTerrain(width: number, height: number, padX: number, padWidth: number) {
  const baseY = height * 0.8;
  const points: TerrainPoint[] = [];
  const segments = 9;

  for (let index = 0; index <= segments; index += 1) {
    const x = (width / segments) * index;
    const wobble = Math.sin(index * 1.7) * 20 + Math.cos(index * 0.85) * 14;
    points.push({
      x,
      y: clamp(baseY + wobble, height * 0.64, height * 0.86),
    });
  }

  points.push({ x: padX, y: baseY - 2 });
  points.push({ x: padX + padWidth, y: baseY - 2 });

  return points.sort((left, right) => left.x - right.x);
}

function surfaceYAt(terrain: TerrainPoint[], x: number) {
  for (let index = 0; index < terrain.length - 1; index += 1) {
    const start = terrain[index];
    const end = terrain[index + 1];

    if (x >= start.x && x <= end.x) {
      if (end.x === start.x) {
        return end.y;
      }

      const progress = (x - start.x) / (end.x - start.x);
      return lerp(start.y, end.y, progress);
    }
  }

  return terrain[terrain.length - 1]?.y ?? 0;
}

function createMission(width: number, height: number): MissionState {
  const padWidth = Math.max(82, width * 0.18);
  const padX = clamp(width * (0.22 + Math.random() * 0.5), 28, width - padWidth - 28);

  return {
    angle: (Math.random() - 0.5) * 0.3,
    fuel: 100,
    height,
    horizontalSpeed: (Math.random() - 0.5) * 0.4,
    message: "Stabilize and land inside the illuminated pad.",
    padWidth,
    padX,
    score: null,
    shipX: width * 0.32,
    shipY: height * 0.14,
    status: "ready",
    terrain: generateTerrain(width, height, padX, padWidth),
    tick: 0,
    verticalSpeed: 0.1,
    width,
  };
}

function missionToSnapshot(mission: MissionState): MissionSnapshot {
  return {
    angle: Math.round((mission.angle * 180) / Math.PI),
    fuel: Math.max(0, Math.round(mission.fuel)),
    horizontalSpeed: Number(Math.abs(mission.horizontalSpeed).toFixed(2)),
    verticalSpeed: Number(Math.abs(mission.verticalSpeed).toFixed(2)),
    score: mission.score,
    status: mission.status,
    message: mission.message,
  };
}

function drawMission(
  context: CanvasRenderingContext2D,
  mission: MissionState,
  controls: ControlsState
) {
  const { width, height } = mission;

  context.clearRect(0, 0, width, height);

  const sky = context.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#120d0f");
  sky.addColorStop(0.45, "#52211f");
  sky.addColorStop(1, "#8f4b2a");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  context.globalAlpha = 0.24;
  for (let index = 0; index < 22; index += 1) {
    const x = ((index * 47) % width) + ((mission.tick * 0.03) % 13);
    const y = (index * 29) % (height * 0.56);
    context.fillStyle = index % 5 === 0 ? "#fff2d6" : "#f3cdb2";
    context.beginPath();
    context.arc(x % width, y, index % 3 === 0 ? 1.5 : 1, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;

  const haze = context.createRadialGradient(width * 0.72, height * 0.18, 12, width * 0.72, height * 0.18, width * 0.42);
  haze.addColorStop(0, "rgba(255,196,138,0.28)");
  haze.addColorStop(1, "rgba(255,196,138,0)");
  context.fillStyle = haze;
  context.fillRect(0, 0, width, height);

  context.beginPath();
  context.moveTo(0, height);
  for (const point of mission.terrain) {
    context.lineTo(point.x, point.y);
  }
  context.lineTo(width, height);
  context.closePath();
  const ground = context.createLinearGradient(0, height * 0.62, 0, height);
  ground.addColorStop(0, "#6c331f");
  ground.addColorStop(1, "#31140f");
  context.fillStyle = ground;
  context.fill();

  context.strokeStyle = "#f3b378";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(mission.padX, surfaceYAt(mission.terrain, mission.padX));
  context.lineTo(mission.padX + mission.padWidth, surfaceYAt(mission.terrain, mission.padX + mission.padWidth));
  context.stroke();

  const beaconPulse = 0.5 + Math.sin(mission.tick * 0.12) * 0.5;
  context.fillStyle = `rgba(255, 207, 145, ${0.14 + beaconPulse * 0.12})`;
  context.fillRect(mission.padX, 0, mission.padWidth, height);

  context.save();
  context.translate(mission.shipX, mission.shipY);
  context.rotate(mission.angle);

  context.fillStyle = "#f4e3d5";
  context.beginPath();
  context.moveTo(0, -SHIP_HALF_HEIGHT);
  context.lineTo(SHIP_HALF_WIDTH, SHIP_HALF_HEIGHT - 4);
  context.lineTo(0, SHIP_HALF_HEIGHT - 9);
  context.lineTo(-SHIP_HALF_WIDTH, SHIP_HALF_HEIGHT - 4);
  context.closePath();
  context.fill();

  context.fillStyle = "#d77756";
  context.fillRect(-5, -2, 10, 17);
  context.strokeStyle = "#552116";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(-10, 10);
  context.lineTo(-16, 17);
  context.moveTo(10, 10);
  context.lineTo(16, 17);
  context.stroke();

  if (controls.thrust && mission.fuel > 0 && mission.status === "running") {
    context.fillStyle = "#ffd78c";
    context.beginPath();
    context.moveTo(-6, SHIP_HALF_HEIGHT - 7);
    context.lineTo(0, SHIP_HALF_HEIGHT + 18 + Math.sin(mission.tick * 0.5) * 5);
    context.lineTo(6, SHIP_HALF_HEIGHT - 7);
    context.closePath();
    context.fill();

    context.fillStyle = "#ff9f4d";
    context.beginPath();
    context.moveTo(-3, SHIP_HALF_HEIGHT - 6);
    context.lineTo(0, SHIP_HALF_HEIGHT + 10 + Math.cos(mission.tick * 0.44) * 3);
    context.lineTo(3, SHIP_HALF_HEIGHT - 6);
    context.closePath();
    context.fill();
  }

  context.restore();
}

export function MarsLander() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<ControlsState>({
    left: false,
    right: false,
    thrust: false,
  });
  const missionRef = useRef<MissionState | null>(null);
  const [snapshot, setSnapshot] = useState<MissionSnapshot>({
    angle: 0,
    fuel: 100,
    horizontalSpeed: 0,
    verticalSpeed: 0,
    score: null,
    status: "ready",
    message: "Tap Begin mission when you're ready.",
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(320, Math.round(bounds.width));
      const height = Math.max(360, Math.round(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const previousMission = missionRef.current;
      const nextMission = createMission(width, height);

      missionRef.current = previousMission
        ? {
            ...nextMission,
            status: previousMission.status === "running" ? "running" : "ready",
          }
        : nextMission;

      setSnapshot(missionToSnapshot(missionRef.current));
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let frameId = 0;
    let lastTimestamp = 0;
    let lastSnapshotTimestamp = 0;

    const render = (timestamp: number) => {
      const mission = missionRef.current;

      if (!mission) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const delta = Math.min(2.2, (timestamp - lastTimestamp) / (1000 / 60));
      lastTimestamp = timestamp;
      mission.tick += delta;

      if (mission.status === "running") {
        if (controlsRef.current.left) {
          mission.angle -= ROTATION_SPEED * delta;
        }

        if (controlsRef.current.right) {
          mission.angle += ROTATION_SPEED * delta;
        }

        mission.angle = clamp(mission.angle, -0.95, 0.95);

        if (controlsRef.current.thrust && mission.fuel > 0) {
          mission.horizontalSpeed += Math.sin(mission.angle) * THRUST * delta;
          mission.verticalSpeed -= Math.cos(mission.angle) * THRUST * delta;
          mission.fuel = Math.max(0, mission.fuel - 0.28 * delta);
        }

        mission.verticalSpeed += GRAVITY * delta;
        mission.shipX += mission.horizontalSpeed * delta * 3.2;
        mission.shipY += mission.verticalSpeed * delta * 3.2;

        if (mission.shipX < SHIP_HALF_WIDTH + 4 || mission.shipX > mission.width - SHIP_HALF_WIDTH - 4) {
          mission.shipX = clamp(mission.shipX, SHIP_HALF_WIDTH + 4, mission.width - SHIP_HALF_WIDTH - 4);
          mission.horizontalSpeed *= -0.32;
        }

        const surfaceY = surfaceYAt(mission.terrain, mission.shipX);
        const shipBottom = mission.shipY + SHIP_HALF_HEIGHT;

        if (shipBottom >= surfaceY) {
          mission.shipY = surfaceY - SHIP_HALF_HEIGHT;

          const insidePad =
            mission.shipX >= mission.padX + 8 && mission.shipX <= mission.padX + mission.padWidth - 8;
          const gentleEnough =
            Math.abs(mission.verticalSpeed) <= MAX_LANDING_VERTICAL_SPEED &&
            Math.abs(mission.horizontalSpeed) <= MAX_LANDING_HORIZONTAL_SPEED &&
            Math.abs(mission.angle) <= MAX_LANDING_ANGLE;

          if (insidePad && gentleEnough) {
            const score =
              Math.round(mission.fuel * 10) +
              Math.round((1.3 - Math.abs(mission.verticalSpeed)) * 120) +
              Math.round((0.7 - Math.abs(mission.horizontalSpeed)) * 90);
            mission.status = "landed";
            mission.score = Math.max(0, score);
            mission.message = "Touchdown confirmed. That was smoother than most real missions.";
            mission.horizontalSpeed = 0;
            mission.verticalSpeed = 0;
            mission.angle *= 0.35;
          } else {
            mission.status = "crashed";
            mission.score = null;
            mission.message = insidePad
              ? "Pad found, but the landing was too hot. Bleed more speed before contact."
              : "You missed the landing zone. Line up the bright pad before touchdown.";
            mission.horizontalSpeed = 0;
            mission.verticalSpeed = 0;
          }
        }
      }

      drawMission(context, mission, controlsRef.current);

      if (timestamp - lastSnapshotTimestamp > 80) {
        setSnapshot(missionToSnapshot(mission));
        lastSnapshotTimestamp = timestamp;
      }

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateControl = (event: KeyboardEvent, active: boolean) => {
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        controlsRef.current.left = active;
      }

      if (event.code === "ArrowRight" || event.code === "KeyD") {
        controlsRef.current.right = active;
      }

      if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
        event.preventDefault();
        controlsRef.current.thrust = active;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => updateControl(event, true);
    const handleKeyUp = (event: KeyboardEvent) => updateControl(event, false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const startMission = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const mission = createMission(bounds.width, bounds.height);
    mission.status = "running";
    mission.message = "Descent started. Keep the ship upright and watch your velocity.";
    missionRef.current = mission;
    setSnapshot(missionToSnapshot(mission));
  };

  const pressControl = (control: keyof ControlsState, active: boolean) => {
    controlsRef.current[control] = active;
  };

  const missionComplete = snapshot.status === "landed" || snapshot.status === "crashed";

  return (
    <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[1.8rem] border border-[#8b5233]/35 bg-[#160d0d] shadow-[0_20px_60px_rgba(40,14,8,0.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#c86f47_0%,rgba(200,111,71,0.16)_24%,transparent_58%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Mars lander mini game"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-3 p-4">
        <div className="rounded-2xl border border-white/10 bg-black/22 px-3 py-2 text-xs tracking-[0.08em] text-[#ffe0c5] uppercase backdrop-blur-sm">
          <div>Fuel {snapshot.fuel}%</div>
          <div>V-Speed {snapshot.verticalSpeed}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/22 px-3 py-2 text-xs tracking-[0.08em] text-[#ffe0c5] uppercase backdrop-blur-sm">
          <div>H-Speed {snapshot.horizontalSpeed}</div>
          <div>Tilt {snapshot.angle}deg</div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 top-20 rounded-3xl border border-white/10 bg-black/22 px-4 py-3 text-sm text-[#ffe7d3] shadow-lg backdrop-blur-sm sm:inset-x-6">
        <div className="font-medium text-[#fff3ea]">
          {snapshot.status === "ready" ? "Mars Lander" : snapshot.status === "running" ? "Mission Live" : snapshot.status === "landed" ? "Successful Landing" : "Crash Report"}
        </div>
        <p className="mt-1 text-[0.92rem] leading-relaxed text-[#ffd8bf]">{snapshot.message}</p>
        {snapshot.score !== null ? <div className="mt-2 text-xs tracking-[0.12em] uppercase text-[#ffcf9d]">Score {snapshot.score}</div> : null}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={startMission}
            className="pointer-events-auto inline-flex h-11 items-center justify-center rounded-full border border-[#f2b07b]/45 bg-[#f0ba8a]/12 px-4 text-sm font-medium text-[#fff2e4] transition hover:bg-[#f0ba8a]/18"
          >
            {missionComplete ? "Retry mission" : snapshot.status === "running" ? "Restart mission" : "Begin mission"}
          </button>
          <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] tracking-[0.1em] text-[#ffcf9d] uppercase">
            Land inside the bright strip
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:hidden">
          <button
            type="button"
            onPointerDown={() => pressControl("left", true)}
            onPointerUp={() => pressControl("left", false)}
            onPointerLeave={() => pressControl("left", false)}
            onPointerCancel={() => pressControl("left", false)}
            className="pointer-events-auto rounded-2xl border border-white/10 bg-black/28 px-3 py-3 text-sm font-medium text-[#ffe9d7]"
          >
            Tilt Left
          </button>
          <button
            type="button"
            onPointerDown={() => pressControl("thrust", true)}
            onPointerUp={() => pressControl("thrust", false)}
            onPointerLeave={() => pressControl("thrust", false)}
            onPointerCancel={() => pressControl("thrust", false)}
            className="pointer-events-auto rounded-2xl border border-[#f2b07b]/45 bg-[#f0ba8a]/16 px-3 py-3 text-sm font-medium text-[#fff1e2]"
          >
            Thrust
          </button>
          <button
            type="button"
            onPointerDown={() => pressControl("right", true)}
            onPointerUp={() => pressControl("right", false)}
            onPointerLeave={() => pressControl("right", false)}
            onPointerCancel={() => pressControl("right", false)}
            className="pointer-events-auto rounded-2xl border border-white/10 bg-black/28 px-3 py-3 text-sm font-medium text-[#ffe9d7]"
          >
            Tilt Right
          </button>
        </div>
      </div>
    </div>
  );
}
