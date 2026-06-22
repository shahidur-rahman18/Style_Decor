import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion";

const RevealArise = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 40,          // ⬇ start slightly below
          },
          visible: {
            opacity: 1,
            y: 0,           // ⬆ rise to natural position
          },
        }}
        initial="hidden"
        animate={controls}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealArise;
