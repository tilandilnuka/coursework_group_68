const phoneGallery = [
  "https://m.media-amazon.com/images/I/51hANpBRKwL._AC_SX522_.jpg",
  "https://m.media-amazon.com/images/I/51vYwEbmqPL._AC_SX522_.jpg",
  "https://m.media-amazon.com/images/I/51F7V0xpIxL._AC_SX522_.jpg",

  "https://m.media-amazon.com/images/I/71yUVEekQWL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61Q51ztMpFL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61qvRagAn9L._AC_SX679_.jpg",

  "https://m.media-amazon.com/images/I/61vp97LSYFL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71uAesjXh5L._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71MLtOwfy7L._AC_SX679_.jpg",

  "https://m.media-amazon.com/images/I/61NwtdmwWQL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61dMjYoGAKL._AC_SX522_.jpg",
];

const tabletGallery = [
  "https://m.media-amazon.com/images/I/61mw0JbWfYL._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/61DLJHPX3QL._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/71RfxLux1KL._AC_SX466_.jpg",

  "https://m.media-amazon.com/images/I/51LHmhoU-cL._AC_SX466_.jpg",

  "https://m.media-amazon.com/images/I/6102lbnuXsL._AC_SX466_.jpg",

  "https://m.media-amazon.com/images/I/619tgvmbFKL._AC_SY679_.jpg",
  "https://m.media-amazon.com/images/I/71InzyQ6mVL._AC_SX466_.jpg",
];

const accessoryGallery = [
  "https://m.media-amazon.com/images/I/61qmsGnacvL._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/61GJAFdM9pL._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/51Cjr4uUYLL._AC_SX466_.jpg",

  "https://m.media-amazon.com/images/I/61B8Mnv4zHL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/712iQmEBayL._AC_SX679_.jpg",

  "https://m.media-amazon.com/images/I/71bNeyqSP2L._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/61ZIpMEa70L._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/616RQh-VswL._AC_SX466_.jpg",

  "https://m.media-amazon.com/images/I/61wE18cABPL._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/61bIVBgMUwL._AC_SX466_.jpg",
  "https://m.media-amazon.com/images/I/61R7tEaM2cL._AC_SX466_.jpg",
];

export const FALLBACK_PRODUCT_IMAGE = phoneGallery[0];

