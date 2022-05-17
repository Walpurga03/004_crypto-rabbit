
import "../styles/button.css"
const SelectButton = ({ children, selected, onClick }) => {
  return (
            <span onClick={onClick} className="selectButton">
                {children}
            </span>
  );
};

export default SelectButton;