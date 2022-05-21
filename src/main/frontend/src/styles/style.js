import { hover } from "@testing-library/user-event/dist/hover";

const blue = "#5865F2";
const hover_blue = "#7983f5";

const styles = {
    blue_card: {
        backgroundColor: blue,
        transition: "0.3s",
        '&:hover': {
            backgroundColor: hover_blue,
            cursor: "pointer"
        },
        textTransform: "none",
        fontFamily: "dm-400",
        fontSize: 15
    },
    white_card: {
        backgroundColor: "white",
        transition: "0.3s",
        '&:hover': {
            backgroundColor: "#f0f0f0",
         },
    },
    blue_text: {
        color: blue
    },
    menu_item: {
        borderRadius: 30,
        transition: "0.3s",
        width: "95%",
        margin: "auto",
        marginTop: "5px",
        "& .MuiListItemIcon-root": {
            color: "black",
        },
        "&:hover": {
            backgroundColor: "#f0f0f0",
            color: "black"
        },
        "&.Mui-selected": {
            backgroundColor: blue,
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white",
            },
        },
        "&.Mui-selected:hover": {
            backgroundColor: hover_blue
        },

    }
}

export default styles;