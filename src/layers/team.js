import { motion } from "framer-motion";

function Team({ setLayer }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="Team">
      <button
        onClick={() => {
          setLayer("home");
        }}
      >
        home
      </button>
      <div>profile</div>
      <div>team</div>
      <div>battle</div>
    </motion.div>
  );
}

export default Team;