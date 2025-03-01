import { NextRequest,NextResponse } from "next/server";
import { checkToken,isAdmin } from "@/lib/midlleware/auth";
import {
  createBrandService,
  getBrandsService,
  updateBrandService,
  deleteBrandService,
} from "@/services/apiServices/brands";



// Controller to create a new brand
export const POST = async (req: NextRequest) => {
  const { brandName, brandThumbnail } = await req.json();
  const { isValid, decodedUser } = checkToken(req);
  
      if (!isValid) {
          return NextResponse.json({ error: "Unauthorized. Invalid or missing token." });
      }
    
      console.log(decodedUser); 
    
      const adminCheckResult = await isAdmin(req, decodedUser);
    
      if (adminCheckResult) {
          return adminCheckResult;  
      }

  try {
    if (!brandName || !brandThumbnail) {
        return NextResponse.json({ message: "Please enter all the required fields" });
    }
    
    // Call service to create a new brand
    const result = await createBrandService(brandName, brandThumbnail);
    if (result.success) {
        return NextResponse.json({ message: result.message });
    } else {
        return NextResponse.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Please try again after some time" });
  }
};





// Controller to get brands (by name or all brands)
export const GET = async (req: NextRequest) => {
    const url = new URL(req.url);
    const name = url.searchParams.get('name');

  try {
    const result = await getBrandsService(name ? String(name) : undefined);
    if (result.success) {
        return NextResponse.json(result.brands);
    } else {
        return NextResponse.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Please try again after some time!" });
  }
};





// Controller to update an existing brand
export const PATCH = async (req: NextRequest) => {
  const { brandID, brandName, brandThumbnail } = await req.json();
  const { isValid, decodedUser } = checkToken(req);
  
      if (!isValid) {
          return NextResponse.json({ error: "Unauthorized. Invalid or missing token." });
      }
    
      console.log(decodedUser); 
    
      const adminCheckResult = await isAdmin(req, decodedUser);
    
      if (adminCheckResult) {
          return adminCheckResult;  
      }
  try {
    const result = await updateBrandService(brandID, brandName, brandThumbnail);
    if (result.success) {
        return NextResponse.json({ message: result.message });
    } else {
        return NextResponse.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Please try again after some time." });
  }
};





// Controller to delete an existing brand
export const DELETE = async (req: NextRequest) => {
  const { brandID } =await req.json();
  const { isValid, decodedUser } = checkToken(req);
  
      if (!isValid) {
          return NextResponse.json({ error: "Unauthorized. Invalid or missing token." ,status:401});
      }
    
      console.log(decodedUser); 
    
      const adminCheckResult = await isAdmin(req, decodedUser);
    
      if (adminCheckResult) {
          return adminCheckResult;  
      }

  try {
    const result = await deleteBrandService(brandID);
    if (result.success) {
        return NextResponse.json({ message: result.message,status:200 });
    } else {
        return NextResponse.json({ message: result.message,status:400  });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Please try again after some time!",status:500 });
  }
};