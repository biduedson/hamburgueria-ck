const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();
const ownerId = "clwkxmhd90000n3t7so6h5y3q"; // Substitua pelo ID do proprietário

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec nisl lorem. Praesent pharetra, sapien ut fringilla malesuada, nisi felis ullamcorper ex, eu consectetur elit dolor sed dolor. Praesent orci mi, auctor aliquet semper vitae, volutpat quis augue. Cras porta sapien nec pharetra laoreet. Sed at velit sit amet mauris varius volutpat sit amet id mauris. Maecenas vitae mattis ante. Morbi nulla quam, sagittis at orci eu, scelerisque auctor neque.";

const createHamburgerRestaurant = async () => {
  const categoryHamburgers = await prismaClient.category.create({
    data: {
      name: "Hamburgers",
      imageUrl: "https://utfs.io/f/92918634-fc03-4425-bc1f-d1fbc8933586-vzk6us.png",
    },
  });

  const categoryDesserts = await prismaClient.category.create({
    data: {
      name: "Desserts",
      imageUrl: "https://utfs.io/f/92918634-fc03-4425-bc1f-d1fbc8933586-vzk6us.png",
    },
  });

  const categoryJuices = await prismaClient.category.create({
    data: {
      name: "Juices",
      imageUrl: "https://utfs.io/f/92918634-fc03-4425-bc1f-d1fbc8933586-vzk6us.png",
    },
  });

  const restaurantData = {
    name: "The Burger King",
    imageUrl: "https://utfs.io/f/020e448e-a7d8-433f-9622-cb3b68f34d48-p3apya.png",
    deliveryFee: 5,
    deliveryTimeMinutes: 30,
    owner: {
      connect: {
        id: ownerId,
      },
    },
    categories: {
      connect: [
        { id: categoryHamburgers.id },
        { id: categoryDesserts.id },
        { id: categoryJuices.id }
      ],
    },
  };

  const restaurant = await prismaClient.restaurant.create({
    data: restaurantData,
  });

  console.log(`Created ${restaurant.name}`);

  const hamburgerProducts = [
    {
      name: "Cheese Burger",
      price: 30,
      description: description,
      discountPercentage: 10,
      imageUrl: "https://utfs.io/f/ae177fa1-129c-4f43-9928-aa8ac1080a18-yqapzx.png",
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      category: {
        connect: {
          id: categoryHamburgers.id,
        },
      },
    },
    {
      name: "Double Cheese Burger",
      price: 40,
      description: description,
      discountPercentage: 7,
      imageUrl: "https://utfs.io/f/dca007fe-0025-422e-9328-16d40f0a1792-yqapzy.png",
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      category: {
        connect: {
          id: categoryHamburgers.id,
        },
      },
    },
    {
      name: "Bacon Burger",
      price: 35,
      description: description,
      discountPercentage: 5,
      imageUrl: "https://utfs.io/f/4cb1ca21-0748-4296-a23d-88e52687506a-yqapzz.png",
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      category: {
        connect: {
          id: categoryHamburgers.id,
        },
      },
    },
    {
      name: "Double Bacon Burger",
      price: 45,
      description: description,
      discountPercentage: 10,
      imageUrl: "https://utfs.io/f/ed9fde1e-0675-4829-8001-a775e2825dc6-yqaq00.png",
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      category: {
        connect: {
          id: categoryHamburgers.id,
        },
      },
    },
    {
      name: "Chicken Burger",
      price: 30,
      description: description,
      discountPercentage: 7,
      imageUrl: "https://utfs.io/f/0aff860a-3e05-42fd-9b2a-53d03c744949-yqaq01.png",
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      category: {
        connect: {
          id: categoryHamburgers.id,
        },
      },
    },
    {
      name: "Double Chicken Burger",
      price: 40,
      description: description,
      discountPercentage: 5,
      imageUrl: "https://utfs.io/f/d2157790-fcb7-4d09-b074-80af4bfb9892-yqaq02.png",
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      category: {
        connect: {
          id: categoryHamburgers.id,
        },
      },
    },
  ];

  for (const product of hamburgerProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

createHamburgerRestaurant().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prismaClient.$disconnect();
});