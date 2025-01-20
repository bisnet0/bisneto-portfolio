import { AppBar, IconButton, MenuItem, styled, Toolbar } from "@mui/material"

const NavBar = () => {

    const StyledToolbar = styled(Toolbar)(() => ({
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0 20px",

    }))

    return (
        <>
            <AppBar position="absolute">
                <StyledToolbar>
                    <MenuItem>About</MenuItem>
                    <MenuItem>Skils</MenuItem>
                    <MenuItem>Projects</MenuItem>
                </StyledToolbar>
            </AppBar>
        </>
    )

}

export default NavBar
