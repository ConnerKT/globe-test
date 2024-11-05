import { motion } from 'framer-motion';

export const LoadingScreen = ({ setLoading }: { setLoading: (value: boolean) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 2.5 }}
      onAnimationComplete={() => setLoading(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
        }}
        className="h-1 bg-white"
        onAnimationComplete={() => {
          setTimeout(() => setLoading(false), 500);
        }}
      />
    </motion.div>
  );
};