import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

import { Grid, Typography } from '@mui/material';

const Footer = () => {  
    return (
        <div className="font-sans">
            <Grid 
            container
            className = 'bg-black text-white text-center mt-4'
            sx={{bgcolor:'black', color:'white', py:3}}
            >
                <Grid item xs={12} sm={4} className="space-x-4">
                    <Typography className='pb-5' variant='h6'> Redes Sociales </Typography>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>
                    <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                        <XIcon />
                    </a>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography className='pb-5' variant='h6'>© 2024 Sunflowers </Typography>
                    <ul className="flex justify-around list-none">
                        <li><a href="/terms">Términos y condiciones</a></li>
                        <li><a href="/cookies">Cookies</a></li>
                        <li><a href="/privacy">Política de privacidad</a></li>
                    </ul>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;