import Products from "@/app/components/products/Products";


const Page = async ({ searchParams }: { searchParams: { category?: string; name?:string; page?: string } }) => {
  // Await searchParams to ensure we get its values before using them
  const params = await searchParams;

  // Parse the page number from query params, default to 1 if missing or invalid
  const page = parseInt(params.page || "1", 10);

  // Get category from query parameters
  const category = params.category || null;

  const name=params.name||null;

  console.log("Category from query params:", category);

 

  return (
    <div className="pt-36">
      <Products
      category={category!}
      page={page!}
      name={name!}
      />
    </div>
  );
};

export default Page;
