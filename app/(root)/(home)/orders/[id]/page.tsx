import OrderDetails from "@/app/components/orders/OrderDetails";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="max-h-screen overflow-auto">
      <OrderDetails id={id} />
    </div>
  );
}

export default page;
