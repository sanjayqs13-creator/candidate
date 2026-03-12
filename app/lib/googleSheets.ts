import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

type RowData = Record<string, string>;

export async function addRow(data: RowData) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID!,
      serviceAccountAuth
    );

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Sheet1"];

    console.log("Adding row:", data);

    await sheet.addRow(data);

    console.log("Row successfully added!");
  } catch (error) {
    console.error("Error saving to sheet:", error);
  }
}