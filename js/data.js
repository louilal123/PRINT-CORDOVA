// Shop data that would normally be in a separate JSON file or API
const shopData = [
    {
        id: 1,
        name: "Island Prints & Designs",
        location: {
            address: "1234 Beach Road, Santa Fe, Bantayan Island",
            coordinates: [11.1677, 123.7115],
            area: "Santa Fe"
        },
        services: ["Digital Printing", "Large Format", "T-Shirt Printing", "Graphic Design"],
        contact: {
            phone: "+63 912 345 6789",
            email: "islandprints@example.com",
            website: "islandprints.ph",
            hours: "8:00 AM - 5:00 PM"
        },
        description: "Full-service printing company offering high-quality printing solutions for businesses and individuals on Bantayan Island.",
        photos: ["images/shop1.jpg"],
        rating: 4.8,
       
        isOpen: true,
        isFeatured: true
    },
    {
        id: 2,
        name: "Bantayan Copy Center",
        location: {
            address: "Main Street, Bantayan Town, Bantayan Island",
            coordinates: [11.2152, 123.7360],
            area: "Bantayan Town"
        },
        services: ["Photocopying", "Document Printing", "ID Cards", "Binding"],
        contact: {
            phone: "+63 932 123 4567",
            email: "bantayancopy@example.com",
            hours: "9:00 AM - 6:00 PM"
        },
        description: "Budget-friendly copy center specializing in document services and school requirements.",
        photos: ["images/shop2.jpg"],
        rating: 4.2,
     
        isOpen: true,
        isFeatured: false
    },
    {
        id: 3,
        name: "Creative Hub Design Studio",
        location: {
            address: "Paradise Resort Complex, Madridejos, Bantayan Island",
            coordinates: [11.2701, 123.6877],
            area: "Madridejos"
        },
        services: ["Graphic Design", "Logo Creation", "Marketing Materials", "Social Media Graphics"],
        contact: {
            phone: "+63 945 678 9012",
            email: "creativehub@example.com",
            website: "creativehub.ph",
            hours: "10:00 AM - 7:00 PM"
        },
        description: "Professional design studio offering creative services for businesses and tourists.",
        photos: ["images/shop3.jpg"],
        rating: 4.9,
       
        isOpen: false,
        isFeatured: true
    },
    {
        id: 4,
        name: "Island Photo Lab",
        location: {
            address: "Tourist Strip, Santa Fe, Bantayan Island",
            coordinates: [11.1690, 123.7156],
            area: "Santa Fe"
        },
        services: ["Photo Printing", "Passport Photos", "Canvas Prints", "Photo Restoration"],
        contact: {
            phone: "+63 956 789 0123",
            email: "islandphoto@example.com",
            hours: "8:30 AM - 5:30 PM"
        },
        description: "Specializing in high-quality photo prints and customized photo products for tourists and locals.",
        photos: ["images/shop4.jpg"],
        rating: 4.5,
       
        isOpen: true,
        isFeatured: false
    },
    {
        id: 5,
        name: "Seaside Business Center",
        location: {
            address: "Port Area, Santa Fe, Bantayan Island",
            coordinates: [11.1664, 123.7158],
            area: "Santa Fe"
        },
        services: ["Business Cards", "Flyers", "Banners", "Rush Printing", "Document Services"],
        contact: {
            phone: "+63 967 890 1234",
            email: "seasidebiz@example.com",
            hours: "8:00 AM - 8:00 PM"
        },
        description: "One-stop shop for all business printing needs, conveniently located near the port area.",
        photos: ["images/shop5.jpg"],
        rating: 4.3,
       
        isOpen: true,
        isFeatured: true
    }
];