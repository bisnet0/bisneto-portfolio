import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

// Define the type for the codeLink prop
interface CodeLink {
    name: string;
    url: string;
}

interface CodeLinkButtonProps {
    codeLink: string | CodeLink[];
}

const CodeLinkButton: React.FC<CodeLinkButtonProps> = ({ codeLink }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Function to check if a link is from GitHub
    const isGitHubLink = (link: string) => {
        return link.includes("github.com");
    };

    const isEmptyLink = (link: string) => {
        return link === "";
    };

    if (Array.isArray(codeLink) && codeLink.length > 1) {
        return (
            <>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClick}
                >
                    Visit Website
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {codeLink.map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={handleClose}
                            component="a"
                            href={item.url}
                            target="_blank"
                        sx={{
                            fontSize: "14px",
                            "&:hover": {
                                backgroundColor: "primary.main", 
                                borderRadius: "3px",
                                color: "white", 
                            },
                        }}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        );
    } else {
        const link = Array.isArray(codeLink) ? codeLink[0].url : codeLink;

        if (isEmptyLink(link)) {
            return null;
        }
        const buttonText = isGitHubLink(link) ? "View Code" : "Visit Website";

        return (
            <Button
                variant="outlined"
                color="primary"
                href={link}
                target="_blank"
            >
                {buttonText}
            </Button>
        );
    }
};

export default CodeLinkButton;