import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion";

const RevealLeftToRight = ({ children }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -75 },   // ⬅ starts from the LEFT
          visible: { opacity: 1, x: 0 },     // ➡ slides to original position
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: 0.4 }} // adjust delay if needed
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealLeftToRight;
