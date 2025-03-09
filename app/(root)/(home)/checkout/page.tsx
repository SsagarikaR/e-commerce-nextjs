import MakeOrderPage from "@/app/components/orders/MakeOrder";

async function page({ searchParams }: { searchParams: { id?: string } }) {
  const params = await searchParams;
  const id = params.id || null;

  return (
    <div className=" max-h-screen overflow-auto">
      <MakeOrderPage id={id!} />
    </div>
  );
}

export default page;
