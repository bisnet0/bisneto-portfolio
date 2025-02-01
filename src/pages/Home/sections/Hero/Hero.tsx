import { Box, Container, Grid, styled, Typography } from "@mui/material"
import Avatar from "../../../../assets/images/profile.jpg"
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import StyledButton from "../../../../components/StyledButton/StyledButton";
import { AnimatedBackground } from "../../../../components/AnimatedBackground/AnimatedBackground";



const Hero = () => {

    const StyledHero = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up("xs")]: {  //<= Mobile
            paddingTop: "100px"
        },
        [theme.breakpoints.up("md")]: {  //<= Desktop
            paddingTop: "0"
        }

    }))

    const StyledImg = styled("img")(({ theme }) => ({
        width: "100%",
        maxWidth: "300px",
        borderRadius: "50%",
        border: `1px solid ${theme.palette.secondary.main}`,
        objectFit: "cover",

    }))
    return (
        <>
            <StyledHero id="hero">
                <Container maxWidth={"lg"}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box position={"relative"}>
                                <Box position={"absolute"} width={"150%"} top={-100} right={0}>
                                    <AnimatedBackground />
                                </Box>
                                <Box position={"relative"} textAlign={"center"}>
                                    <StyledImg src={Avatar} alt="Henrique Bisneto" />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography color="primary.contrastText" variant="h1" textAlign={"center"}>Henrique Bisneto</Typography>
                            <Typography color="primary.contrastText" variant="h2" textAlign={"center"} paddingBottom={2}>I'm a Software Developer</Typography>
                            <Grid container display={"flex"} justifyContent={"center"} spacing={2} paddingTop={3}>
                                <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"}>
                                    <StyledButton onClick={()=> console.log("Download")}>
                                        <DownloadIcon />
                                        <Typography>
                                            Download CV
                                        </Typography>
                                    </StyledButton>
                                </Grid>
                                <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"}>
                                    <StyledButton onClick={()=> console.log("Contact")}>
                                        <EmailIcon />
                                        <Typography>
                                            Contact me
                                        </Typography>
                                    </StyledButton>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                </Container>
            </StyledHero>
        </>
    )

}

export default Hero
