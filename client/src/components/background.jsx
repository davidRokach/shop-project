import React, { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const Background = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const app = new Application(canvas);
    appRef.current = app;
    app.load("https://prod.spline.design/fsP9JjCdDtxNdp3L/scene.splinecode");

    return () => {
      // Clean up resources if necessary
      if (appRef.current && typeof appRef.current.destroy === "function") {
        appRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef} id="canvas3d" />;
};

export default Background;
