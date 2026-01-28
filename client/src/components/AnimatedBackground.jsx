import { motion } from "framer-motion";

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Blob 1: Indigo (Top Left) */}
      <motion.div
        className="absolute top-[5%] left-[5%] w-[450px] h-[450px] rounded-full bg-indigo-500 opacity-35 blur-[100px]"
        animate={{ x: [0, 120, 0], y: [0, 100, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blob 2: Cyan (Bottom Right) */}
      <motion.div
        className="absolute bottom-[5%] right-[5%] w-[550px] h-[550px] rounded-full bg-cyan-400 opacity-35 blur-[100px]"
        animate={{ x: [0, -140, 0], y: [0, -120, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blob 3: Purple (Bottom Left) */}
      <motion.div
        className="absolute bottom-[20%] left-[15%] w-[350px] h-[350px] rounded-full bg-purple-500 opacity-35 blur-[100px]"
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default AnimatedBackground;