
import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion";
const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if(isInView){
        mainControls.start('visible')
    }
  }, [isInView,mainControls]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={className}
        variants={{
          hidden: { opacity: 0, y: 75 },

          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
