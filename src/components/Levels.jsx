import { IoIosCloseCircle } from "react-icons/io";
import ReactDom from "react-dom";

const Levels = ({ showTooltip, onClose, onPriorityClick, task }) => {
  const priorityLevels = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
  ];

  if (!showTooltip) return null;
  return ReactDom.createPortal(
    <div className="priority-tooltip">
      <IoIosCloseCircle onClick={onClose} className="icon-close-priority" />
      <ul>
        {priorityLevels.map((level) => (
          <li key={level.label}>
            <button
              onClick={() =>
                onPriorityClick(task, level.label, {
                  name: `Priority set/changed to '${level.label}'`,
                })
              }
              className="btn"
            >
              {level.label}
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.getElementById("portal")
  );
};

export default Levels;
