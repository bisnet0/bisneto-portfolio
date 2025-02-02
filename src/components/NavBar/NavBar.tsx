import { AppBar, MenuItem, styled, Toolbar } from "@mui/material";
import { Link } from "react-scroll"; // Import Link from react-scroll

const NavBar = () => {
    const StyledToolbar = styled(Toolbar)(() => ({
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0 20px",
    }));

    return (
        <>
            <AppBar position="fixed"> {/* Changed to "fixed" for better UX */}
                <StyledToolbar>
                    <MenuItem>
                        <Link
                            to="about" // ID of the target section
                            smooth={true} // Enable smooth scrolling
                            duration={500} // Animation duration
                            offset={-70} // Offset for fixed header height (adjust as needed)
                            style={{ cursor: "pointer" }} // Add pointer cursor
                        >
                            About
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            to="skills" // ID of the target section
                            smooth={true}
                            duration={500}
                            offset={window.innerWidth > 1024 ? -300 : -180} // Ajusta o offset dependendo do tamanho da tela
                            style={{ cursor: "pointer" }}
                        >
                            Skills
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link
                            to="projects" // ID of the target section
                            smooth={true}
                            duration={500}
                            offset={-62}
                            style={{ cursor: "pointer" }}
                        >
                            Projects
                        </Link>
                    </MenuItem>
                </StyledToolbar>
            </AppBar>
        </>
    );
};

export default NavBar;