import { Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = (props) => {
  const {
    room: { coverImage, name, price, type, description, slug, isBooked },
  } = props;

  return (
    <div className="rounded-xl max-w-[25rem] w-full mb-10 mx-auto overflow-hidden text-black shadow-xl">
      <div className="h-60 overflow-hidden">
        <Image
          src={coverImage.url}
          alt={name}
          width={250}
          height={250}
          className="img scale-animation"
        />
      </div>

      <div className="p-10 md:p-6 bg-white">
        <div className="flex justify-between text-xl font-semibold">
          <p className="truncate">{name}</p>
          <p>${price}</p>
        </div>

        <p className="pt-2 text-xs capitalize">{type} Room</p>
        <p className="pt-3 pb-6 text-justify">{description.slice(1, 100)}...</p>

        <Link
          href={`/rooms/${slug.current}`}
          className="bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
        >
          {isBooked ? "BOOKED" : "BOOK NOW"}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
