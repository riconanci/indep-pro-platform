import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, isUnlocked } from "@/lib/currentUser";

type TemplateConfig = {
  filename: string;
  headers: string[];
  sampleRows: string[][];
};

const templateConfigs: Record<string, TemplateConfig> = {
  "expense-tracker": {
    filename: "expense-tracker.csv",
    headers: ["Date", "Category", "Description", "Amount", "Payment Method"],
    sampleRows: [
      ["2024-01-15", "Supplies", "Styling products from supplier", "85.00", "Business Card"],
      ["2024-01-18", "Tools", "New clipper blades", "45.00", "Cash"],
      ["2024-02-01", "Booth Rent", "February booth rental", "400.00", "Check"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
  },
  "income-log": {
    filename: "income-log.csv",
    headers: ["Date", "Client", "Service", "Amount", "Collection Method"],
    sampleRows: [
      ["2024-01-15", "", "Haircut + beard trim", "45.00", "Direct - Cash"],
      ["2024-01-15", "", "Fade", "35.00", "Direct - Card"],
      ["2024-01-16", "", "Haircut", "30.00", "Shop collected"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
  },
};

function escapeCSV(value: string): string {
  // If value contains comma, newline, or quote, wrap in quotes and escape internal quotes
  if (value.includes(",") || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function generateCSV(config: TemplateConfig): string {
  const rows: string[] = [];

  // Header row
  rows.push(config.headers.map(escapeCSV).join(","));

  // Sample data rows
  for (const row of config.sampleRows) {
    rows.push(row.map(escapeCSV).join(","));
  }

  // Add more empty rows for user to fill in
  const emptyRow = config.headers.map(() => "").join(",");
  for (let i = 0; i < 20; i++) {
    rows.push(emptyRow);
  }

  return rows.join("\n");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Check authentication and entitlement
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isUnlocked(user)) {
    return NextResponse.json(
      { error: "Unlock required to download templates" },
      { status: 403 }
    );
  }

  // Get template config
  const config = templateConfigs[slug];

  if (!config) {
    return NextResponse.json(
      { error: "Template not found" },
      { status: 404 }
    );
  }

  // Generate CSV content
  const csvContent = generateCSV(config);

  // Return as downloadable file
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${config.filename}"`,
    },
  });
}
