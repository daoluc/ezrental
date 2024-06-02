import { connectToDB } from "@/lib/mongodb";
import { ItemModel } from "@/schemas/item";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { itemid: string } }
) {
  try {
    await connectToDB();

    const itemid = params.itemid;

    let deleteResult = await ItemModel.findByIdAndDelete(itemid);

    if (deleteResult) {
      /* make sure delete the photos  */

      return NextResponse.json({
        message: "Item deleted",
      });
    } else {
      return NextResponse.json({ message: "item not found" });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to delete item", { status: 500 });
  }
}
