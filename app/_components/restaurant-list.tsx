import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import RestaurantItem from "./restaurant-item";
interface IRestaurantListProps {
  category?: string;
}

const RestaurantList = async ({ category }: IRestaurantListProps) => {
  //TODO pegar restaurantes com maior numewro de pedidos
  const session = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  const restaurantsCategory = await db.restaurant.findMany({
    where: {
      categories: {
        some: {
          name: category,
        },
      },
    },
  });

  return (
    <div className="flex justify-center  ">
      <div className="flex  gap-4 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            userId={session?.user?.id}
          />
        ))}
      </div>
      <>
        <Carousel className=" hidden w-full lg:block ">
          <CarouselContent>
            {restaurantsCategory
              ? restaurantsCategory.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="lg:basis-1/3 ">
                    <RestaurantItem
                      key={restaurant.id}
                      restaurant={restaurant}
                      userId={session?.user?.id}
                    />
                  </CarouselItem>
                ))
              : restaurants.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="lg:basis-1/3 ">
                    <RestaurantItem
                      key={restaurant.id}
                      restaurant={restaurant}
                      userId={session?.user?.id}
                    />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </>
    </div>
  );
};

export default RestaurantList;
