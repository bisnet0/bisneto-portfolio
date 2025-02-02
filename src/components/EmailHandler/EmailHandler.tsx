const EmailHandler = () => {
    const handleContactClick = () => {
        const email = "bis_henrique@yahoo.com.br";
        const subject = "CONTACT FROM YOUR PORTFOLIO";
        const body = "Hi, Henrique! I want to contact you!";
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return handleContactClick; // Instead of returning JSX, return the function directly.
};


export default EmailHandler;