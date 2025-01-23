import { Box, Container, Grid, styled, Typography, Button } from "@mui/material";

// Lista de projetos
const projects = [
    {
        name: "Project 1",
        duration: "Jul 2023 - Dez 2023",
        image: "../src/assets/images/projects/tutorial.png", // Imagem do projeto
        description: "This is a brief description of Project 1. It involves building a full-stack application with React and Node.js.",
        technologies: ["React", "Node.js", "MongoDB"],
        projectLink: "https://example.com/project1",
        codeLink: "https://github.com/example/project1"
    },
    {
        name: "Project 2",
        duration: "Jan 2023 - Mar 2023",
        image: "path/to/image2.jpg", // Imagem do projeto
        description: "This project focuses on creating a mobile application using React Native for iOS and Android.",
        technologies: ["React Native", "Redux", "Firebase"],
        projectLink: "https://example.com/project2",
        codeLink: "https://github.com/example/project2"
    },
    // Adicione mais projetos conforme necessário
];

const Projects = () => {

    const StyledProjects = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        padding: "60px 0",
    }));

    const ProjectBox = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "auto", // Deixe a altura automática para se ajustar ao conteúdo
    }));

    return (
        <StyledProjects>
            <Container maxWidth="lg">
                <Typography variant="h1" align="center" gutterBottom color="primary.contrastText">
                    Projects
                </Typography>

                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <ProjectBox>
                                <Typography variant="h6" color="primary.main">
                                    {project.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" marginTop={1}>
                                    {project.duration}
                                </Typography>

                                <Box mt={2}>
                                    <img src={project.image} alt={project.name} style={{ width: "100%", maxWidth: "auto", height: "auto", objectFit: "cover", borderRadius: "8px" }} />
                                </Box>

                                <Typography variant="body1" color="text.primary" paragraph marginTop={2}>
                                    {project.description}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" marginTop={2}>
                                    Technologies: {project.technologies.join(", ")}
                                </Typography>

                                <Box mt={3}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary" href={project.projectLink} target="_blank">
                                                View Project
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" color="primary" href={project.codeLink} target="_blank">
                                                View Code
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ProjectBox>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </StyledProjects>
    );
};

export default Projects;
