import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

import { Grid, Typography } from '@mui/material';

/**
 * Footer component for the website.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
    return (
        <div className="font-sans w-full">
            <Grid
                container
                className='bg-black text-white text-center mt-4'
                sx={{ bgcolor: 'black', color: 'white', py: 3 }}
            >
                <Grid item xs={12} sm={4} className="space-x-4">
                    <Typography className='pb-5' variant='h6'> Social Networks </Typography>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <XIcon />
                    </a>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography className='pb-5' variant='h6'>© 2024 Sunflowers </Typography>
                    <ul className="flex justify-around list-none">
                        <li><a href="/bootcamp-tech-titans-2024_ecommerce/terms">Terms and Conditions</a></li>
                        <li><a href="/bootcamp-tech-titans-2024_ecommerce/cookies">Cookies</a></li>
                        <li><a href="/bootcamp-tech-titans-2024_ecommerce/privacy">Privacy Policy</a></li>
                    </ul>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;