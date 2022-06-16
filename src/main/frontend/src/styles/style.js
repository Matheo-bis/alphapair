const blue = "#5865F2";
const hover_blue = "#7983f5";

const avatar_colors = [
    "#FFB900",
    "#D83B01",
    "#B50E0E",
    "#E81123",
    "#B4009E",
    "#5C2D91",
    "#0078D7",
    "#00B4FF",
    "#008272",
    "#107C10"
];

const getAvatarColorFromName = (string) => {
    var sum = 0;
    
    for (let i = 0 ; i < string.length ; i++) {
        sum += string.charCodeAt(i);
    }
    return avatar_colors[sum % avatar_colors.length];
}

const styles = {
    blue_card: {
        backgroundColor: blue,
        transition: "0.3s",
        '&:hover': {
            backgroundColor: hover_blue,
            cursor: "pointer"
        },
        '&:disabled': {
            opacity: "0.2",
            cursor: "pointer"
        },
        textTransform: "none",
        fontFamily: "dm-400",
        fontSize: 15,
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

    },
    title_link: {
        fontSize: 20,
        "&:hover": {
            textDecoration: "underline"
        },
    }
}

//export default {styles, getAvatarColorFromName};
module.exports = {
    styles,
    getAvatarColorFromName 
}