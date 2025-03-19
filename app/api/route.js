import { connectDB } from "@/lib/config/db";
import { TodoModel } from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();
export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos: todos });
}

export async function POST(request) {
  const { title, description } = await request.json();

  await TodoModel.create({
    title,
    description,
  });

  return NextResponse.json({ msg: "Todo created Successfully" });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Todo successfully deleted" });
}

export async function PUT(request) {
  const id = await request.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndUpdate(id, {
    $set: {
      isCompleted: true,
    },
  });
  return NextResponse.json({ msg: "Todo successfully updated" });
}