export const productCatalog = [
  {
    _id: "prod-iphone-16-pro",
    title: "Apple iPhone 16 Pro",
    brandName: "Apple",
    model: "iPhone 16 Pro",
    category: "mobile phones",
    price: 469900,
    quantity: 8,
    processor: "A18 Pro",
    ram: "8GB",
    storage: "256GB",
    graphics: "6-core Apple GPU",
    display: "6.3-inch Super Retina XDR",
    description:
      "A flagship iPhone with a titanium build, pro-grade cameras, and excellent battery life for power users.",
    images: [phoneGallery[0], phoneGallery[1], phoneGallery[2]],
    reviews: [
      {
        name: "Ayesha",
        ratings: 5,
        comment:
          "The cameras and battery life are excellent, and the phone feels premium in hand.",
      },
      {
        name: "Ravin",
        ratings: 4,
        comment:
          "Fast, polished, and dependable. I only wish the box included a charger.",
      },
    ],
  },
  {
    _id: "prod-galaxy-s25-ultra",
    title: "Samsung Galaxy S25 Ultra",
    brandName: "Samsung",
    model: "Galaxy S25 Ultra",
    category: "mobile phones",
    price: 524900,
    quantity: 6,
    processor: "Snapdragon 8 Elite for Galaxy",
    ram: "12GB",
    storage: "512GB",
    graphics: "Adreno GPU",
    display: "6.8-inch Dynamic AMOLED 2X",
    description:
      "A premium Galaxy phone with a bright display, powerful zoom camera system, and S Pen productivity features.",
    images: [phoneGallery[3], phoneGallery[4], phoneGallery[5]],
    reviews: [
      {
        name: "Milan",
        ratings: 5,
        comment:
          "The display is stunning and the zoom camera is genuinely useful when traveling.",
      },
      {
        name: "Hiruni",
        ratings: 5,
        comment:
          "Great for work and notes. The battery easily lasts me a full day.",
      },
    ],
  },
  {
    _id: "prod-pixel-9-pro",
    title: "Google Pixel 9 Pro",
    brandName: "Google",
    model: "Pixel 9 Pro",
    category: "mobile phones",
    price: 389900,
    quantity: 10,
    processor: "Google Tensor G4",
    ram: "16GB",
    storage: "256GB",
    graphics: "Immortalis-G715",
    display: "6.7-inch LTPO OLED",
    description:
      "A clean Android flagship with top-tier computational photography and helpful AI-assisted features.",
    images: [phoneGallery[6], phoneGallery[7], phoneGallery[8]],
    reviews: [
      {
        name: "Kushan",
        ratings: 4,
        comment:
          "Camera quality is fantastic and the software feels smooth and simple to use.",
      },
      {
        name: "Nethmi",
        ratings: 5,
        comment:
          "Perfect if you want a polished Android experience without too much extra bloat.",
      },
    ],
  },
  {
    _id: "prod-oneplus-13",
    title: "OnePlus 13",
    brandName: "OnePlus",
    model: "OnePlus 13",
    category: "mobile phones",
    price: 314900,
    quantity: 14,
    processor: "Snapdragon 8 Elite",
    ram: "12GB",
    storage: "256GB",
    graphics: "Adreno GPU",
    display: "6.82-inch ProXDR AMOLED",
    description:
      "A fast Android flagship with rapid charging, smooth performance, and a clean everyday user experience.",
    images: [phoneGallery[9], phoneGallery[10]],
    reviews: [
      {
        name: "Ishara",
        ratings: 4,
        comment:
          "Charging speed is brilliant and gaming performance has been excellent so far.",
      },
      {
        name: "Jason",
        ratings: 5,
        comment:
          "Feels like a flagship without the absolute top-end price tag.",
      },
    ],
  },
  {
    _id: "prod-ipad-air-m2",
    title: "Apple iPad Air M2",
    brandName: "Apple",
    model: "iPad Air M2",
    category: "tablets",
    price: 279900,
    quantity: 12,
    processor: "Apple M2",
    ram: "8GB",
    storage: "128GB",
    graphics: "10-core Apple GPU",
    display: "11-inch Liquid Retina",
    description:
      "A lightweight tablet that balances portability, performance, and Apple Pencil support for study and creative work.",
    images: [tabletGallery[0], tabletGallery[1], tabletGallery[2]],
    reviews: [
      {
        name: "Piumi",
        ratings: 5,
        comment:
          "Perfect for notes, streaming, and sketching. It feels fast for everything I do.",
      },
      {
        name: "Dilan",
        ratings: 4,
        comment:
          "Portable and reliable. The battery life is strong for classes and travel.",
      },
    ],
  },
  {
    _id: "prod-galaxy-tab-s10-plus",
    title: "Samsung Galaxy Tab S10+",
    brandName: "Samsung",
    model: "Galaxy Tab S10+",
    category: "tablets",
    price: 329900,
    quantity: 7,
    processor: "MediaTek Dimensity 9300+",
    ram: "12GB",
    storage: "256GB",
    graphics: "Immortalis-G720",
    display: "12.4-inch Dynamic AMOLED 2X",
    description:
      "A premium Android tablet with a vivid display, included S Pen, and strong multitasking features.",
    images: [tabletGallery[3]],
    reviews: [
      {
        name: "Savin",
        ratings: 5,
        comment:
          "The screen is incredible for movies and the S Pen makes document markup easy.",
      },
      {
        name: "Tharushi",
        ratings: 4,
        comment:
          "A very capable work tablet. Multi-window mode has been great for productivity.",
      },
    ],
  },
  {
    _id: "prod-lenovo-tab-p12",
    title: "Lenovo Tab P12",
    brandName: "Lenovo",
    model: "Tab P12",
    category: "tablets",
    price: 149900,
    quantity: 18,
    processor: "MediaTek Dimensity 7050",
    ram: "8GB",
    storage: "128GB",
    graphics: "Mali-G68",
    display: "12.7-inch 3K LCD",
    description:
      "A roomy tablet for learning, browsing, and entertainment with solid value for families and students.",
    images: [tabletGallery[4]],
    reviews: [
      {
        name: "Anudi",
        ratings: 4,
        comment:
          "Great screen size for reading PDFs and watching lectures without spending too much.",
      },
      {
        name: "Ramesh",
        ratings: 4,
        comment:
          "Good value overall and the speakers are surprisingly decent for the price.",
      },
    ],
  },
  {
    _id: "prod-xiaomi-pad-7-pro",
    title: "Xiaomi Pad 7 Pro",
    brandName: "Xiaomi",
    model: "Pad 7 Pro",
    category: "tablets",
    price: 189900,
    quantity: 11,
    processor: "Snapdragon 8s Gen 3",
    ram: "8GB",
    storage: "256GB",
    graphics: "Adreno GPU",
    display: "11.2-inch 3.2K LCD",
    description:
      "A sharp, fast tablet built for streaming, casual productivity, and gaming with strong all-round performance.",
    images: [tabletGallery[5], tabletGallery[6]],
    reviews: [
      {
        name: "Kevin",
        ratings: 5,
        comment:
          "Very smooth for gaming and video, and the screen looks crisp and bright.",
      },
      {
        name: "Sanduni",
        ratings: 4,
        comment:
          "Feels modern and fast. It has been a great companion device for work and travel.",
      },
    ],
  },
  {
    _id: "prod-sony-wf-1000xm5",
    title: "Sony WF-1000XM5 Earbuds",
    brandName: "Sony",
    model: "WF-1000XM5",
    category: "accessories",
    price: 89900,
    quantity: 22,
    processor: "Integrated V2 processor",
    ram: "N/A",
    storage: "N/A",
    graphics: "N/A",
    display: "Touch controls with companion app",
    description:
      "Premium wireless earbuds with powerful noise cancellation, rich sound, and a comfortable compact design.",
    images: [accessoryGallery[0], accessoryGallery[1], accessoryGallery[2]],
    reviews: [
      {
        name: "Fawzan",
        ratings: 5,
        comment:
          "Noise cancelling is excellent and the sound quality feels detailed and balanced.",
      },
      {
        name: "Ruvini",
        ratings: 4,
        comment:
          "Comfortable for long listening sessions and very easy to carry around.",
      },
    ],
  },
  {
    _id: "prod-anker-prime-20k",
    title: "Anker Prime 20K Power Bank",
    brandName: "Anker",
    model: "Prime 20K 200W",
    category: "accessories",
    price: 54900,
    quantity: 26,
    processor: "Smart power management chipset",
    ram: "N/A",
    storage: "20,000mAh",
    graphics: "N/A",
    display: "Smart status display",
    description:
      "A high-output power bank for phones, tablets, and lightweight laptops with reliable fast charging.",
    images: [accessoryGallery[3], accessoryGallery[4]],
    reviews: [
      {
        name: "Thilina",
        ratings: 5,
        comment:
          "Charges everything quickly and still fits into my backpack without any issue.",
      },
      {
        name: "Madhavi",
        ratings: 4,
        comment:
          "A bit pricey, but it has been dependable for both my phone and tablet.",
      },
    ],
  },
  {
    _id: "prod-belkin-3in1-stand",
    title: "Belkin 3-in-1 Wireless Charging Stand",
    brandName: "Belkin",
    model: "BoostCharge Pro 3-in-1",
    category: "accessories",
    price: 69900,
    quantity: 9,
    processor: "Qi2 charging controller",
    ram: "N/A",
    storage: "N/A",
    graphics: "N/A",
    display: "LED charging indicators",
    description:
      "A neat bedside and desk charging station for a phone, smartwatch, and earbuds all in one place.",
    images: [accessoryGallery[5], accessoryGallery[6], accessoryGallery[7]],
    reviews: [
      {
        name: "Nirosha",
        ratings: 4,
        comment:
          "Keeps my desk tidy and makes overnight charging much more convenient.",
      },
      {
        name: "Adrian",
        ratings: 5,
        comment:
          "Solid build quality and the charging alignment is much easier than flat pads.",
      },
    ],
  },
  {
    _id: "prod-jbl-live-beam-3",
    title: "JBL Live Beam 3",
    brandName: "JBL",
    model: "Live Beam 3",
    category: "accessories",
    price: 45900,
    quantity: 17,
    processor: "Bluetooth audio chipset",
    ram: "N/A",
    storage: "N/A",
    graphics: "N/A",
    display: "Smart charging case display",
    description:
      "Feature-packed earbuds with punchy JBL sound, active noise cancellation, and an interactive charging case.",
    images: [accessoryGallery[8], accessoryGallery[9], accessoryGallery[10]],
    reviews: [
      {
        name: "Charith",
        ratings: 4,
        comment:
          "Fun sound signature and the smart case controls are more useful than I expected.",
      },
      {
        name: "Amaya",
        ratings: 5,
        comment:
          "Great everyday earbuds with strong battery life and easy controls.",
      },
    ],
  },
];

