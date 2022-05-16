import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
      <Box sx={{
        border: "1px solid gold",
        borderRadius: 5,
        p: 10,
        pl: 20,
        pr: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "2%",
      }}>
            <span onClick={onClick} >
                {children}
            </span>
      </Box>
   
  );
};

export default SelectButton;