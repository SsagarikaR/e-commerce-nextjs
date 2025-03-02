import MakeOrderPage from '@/app/components/orders/MakeOrder';


async function page({searchParams}:{searchParams:{id?:string}}) {
    const params=await searchParams;
    const id=params.id||null;

  return (
    <div>
      <MakeOrderPage id={id!}/>
    </div>
  )
}

export default page
