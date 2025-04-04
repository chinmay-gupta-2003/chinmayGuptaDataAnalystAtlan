import { useState } from "react";
import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  PlayIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

import Modal from "components/Modal/Modal";
import styles from "components/Query/Query.module.css";

import { startRecording, stopRecording } from "utils/speechRecognition";
import { getSQLQueryFromGemini } from "utils/getSqlQuery";
import { toast } from "react-toastify";
import { ClipLoader, PulseLoader } from "react-spinners";

function GenerateQueryModal({
  onClick,
  setFindQuery,
  openModalGenerate,
  setOpenModalGenerate,
}) {
  const [query, setQuery] = useState("");
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [active, setActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async () => {
    if (!query.trim()) return toast.error("Whitespaces are not allowed");

    const sqlQuery = await getSQLQueryFromGemini(query, setLoading);

    setGeneratedQuery(sqlQuery);
  };

  const onUseHandler = () => {
    setQuery("");
    setGeneratedQuery("");

    onClick(generatedQuery);
    setFindQuery(generatedQuery);

    setOpenModalGenerate(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClickHandler();
    }
  };

  return (
    <Modal open={openModalGenerate} setOpen={() => setOpenModalGenerate(false)}>
      <div className={styles.modalContainer}>
        <div className={styles.generateInputContainer}>
          <div className={`${styles.input} ${active ? styles.active : ""}`}>
            <SparklesIcon height={18} className={styles.queryIcon} />
            <input
              type="text"
              placeholder="Type a query, or use microphone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
            />
            {isRecording && <PulseLoader size={4} color="red" />}
            <MicrophoneIcon
              height={18}
              className={`${
                isRecording ? styles.recordIcon : styles.queryIcon
              }`}
              onClick={() => {
                if (!isRecording) startRecording(setIsRecording, setQuery);
                else stopRecording(setIsRecording);
              }}
            />
          </div>

          <button
            className={`${styles.btn} ${styles.btnGradient}`}
            onClick={onClickHandler}
            disabled={loading}
          >
            {loading && <ClipLoader size={16} color="#fff" />}
            <PaperAirplaneIcon height={16} />
          </button>
        </div>

        {generatedQuery && (
          <div className={styles.modalQuery} onClick={onUseHandler}>
            <span className={styles.queryGenerated}>{generatedQuery}</span>

            <PlayIcon height={18} className={styles.copyIcon} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default GenerateQueryModal;
