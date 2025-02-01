import { Box, Container, Grid, styled, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideImages from "../../../../components/SlideImages/SlideImages";
import CodeLinkButton from "./CodeLinkButton"; // Import the new component



// Lista de projetos
const projects = [
    {
        name: "Tutorials Medicine and Nobre School",
        duration: "Oct 3, 2024 - Dec 18, 2024",
        images: [
            "/projects/Tutorial.png",
            "/projects/Tutorial2.png",
            "/projects/Tutorial3.png",
            "/projects/Tutorial4.png",
            "/projects/Tutorial5.png",
            "/projects/Tutorial6.png",
            "/projects/Tutorial7.png",
            "/projects/Tutorial8.png",
            "/projects/Tutorial9.png",
            "/projects/Tutorial10.png",
            "/projects/Tutorial11.png",
        ], // Lista de imagens
        description: "Redesigning the UI/UX for Medicine Tutorials and Nobre School, ensuring a fully responsive experience across smartphones and tablets.",
        technologies: ["JavaScript", "HTML5", "CSS3"],
        projectLink: "https://www.linkedin.com/posts/bisnet0_frontend-js-css-activity-7247601763212513281-KuBA?utm_source=share&utm_medium=member_desktop",
        codeLink: [
            { name: "UNIFAN MED", url: "https://med.unifan.net.br/tutorial-professor" },
            { name: "UNEF MED", url: "https://med.unef.edu.br/tutorial-professor" },
            { name: "UNIFAN", url: "https://unifan.net.br/tutorial" },
            { name: "UNEF", url: "https://unef.edu.br/tutorial" },
            { name: "COLÉGIO NOBRE", url: "https://colegionobre.com.br/tutorial" },
        ]
    },
    {
        name: "Renova-me Church",
        duration: "Oct 9, 2024 - Oct 16, 2024",
        images: [
            "/projects/Renovame.png",
            "/projects/Renovame1.png",
            "/projects/Renovame2.png",
            "/projects/Renovame3.png",
            "/projects/Renovame4.png",
            "/projects/Renovame5.png",
            "/projects/Renovame6.png",
            "/projects/Renovame7.png",
            "/projects/Renovame8.png",
        ], // Lista de imagens
        description: "This project was focused on '_pro bono publico_', creating a fully responsive website for a new church called Renova-me Church.",
        technologies: ["JavaScript", "HTML5", "CSS3"],
        projectLink: "https://renovamechurch.com.br/",
        codeLink: "https://github.com/bisnet0/renova-me"
    },
    {
        name: "Facial Biometrics UNEF and UNIFAN",
        duration: "Jul 29, 2024 - Aug 6, 2024",
        images: [
            "/projects/Biometria.png",
            "/projects/Biometria1.png",
            "/projects/Biometria2.png",
            "/projects/Biometria3.png",
            "/projects/Biometria4.png",
            "/projects/Biometria5.png",
            "/projects/Biometria6.png",
            "/projects/Biometria7.png",
            "/projects/Biometria8.png",
            "/projects/Biometria9.png",
            "/projects/Biometria10.png",
            "/projects/Biometria11.png",
        ], // Lista de imagens
        description: "This project was developed to address the turnstile access issue at the two institutions of Grupo Nobre. It involved sending students and employees photos to authorize their entry.",
        technologies: ["Python", "Node.js", "SQL Server", "JavaScript", "HTML5", "CSS3"],
        projectLink: "https://www.linkedin.com/posts/bisnet0_frontend-webdeb-javascript-activity-7227072365472448514-m9m7?utm_source=share&utm_medium=member_desktop",
        codeLink: [
            { name: "FACIAL BIO UNIFAN", url: "https://biometria.unifan.net.br/" },
            { name: "FACIAL BIO UNEF", url: "https://biometria.unef.edu.br/" },
        ]
    },
    {
        name: "Monthly Birthdays",
        duration: "Jun 26, 2024 - Jul 23, 2024",
        images: [
            "/projects/Aniversariantes.png",
            "/projects/Aniversariantes1.png",
            "/projects/Aniversariantes2.png",
            "/projects/Aniversariantes3.png",
            "/projects/Aniversariantes4.png",
        ], // Lista de imagens
        description: "This project resulted in the creation of a Birthday Reminder for all Grupo Nobre employees. It displays all birthdays and includes a special celebration feature for the employee celebrating their birthday that day.",
        technologies: ["JavaScript", "Node.js", "SQL Server", "HTML5", "CSS3"],
        projectLink: "https://www.linkedin.com/posts/bisnet0_webdev-desenvolvimentoweb-nodejs-activity-7220542341504245760-yEhG?utm_source=share&utm_medium=member_desktop",
        codeLink: ""
    },
    {
        name: "Polos Management",
        duration: "Jan 17, 2025 - Jan 29, 2025",
        images: [
            "/projects/Polo.png",
            "/projects/Polo1.png",
            "/projects/Polo2.png",
            "/projects/Polo3.png",
            "/projects/Polo4.png",
            "/projects/Polo5.png",
            "/projects/Polo6.png",
            "/projects/Polo7.png",
            "/projects/Polo8.png",
            "/projects/Polo9.png",
        ], // Lista de imagens
        description: "This project tackled extracting data from Brazil's complex ERP system (TOTVS RM) and centralizing it into a responsive web app, enabling real-time data access for all UNEF College campuses.",
        technologies: ["React", "JSX", "SQL Server", "MongoDB", "Node.js", "JWT"],
        projectLink: "https://www.linkedin.com/posts/bisnet0_react-nodejs-desenvolvimentoweb-activity-7287959265695166465-Gum8?utm_source=share&utm_medium=member_desktop",
        codeLink: "https://polos.unef.edu.br/"
    },
    {
        name: "Portal Customizer",
        duration: "Jun 16, 2024 - Jun 28, 2024",
        images: [
            "/projects/replaceM.png",
            "/projects/replaceM1.png",
            "/projects/replaceM2.png",
        ], // Lista de imagens
        description: "This project focuses on creating a costumizable automatic replacement tool for a Grupo Nobre Academic Portal's pages.",
        technologies: ["Python", "HTML5", "CSS3"],
        projectLink: "https://www.linkedin.com/posts/bisnet0_boa-tarde-rede-tudo-bem-com-voc%C3%AAs-bom-activity-7209987530543296512-V1ar?utm_source=share&utm_medium=member_desktop",
        codeLink: "https://github.com/bisnet0/Replace_RM_Folder"
    },
    {
        name: "Predictive Tax Analysis",
        duration: "Jun 18, 2024 - Jun 19, 2024",
        images: [
            "/projects/APreditiva.png",
            "/projects/APreditiva1.png",
            "/projects/APreditiva2.png",
            "/projects/APreditiva3.png",
            "/projects/APreditiva4.png",
        ], // Lista de imagens
        description: "This project focuses on creating a Predictive Analysis tool for Brazilian import and export taxes. It concentrates on data from the year range 2000 to 2024.",
        technologies: ["Python", "Jupyter", "Pamdas", "Scikit-learn", "Matplotlib", "Numpy"],
        projectLink: "",
        codeLink: "https://github.com/bisnet0/DataScience"
    },
    {
        name: "Nobre Events Hub",
        duration: "Aug 14, 2024 - Sep 2, 2024",
        images: [
            "/projects/Nobrehub.png",
            "/projects/Nobrehub1.png",
            "/projects/Nobrehub2.png",
            "/projects/Nobrehub3.png",
            "/projects/Nobrehub4.png",
        ], // Lista de imagens
        description: "This project focuses on creating a centralized hub for all Nobre Group events (free and paid with Mercado Pago API). It is designed to manage event information and generate certificates for participants.",
        technologies: ["JavaScript", "MercadoPago API", "Python", "Node.js"],
        projectLink: "https://www.linkedin.com/posts/bisnet0_development-system-backend-activity-7264752938651185152-9vcq?utm_source=share&utm_medium=member_desktop",
        codeLink: ""
    },
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

                                <Box
                                    mt={2}
                                    style={{
                                        width: "92%", // Garante que o slider ocupe toda a largura disponível
                                        maxWidth: "500px", // Limita a largura máxima, ajuste conforme necessário
                                        height: "300px", // Altura do slider, ajuste conforme o design
                                        overflow: "hidden", // Evita que imagens maiores saiam do container
                                    }}
                                >
                                    <SlideImages images={project.images} />
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
                                            {project.projectLink && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    href={project.projectLink}
                                                    target="_blank"
                                                >
                                                    {project.projectLink.includes("linkedin.com") ? "View Project" : "Visit Website"}
                                                </Button>
                                            )}
                                        </Grid>
                                        <Grid item>
                                            <CodeLinkButton codeLink={project.codeLink} />
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
