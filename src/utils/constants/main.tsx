import Pricing from '%/pricing.svg';
import AboutUs from '%/about-us.svg';
import ContactUs from '%/contact-us.svg';
import { FaVideo } from 'react-icons/fa6';

export const mainDrawerLinks = [
    {
        href: '/pricing',
        title: 'Pricing',
        icon: <Pricing />,
    },
    {
        href: '/about-us',
        title: 'About us',
        icon: <AboutUs />,
    },
    {
        href: '/contact-us',
        title: 'Contact us',
        icon: <ContactUs />,
    },
];
