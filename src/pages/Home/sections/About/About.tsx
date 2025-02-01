import { Box, Container, Grid, styled, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
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

    const TextWithUnderline = styled(Typography)(({ theme }) => ({
        position: "relative",
        display: "inline-block",
        textAlign: "center",
        "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            bottom: -25, // Espaço entre o texto e o traço
            transform: "translateX(-50%)",
            width: "100%", // Largura do traço
            height: "1px", // Espessura do traço
            backgroundColor:'rgba(192, 192, 192, 0.5)', // Cor do traço' rgba(179, 128, 128, 0.5),
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
                            <WorkIcon fontSize="large" color="primary" />
                            <Typography variant="h6" color="primary.main" marginTop={2}>Experience</Typography>
                            <Typography variant="body2" color="text.secondary" marginTop={1}>
                                I have worked on various software development projects, including web and mobile applications, using technologies such as React, Node.js, and Java.
                            </Typography>
                        </InfoBox>
                    </Grid>

                    {/* Educação */}
                    <Grid item xs={12} md={6}>
                        <InfoBox>
                            <SchoolIcon fontSize="large" color="primary" />
                            <Typography variant="h6" color="primary.main" marginTop={2}>Education</Typography>
                            <Typography variant="body2" color="text.secondary" marginTop={1}>
                                I hold a degree in Computer Science from XYZ University, where I developed a strong foundation in algorithms, data structures, and software engineering.
                            </Typography>
                        </InfoBox>
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <TextWithUnderline variant="body1" align="center" color="text.primary" paragraph>
                        I am passionate about building innovative solutions and continuously learning new technologies to improve my skill set. I am eager to contribute to impactful projects and collaborate with like-minded professionals.
                    </TextWithUnderline>
                </Box>
            </Container>
        </StyledAbout>
    );
};

export default About;
