import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "fileUrl é obrigatório" },
        { status: 400 }
      );
    }

    const response = await fetch(fileUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao baixar arquivo" },
        { status: response.status }
      );
    }

    const blob = await response.blob();

    const urlObj = new URL(fileUrl);
    let fileName = urlObj.pathname.split("/").pop() || "arquivo.ext";

    fileName = decodeURIComponent(fileName.split("?")[0]);

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
