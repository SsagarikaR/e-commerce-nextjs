

async function page({params}:{params:{id:string}}) {
    const {id}=await params;
    
    return (
      <div>
        Hello{id}
      </div>
    )
}

export default page
