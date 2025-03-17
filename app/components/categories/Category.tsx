import CategoryCard from "./CategoryCard";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const getAllCategories = async () => {
  const categories = await unAuthorizedGetRequest("categories");
  return categories;
};

async function Category() {
  const categories: categories[] = await getAllCategories();
  console.log("Fetched categories:", categories);

  return (
    <div className="pt-24 dark:bg-gray-700 lg:px-32 xl:px-36 flex flex-col gap-y-1 px-4">
      <div className="text-3xl flex flex-col gap-y-3 text-center font-serif mb-2 dark:text-white">
        <div className="font-serif tracking-wider font-semibold">
          Categories
        </div>
      </div>

      {/* Grid View on Small Screens */}
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {categories.map((item, key) => (
          <CategoryCard
            key={key}
            id={
              process.env.DATABASE === "mongodb" ? item._id! : item.categoryID!
            }
            categoryName={item.categoryName}
            categoryThumbnail={item.categoryThumbnail}
          />
        ))}
      </div>

      {/* Carousel for Medium+ Screens */}
      {categories && categories.length > 0 && (
        <div className="hidden sm:block">
          <Carousel
            className="relative overflow-visible"
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent className="flex">
              {categories.map((item, key) => (
                <CarouselItem
                  key={key}
                  className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
                >
                  <CategoryCard
                    id={
                      process.env.DATABASE === "mongodb"
                        ? item._id!
                        : item.categoryID!
                    }
                    categoryName={item.categoryName}
                    categoryThumbnail={item.categoryThumbnail}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Previous Button */}
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out">
              <span className="text-2xl">←</span>
            </CarouselPrevious>

            {/* Custom Next Button */}
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out">
              <span className="text-2xl">→</span>
            </CarouselNext>
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default Category;