const normaliseText = (value = "") => value.toString().trim().toLowerCase();

export const resolveCatalogImage = (image) => {
  if (
    typeof image === "string" &&
    (image.startsWith("https://") ||
      image.startsWith("http://") ||
      image.startsWith("/"))
  ) {
    return image;
  }

  return FALLBACK_PRODUCT_IMAGE;
};

export const getProductById = (productId) =>
  productCatalog.find((product) => product._id === productId) || null;

export const queryProductCatalog = ({
  search = "",
  category = "",
  brand = "",
  price = "",
  sort = "",
  page = 1,
  limit,
} = {}) => {
  const searchQuery = normaliseText(search);
  const categoryQuery = normaliseText(category);
  const brandQuery = normaliseText(brand);
  const priceCap = Number(price) || null;
  const pageSize =
    typeof limit === "number" && limit > 0 ? limit : productCatalog.length;

  let filteredProducts = productCatalog.filter((product) => {
    if (categoryQuery && normaliseText(product.category) !== categoryQuery) {
      return false;
    }

    if (brandQuery && normaliseText(product.brandName) !== brandQuery) {
      return false;
    }

    if (priceCap && product.price > priceCap) {
      return false;
    }

    if (!searchQuery) {
      return true;
    }

    const searchableFields = [
      product.title,
      product.brandName,
      product.model,
      product.category,
      product.description,
      product.processor,
      product.storage,
      product.display,
    ];

    return searchableFields.some((field) =>
      normaliseText(field).includes(searchQuery),
    );
  });

  if (sort === "price") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "-price" || sort === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const totalCount = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    products: filteredProducts.slice(startIndex, startIndex + pageSize),
    totalCount,
    totalPages,
    page: currentPage,
  };
};
