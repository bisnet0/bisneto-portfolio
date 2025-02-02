import { Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import EmailHandler from '../../../../components/EmailHandler/EmailHandler';

const Baseboard = () => {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                padding: 1,
                backgroundColor: 'background.paper',
            }}
        >
            {/* Ícones com links */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 5,
                    alignItems: 'center',
                }}
            >
                <IconButton
                    color="primary"
                    aria-label="GitHub"
                    onClick={() => window.open('https://github.com/bisnet0', '_blank')}
                >
                    <GitHubIcon />
                </IconButton>
                <IconButton
                    color="primary"
                    aria-label="LinkedIn"
                    onClick={() => window.open('https://www.linkedin.com/in/bisnet0', '_blank')}
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Email" onClick={EmailHandler()}> {/* Use the function here */}
                    <EmailIcon />
                </IconButton>
            </Box>

            {/* Texto de direitos autorais */}
            <Typography variant="body2" color="textSecondary">
                © {getCurrentYear()} Henrique Bisneto — All rights reserved
            </Typography>
        </Box>
    );
};

export default Baseboard;