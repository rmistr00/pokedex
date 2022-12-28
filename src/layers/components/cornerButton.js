import styled from "styled-components";
import { motion } from "framer-motion";

export const CornerButton = ({ setLayer, layer }) => {
  return (
    <S>
      <div id="circle" className="border" onClick={() => setLayer(layer)}>
        <motion.div
          animate={{
            scale: 2.5,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
      <div id="corner-line" />
    </S>
  );
};

const S = styled.div`
  #circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    margin: 30px;
    box-shadow: var(--inset-shadow);
    background: #2196f3;
    cursor: pointer;

    div {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 50%;
      background: white;
      height: 20px;
      width: 20px;
      box-shadow: var(--shadow);
    }
  }

  #corner-line {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 70px;
    border-radius: 0 30px 0px 0px;
    box-shadow: var(--inset-shadow);
    z-index: -10;
  }
`;
