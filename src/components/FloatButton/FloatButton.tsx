import { Fab, useMediaQuery, useTheme } from "@mui/material";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Link } from "react-scroll";

const FloatButton = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Verifica se é mobile

    return (
        <Fab
            color="primary" // Cor do botão
            aria-label="Voltar ao topo"
            sx={{
                position: "fixed", // Fixa o botão na tela
                bottom: isMobile ? 16 : 24, // Ajusta a posição para mobile e desktop
                right: isMobile ? 16 : 24, // Ajusta a posição para mobile e desktop
                width: isMobile ? 48 : 56, // Tamanho menor para mobile
                height: isMobile ? 48 : 56, // Tamanho menor para mobile
                transition: "all 0.3s ease", // Adiciona uma transição suave
                "&:hover": {
                    transform: "scale(1.1)", // Efeito de escala ao passar o mouse
                },
            }}
        >
            <Link
                to="hero" // ID da seção do topo
                smooth={true} // Scroll suave
                duration={2500} // Duração da animação
                style={{ color: "inherit", cursor: "pointer", marginTop: "5px" }} // Estilo do link
            >
                <KeyboardDoubleArrowUpIcon fontSize={isMobile ? "medium" : "large"} />
            </Link>
        </Fab>
    );
};

export default FloatButton;