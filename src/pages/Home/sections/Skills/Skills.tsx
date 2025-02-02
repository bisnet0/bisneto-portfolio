import { Box, Container, Grid, styled, Typography } from "@mui/material";

const Skills = () => {

    const StyledSkills = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        padding: "60px 0",
    }));

    const SkillBox = styled(Box)(({ theme }) => ({
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "8px",
        padding: "15px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        [theme.breakpoints.up("md")]: {
            padding: "15px",
            height: "50px",
        },
    }));

    const skillsList = [
        "TypeScript", "JavaScript", "React", "Node.js", "Express.js", "MongoDB",
        "HTML", "CSS", "Git", "Docker", "Python", "RabbitMQ",
    ];

    return (
        <StyledSkills id="skills">
            <Container maxWidth="lg">
                <Typography variant="h1" align="center" gutterBottom color="primary.main">
                    Skills
                </Typography>

                <Grid container spacing={4}>
                    {skillsList.map((skill, index) => (
                        <Grid item xs={6} sm={6} md={4} lg={2} key={index}>
                            <SkillBox>
                                <Typography variant="h6" color="primary.main">{skill}</Typography>
                            </SkillBox>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </StyledSkills>
    );
};

export default Skills;
