import { useEffect, useRef } from "react";

// Single clip (vector-walkoff.mp4): Vector is already standing, resumes his
// walk, stops midway, glances at the camera, then continues off-frame. A
// side-by-side color+coverage matte (tools/bake-matte.py --mode green),
// un-matted here with the same canvas+WebGL pass buzzgtm uses (CPU fallback
// if no WebGL). Dropped the separate walk-in clip entirely — handing off
// between two independently-generated clips left a visible pop at the seam,
// read as two different characters rather than one continuous performance.

const SRC = "/vector/vector-walkoff.mp4";

const CFG = {
  clipWidthFrac: 0.92,
  floorYFrac: 0.86,
  clipXFrac: 0.02,
  feet: { y: 0.98 },
};

const VERT =
  "attribute vec2 p;varying vec2 uv;" +
  "void main(){uv=vec2(p.x*0.5+0.5,0.5-p.y*0.5);gl_Position=vec4(p,0.0,1.0);}";

const FRAG =
  "precision mediump float;varying vec2 uv;uniform sampler2D t;" +
  "void main(){" +
  "vec3 c=texture2D(t,vec2(uv.x*0.5,uv.y)).rgb;" +
  "float a=texture2D(t,vec2(0.5+uv.x*0.5,uv.y)).r;" +
  "gl_FragColor=vec4(c,a);}";

interface VectorWalkProps {
  onComplete?: () => void;
}

export default function VectorWalk({ onComplete }: VectorWalkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!container || !video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buf = document.createElement("canvas");
    let gl: WebGLRenderingContext | null = null;
    let glTex: WebGLTexture | null = null;
    let bufCtx: CanvasRenderingContext2D | null = null;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let rafId = 0;
    let done = false;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onEnded = () => onCompleteRef.current?.();
    video.addEventListener("ended", onEnded);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = container!.clientWidth;
      H = container!.clientHeight;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function compile(type: number, srcText: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, srcText);
      gl!.compileShader(s);
      return gl!.getShaderParameter(s, gl!.COMPILE_STATUS) ? s : null;
    }

    function initGL() {
      gl = buf.getContext("webgl", {
        premultipliedAlpha: true,
        alpha: true,
        antialias: false,
        depth: false,
      });
      if (!gl) return false;

      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) {
        gl = null;
        return false;
      }

      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl = null;
        return false;
      }
      gl.useProgram(prog);

      const quad = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      glTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, glTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.clearColor(0, 0, 0, 0);
      return true;
    }

    function compositeCPU(half: number, vh: number) {
      if (!bufCtx) bufCtx = buf.getContext("2d", { willReadFrequently: true });
      bufCtx!.clearRect(0, 0, half, vh);
      bufCtx!.drawImage(video!, 0, 0, half, vh, 0, 0, half, vh);
      const img = bufCtx!.getImageData(0, 0, half, vh);
      const m = document.createElement("canvas");
      m.width = half;
      m.height = vh;
      const mc = m.getContext("2d", { willReadFrequently: true })!;
      mc.drawImage(video!, half, 0, half, vh, 0, 0, half, vh);
      const md = mc.getImageData(0, 0, half, vh).data;
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) d[i + 3] = md[i];
      bufCtx!.putImageData(img, 0, 0);
    }

    function compositeVector() {
      const vw = video!.videoWidth;
      const vh = video!.videoHeight;
      if (!vw || video!.readyState < 2) return null;

      const half = vw / 2;
      if (buf.width !== half || buf.height !== vh) {
        buf.width = half;
        buf.height = vh;
        if (gl) gl.viewport(0, 0, half, vh);
      }

      if (gl) {
        gl.bindTexture(gl.TEXTURE_2D, glTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video!);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      } else {
        compositeCPU(half, vh);
      }
      return { w: half, h: vh };
    }

    function clipBox() {
      const w = W * CFG.clipWidthFrac;
      const vw = video!.videoWidth ? video!.videoWidth / 2 : 1470;
      const vh = video!.videoHeight || 630;
      const h = w * (vh / vw);
      return {
        x: W * CFG.clipXFrac,
        y: H * CFG.floorYFrac - h * CFG.feet.y,
        w,
        h,
      };
    }

    function frame() {
      rafId = requestAnimationFrame(frame);
      if (!W || done) return;

      ctx!.clearRect(0, 0, W, H);

      const got = compositeVector();
      if (got) {
        const box = clipBox();
        ctx!.drawImage(buf, 0, 0, got.w, got.h, box.x, box.y, box.w, box.h);
      }

      if (video!.ended) {
        done = true;
        ctx!.clearRect(0, 0, W, H);
      }
    }

    function start() {
      const onReady = () => {
        video!.removeEventListener("canplay", onReady);
        video!.play().catch(() => {});
      };
      video!.addEventListener("canplay", onReady);
      if (video!.readyState >= 3) video!.play().catch(() => {});
    }

    resize();
    initGL();
    window.addEventListener("resize", resize);

    let io: IntersectionObserver | null = null;
    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                start();
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );
        io.observe(container);
      } else {
        start();
      }
    } else {
      onCompleteRef.current?.();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      video.removeEventListener("ended", onEnded);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 7", minHeight: 220 }}
    >
      <video
        ref={videoRef}
        src={SRC}
        muted
        playsInline
        preload="auto"
        className="absolute h-px w-px opacity-0 pointer-events-none"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />
    </div>
  );
}
