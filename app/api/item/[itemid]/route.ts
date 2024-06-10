import { storageRef } from "@/lib/firebase";
import { connectToDB } from "@/lib/mongodb";
import { ItemModel } from "@/schemas/item";
import { Item } from "@/types";
import { deleteObject } from "firebase/storage";
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
      let item = deleteResult as unknown as Item;
      if (item.photos) {
        await Promise.all(item.photos.map(async (photo) => {
          const ref = storageRef(photo);
          await deleteObject(ref);
        }));
      }

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

export async function PATCH(
  req: Request,
  { params }: { params: { itemid: string } }
) {
  try {
    await connectToDB();

    const body = await req.json();

    const {
      itemname,
      itemcategory,
      itemdescription,
      hourly,
      daily,
      photos,
      status,
    } = body;

    console.log("Iam here!!!!35673546");
    console.log(params);

    const item = await ItemModel.findById(params.itemid);

    if (!item) {
      return new NextResponse("Item not found", { status: 404 });
    }

    item.name = itemname;
    item.category = itemcategory;
    item.description = itemdescription;
    item.price = { hourly, daily };
    item.photos = photos;
    item.status = status ? "Listed" : "Unlisted";

    await item.save();

    return new NextResponse("Item updated successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to update item", { status: 500 });
  }
}
