"use client";

import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  const { data } = useSession();
  const [showMessage, setShowMessage] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isSubmitLoading, setIsSubmiLoading] = useState(false);

  const openCloseDialog = () => {
    setIsConfirmDialogOpen(!isConfirmDialogOpen);
  };
  /*const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    setIsSubmiLoading(true);

    try {
      await toggleFavoriteRestaurant(data.user.id, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos seus favoritos."
          : "Restaurante adicionado aos seus favoritos.",
        {
          duration: 1200,
        }
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    } finally {
      setIsConfirmDialogOpen(false);
    }
  };*/
  return (
    <div
      className={cn(
        "flex min-w-[266px] max-w-[266px] items-center justify-center  lg:min-w-[210px] ",
        className
      )}
    >
      <div className="flex w-full flex-col space-y-3 ">
        {/*IMAGE*/}

        <div className="relative h-[136px] w-full lg:block lg:h-[165px] lg:w-[27vw] xl:w-[26vw]">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              className="rounded-lg object-cover "
              alt={restaurant.name}
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-semibold text-xs">5.0</span>
          </div>

          {data?.user.id && (
            <div
              className={`absolute right-2 top-2 flex h-7 w-7 cursor-pointer  items-center justify-center rounded-full  ${isFavorite ? "bg-red-700" : "bg-gray-500 hover:bg-gray-700 "} `}
              onClick={openCloseDialog}
              onMouseLeave={() => setShowMessage(false)}
              onMouseEnter={() => setShowMessage(true)}
            >
              <HeartIcon size={16} className="fill-white" />
            </div>
          )}
        </div>

        {/*TEXTO*/}
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            {/*CUSTO DE ENTREGA*/}
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={12} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            {/*TEMPO DE ENTREGA*/}
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={12} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="lg:flex lg:h-[179px] lg:w-[318px] lg:flex-col lg:items-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center"></AlertDialogTitle>
            <AlertDialogDescription className="text-center"></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={openCloseDialog}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RestaurantItem;
