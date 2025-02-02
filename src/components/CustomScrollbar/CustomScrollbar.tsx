import { GlobalStyles } from "@mui/material"; // Usado para aplicar estilos globais

const CustomScrollbar = () => {
    return (
        <GlobalStyles
            styles={{
                /* Para WebKit (Chrome, Edge, Safari, Opera) */
                "::-webkit-scrollbar": {
                    display: "none", // Oculta a barra de rolagem
                },

                /* Para Firefox */
                html: {
                    scrollbarWidth: "none", // Oculta a barra de rolagem
                },
            }}
        />
    );
};

export default CustomScrollbar;
