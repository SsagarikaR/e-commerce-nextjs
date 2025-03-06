import { category } from "@/constants";
import CategoryCard from "./CategoryCard";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";

const getAllCategories = async () => {
  const categories = await unAuthorizedGetRequest("categories");
  return categories;
};

async function Category() {
  const categories: categories[] = await getAllCategories();
  console.log("Fetched categories:", categories);

  return (
    <div className="pt-24 px-20">
      <div className="text-3xl md:text-left text-center font-serif font-semibold mb-2 text-gray-700 dark:text-white">
        Categories
      </div>
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 self-center sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10 ">
          {categories.map((item, key) => (
            <CategoryCard
              key={key}
              categoryID={item.categoryID}
              categoryName={item.categoryName}
              categoryThumbnail={item.categoryThumbnail}
            />
          ))}
        </div>
      ) : (
        <div>{category.NO_CATGEORY}</div>
      )}
    </div>
  );
}

export default Category;
