import { motion } from "framer-motion";

const blobStyle = {
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(120px)",
  opacity: 0.4,
};

function AnimatedBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          ...blobStyle,
          width: 400,
          height: 400,
          background: "#6366f1",
          top: "10%",
          left: "10%",
        }}
        animate={{ x: [0, 100, 0], y: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{
          ...blobStyle,
          width: 500,
          height: 500,
          background: "#22d3ee",
          bottom: "10%",
          right: "10%",
        }}
        animate={{ x: [0, -120, 0], y: [0, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default AnimatedBackground;
