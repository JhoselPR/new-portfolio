import { motion } from "framer-motion";

export default function Section({ id, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="scroll-mt-28 min-h-screen"
    >
      {children}
    </motion.section>
  );
}