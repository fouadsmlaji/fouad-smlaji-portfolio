// Helper to get asset path with base URL
const assetPath = (path) => {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};

export const projects = [
  /* Main 4 (shown by default) */
  {
    name: 'Alessandra Website',
    location: 'Italy',
    thumb: assetPath('/assets/images/Projects/AlessandraWebsite/thumbnail.png'),
    logo: assetPath('/assets/images/Projects/AlessandraWebsite/logo.png'),
    objectPosition: '-85px',
    gallery: [
      assetPath('/assets/images/Projects/AlessandraWebsite/image1.png'),
      assetPath('/assets/images/Projects/AlessandraWebsite/image2.png'),
      assetPath('/assets/images/Projects/AlessandraWebsite/Image3.png'),
    ],
    link: 'https://www.alessandraparisi.it',
    description: 'This website serves as a dynamic showcase for the renowned artist Alessandra Parisi, highlighting her diverse collection of artwork. The site features a range of her artistic creations, including stunning paintings, intricate icons, and various other art forms that demonstrate her unique creative vision and talent. With each piece, the website provides an immersive experience that allows visitors to explore the depth and beauty of Alessandra\'s work, offering a glimpse into her artistic journey and the passion that drives her craft.',
  },
  {
    name: 'Lnabni Platform',
    location: 'United Arab Emirates',
    thumb: assetPath('/assets/images/Projects/LnabniWebsite/thumbnail.webp'),
    logo: assetPath('/assets/images/Projects/LnabniWebsite/logo.jpeg'),
    gallery: [
      assetPath('/assets/images/Projects/LnabniWebsite/lenabni2.webp'),
      assetPath('/assets/images/Projects/LnabniWebsite/lenabni3.webp'),
      assetPath('/assets/images/Projects/LnabniWebsite/lenabni4.webp'),
    ],
    link: 'https://lnabni.com',
    description: 'Le Nabni is a semi-governmental media platform established to serve as an institutional bridge connecting Syrian women inside and outside the country, while enhancing their presence in the humanitarian, cultural, and professional arenas.',
  },
  {
    name: 'TruNeighbor',
    location: 'United States',
    thumb: assetPath('/assets/images/Projects/TruNeighbor/thumbnail.png'),
    logo: assetPath('/assets/images/Projects/TruNeighbor/logo.png'),
    objectPosition: '-40px',
    gallery: [
      assetPath('/assets/images/Projects/TruNeighbor/image1.png'),
      assetPath('/assets/images/Projects/TruNeighbor/image2.png'),
      assetPath('/assets/images/Projects/TruNeighbor/image3.png'),
    ],
    link: 'https://truneighbor.co',
    description: 'The Neighbor-to-Neighbor Delivery App. Local-first app that lets neighbors help each other with everyday shopping.',
  },
  {
    name: 'SRT Freight Forwarding',
    location: 'United Arab Emirates',
    thumb: assetPath('/assets/images/Projects/SRT/thumbnail.png'),
    logo: assetPath('/assets/images/Projects/SRT/logo.jpg'),
    objectPosition: '-40px',
    gallery: [
      assetPath('/assets/images/Projects/SRT/image2.png'),
      assetPath('/assets/images/Projects/SRT/image3.png'),
      assetPath('/assets/images/Projects/SRT/image4.png'),
    ],
    link: 'https://srtfreightforwarding.com',
    description: 'SRT is a leading logistics and freight forwarding company dedicated to delivering reliable, efficient, and professional transportation solutions across the UAE and the wider region. We specialize in a full spectrum of services, including refrigerated land freight for temperature-sensitive goods, heavy-cargo transportation using top-grade trailers, and comprehensive import and export support for businesses of all sizes.',
  },
  /* Rest (shown on "Show More") */
  {
    name: 'Majd Al Ghaith Photography',
    location: 'Syria',
    thumb: assetPath('/assets/images/Projects/MajdWebsite/thumbnail.png'),
    logo: assetPath('/assets/images/Projects/MajdWebsite/logo.png'),
    gallery: [
      assetPath('/assets/images/Projects/MajdWebsite/Image1.png'),
      assetPath('/assets/images/Projects/MajdWebsite/image3.png'),
      assetPath('/assets/images/Projects/MajdWebsite/image4.png'),
    ],
    link: 'https://github.com/fouadsmlaji/MA-Website',
    description: 'A custom-designed website created for the talented photographer Majd Algaith, showcasing his extensive portfolio and stunning artistic photography. The website is tailored to highlight his creative vision and expertise, providing a visually engaging platform for clients and visitors to explore his work. It features an elegant layout, seamless navigation, and a gallery that beautifully displays his artwork, making it an ideal space for promoting his services and artistic achievements.',
  },
  {
    name: 'Midi Agency ',
    location: 'Australia',
    thumb: assetPath('/assets/images/Projects/MidiWebsite/thumbnail.png'),
    logo: assetPath('/assets/images/Projects/MidiWebsite/logo.png'),
    objectPosition: '-95px',
    gallery: [
      assetPath('/assets/images/Projects/MidiWebsite/image2.png'),
      assetPath('/assets/images/Projects/MidiWebsite/image3.png'),
      assetPath('/assets/images/Projects/MidiWebsite/image4.png'),
    ],
    link: 'https://github.com/fouadsmlaji/minimal-digital-agency',
    description: 'Minimal Digital Agency is a modern and streamlined platform dedicated to providing high-quality static web page creation services. Our team of skilled developers specializes in building fast, lightweight, and aesthetically pleasing websites that ensure a strong and professional online presence. We focus on efficiency, simplicity, and performance, delivering static websites that are secure, optimized, and maintenance-free. Whether you need a landing page, a business showcase, or a portfolio website, we create tailored solutions that meet your specific needs.',
  },
  {
    name: 'My Holiday Website',
    location: 'United Kingdom',
    thumb: assetPath('/assets/images/Projects/MyHolidayWebsite/thumbnail.png'),
    objectPosition: '-90px',
    gallery: [
      assetPath('/assets/images/Projects/MyHolidayWebsite/image2.png'),
      assetPath('/assets/images/Projects/MyHolidayWebsite/image3.png'),
      assetPath('/assets/images/Projects/MyHolidayWebsite/image4.png'),
    ],
    link: 'https://github.com/fouadsmlaji/Holiday-Apartments',
    description: 'A dedicated website designed for holiday apartment rentals, offering a seamless and user-friendly platform for travelers to find their ideal accommodations. The website showcases a variety of vacation apartments with detailed descriptions, high-quality images, and a list of amenities such as Wi-Fi, swimming pools, and more. It provides an intuitive search feature, allowing users to filter by location, price, and availability, ensuring a hassle-free booking experience.',
  },
  {
    name: 'Tasking Dev',
    location: 'Australia',
    thumb: assetPath('/assets/images/Projects/TaskingDevWebsite/thumbnail.png'),
    logo: assetPath('/assets/images/Projects/TaskingDevWebsite/logo.png'),
    objectPosition: '-90px',
    gallery: [
      assetPath('/assets/images/Projects/TaskingDevWebsite/Image2.png'),
      assetPath('/assets/images/Projects/TaskingDevWebsite/Image3.png'),
      assetPath('/assets/images/Projects/TaskingDevWebsite/Image4.png'),
    ],
    link: 'https://github.com/fouadsmlaji/Task.Dev-website',
    description: 'A custom software development company that understands your needs and saves you money. We will build your software using AI at the cheapest cost. You will also interact with real people who understand your business requirements so you don\'t have to waste your time.',
  },
  {
    name: 'Ecommerce Website',
    location: 'Own Project',
    thumb: assetPath('/assets/images/Projects/EcommerceWebsite/thumbnail.png'),
    objectPosition: '0px',
    gallery: [
      assetPath('/assets/images/Projects/EcommerceWebsite/image2.png'),
      assetPath('/assets/images/Projects/EcommerceWebsite/image3.png'),
      assetPath('/assets/images/Projects/EcommerceWebsite/image4.png'),
    ],
    link: 'https://github.com/fouadsmlaji/E-Commerce',
    description: 'An e-commerce website featuring an admin dashboard for managing users, products, and permissions. It includes roles for admins, editors, and product managers, allowing them to create, edit, and delete products and users. The platform supports authentication, including Google login integration.',
  },
  {
    name: 'Foodz Website',
    location: 'Own Project',
    thumb: assetPath('/assets/images/Projects/FoodzWebsite/thumbnail.png'),
    gallery: [
      assetPath('/assets/images/Projects/FoodzWebsite/image2.png'),
      assetPath('/assets/images/Projects/FoodzWebsite/Image3.png'),
      assetPath('/assets/images/Projects/FoodzWebsite/Image4.png'),
    ],
    link: 'https://github.com/fouadsmlaji/Foodz-Restaurant',
    description: 'The aim of this project is to enhance the food ordering experience by making it more appealing and convenient. By allowing customers to simply scan a QR code, they can instantly access the restaurant\'s website, which features an eye-catching design. This enables them to browse through the menu with ease, streamlining the entire process.',
  },
]
