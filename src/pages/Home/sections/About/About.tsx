import { Box, Container, Grid, styled, Typography, Button, Divider } from "@mui/material";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';

const About = () => {

    const StyledAbout = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        padding: "60px 0",
    }));

    const InfoBox = styled(Box)(({ theme }) => ({
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
        [theme.breakpoints.up("md")]: {
            padding: "30px",
            height: "250px",
        },
    }));

    const TextWithBar = styled(Typography)(({ theme }) => ({
        position: "relative",
        display: "inline-block",
        textAlign: "left",
        fontStyle: "italic",
        paddingLeft: "15px", // Espaço entre a barra e o texto
        "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px", // Espessura da barra
            height: "100%", // Altura da barra
            backgroundColor: theme.palette.primary.main, // Cor da barra
        },
    }));


    const FinalWorkButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.contrastText}`,
        borderRadius: "4px",
        padding: "10px 15px",
        width: "60%",
        color: theme.palette.primary.contrastText,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            cursor: "pointer"
        },
        [theme.breakpoints.up("md")]: {
            padding: "10px 15px",
            width: "25%",
        },
    }));




    return (
        <StyledAbout id="about">
            <Container maxWidth="lg">
                <Typography variant="h1" align="center" gutterBottom color="primary.main">
                    About
                </Typography>
                <Grid container spacing={4}>
                    {/* Experiência */}
                    <Grid item xs={12} md={6}>
                        <InfoBox>
                            <WorkspacePremiumIcon fontSize="large" color="primary" />
                            <Typography variant="h6" color="primary.main" marginTop={2}>Experience</Typography>
                            <Typography variant="body2" color="text.secondary" marginTop={1}>
                                I've worked on various software projects, mainly at Grupo Nobre Companies, using Node.js, React, Angular, and Python. I also enhanced my DevOps skills, including deployment, API updates, cloud management, and SSL handling.
                            </Typography>
                        </InfoBox>
                    </Grid>

                    {/* Educação */}
                    <Grid item xs={12} md={6}>
                        <InfoBox>
                            <SchoolIcon fontSize="large" color="primary" />
                            <Typography variant="h6" color="primary.main" marginTop={2}>Education</Typography>
                            <Typography variant="body2" color="text.secondary" marginTop={1}>
                                I have a degree in Analysis and Systems Development from UNIFAN, where I built a strong foundation in Java and C algorithms, frontend development with React and Angular, backend frameworks like Spring, and data science with Python, Pandas, and NumPy.
                            </Typography>
                        </InfoBox>
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <FinalWorkButton onClick={() => window.open("https://drive.google.com/file/d/1hG7Q12aubtZ8iiRPz5gd9iX6culAv6Zd/view?usp=sharing", "_blank")}>
                        View My Capstone Project
                    </FinalWorkButton>
                </Box>

                <Box mt={4}>
                    <TextWithBar variant="body1" align="left" color="text.primary" paragraph>
                        I am passionate about building innovative solutions and continuously learning new technologies to improve my skill set. I am eager to contribute to impactful projects and collaborate with like-minded professionals.
                    </TextWithBar>
                </Box>
                <Box mt={4}>
                    <Divider /> {/* Linha horizontal */}
                </Box>
            </Container>
        </StyledAbout>
    );
};

export default About;
