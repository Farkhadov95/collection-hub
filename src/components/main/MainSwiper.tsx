import { Collection, ItemType } from "../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemCard from "../item-cards/ItemCard";
import "swiper/css";
import "swiper/css/bundle";
import { Box } from "@chakra-ui/react";
import { Autoplay } from "swiper/modules";
import CollectionCard from "../collection-card/CollectionCard";

type MainSwiperProp = {
  items?: ItemType[];
  collections?: Collection[];
};

const MainSwiper = ({ items, collections }: MainSwiperProp) => {
  if (items && collections) {
    console.log("Choose either items or collections, not both");
    return;
  }

  return (
    <Box>
      <Swiper
        modules={[Autoplay]}
        autoplay
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {items &&
          items.slice(0, 5).map((item) => (
            <SwiperSlide key={item._id}>
              <ItemCard item={item} />
            </SwiperSlide>
          ))}

        {collections &&
          collections.slice(0, 6).map((collection) => (
            <SwiperSlide key={collection._id}>
              <CollectionCard collection={collection} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default MainSwiper;
