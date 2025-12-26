import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const MotionDiv = motion.div;

const AnimatePresenceComponent = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <MotionDiv
        key={location.pathname}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
            x: 100,
          },
          animateState: {
            opacity: 1,
            x: 0,
          },
          exitState: {
            opacity: 0,
            x: 100,
          },
        }}
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  );
};

export default AnimatePresenceComponent;
