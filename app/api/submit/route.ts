export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { addRow } from "../../lib/googleSheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, answers } = body;

    const row = {
  name: name,
  email: email,
  ...answers,
};

    await addRow(row);

    return Response.json({ message: "Saved" });
  } catch (error) {
    console.error("Error saving to sheet:", error);
    return Response.json({ message: "Error saving data" }, { status: 500 });
  }
}