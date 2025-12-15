import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request): Promise<NextResponse> {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Fichier non trouvé." }, { status: 400 });
  }

  const filename = file.name;
  const contentType = file.type;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let processedBuffer;
    let finalContentType = contentType;
    const image = sharp(buffer);
    const metadata = await image.metadata();
    image.resize(800, 800, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    });

    if (metadata.format === "jpeg" || metadata.format === "jpg") {
      processedBuffer = await image
        .jpeg({ quality: 80, progressive: true })
        .toBuffer();
      finalContentType = "image/jpeg";
    } else if (metadata.format === "png") {
      processedBuffer = await image
        .png({
          compressionLevel: 9,
          palette: metadata.channels === 3 ? false : true,
        })
        .toBuffer();
      finalContentType = "image/png";
    } else if (metadata.format === "webp") {
      processedBuffer = await image.webp({ quality: 85 }).toBuffer();
      finalContentType = "image/webp";
    } else {
      processedBuffer = buffer;
    }

    const blob = await put(filename, processedBuffer, {
      access: "public",
      contentType: finalContentType,
    });

    return NextResponse.json(
      { url: blob.url, filename: blob.pathname },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur de compression/upload:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement ou de l'upload du fichier." },
      { status: 500 }
    );
  }
}
