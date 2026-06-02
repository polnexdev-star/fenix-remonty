import { createClient } from "@sanity/client";
import { Resend } from "resend";

const client = createClient({

  projectId: "mq7nx1p6",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

if (!process.env.SANITY_API_TOKEN) {
  return res.status(500).json({
    error: "Brak SANITY_API_TOKEN w Vercel",
  });
}

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, phone, message, filesLink, uploadedFiles = [] } = req.body;

    const result = await client.create({
      _type: "lead",
      name,
      phone,
      message,
      filesLink,
      uploadedFiles,
      createdAt: new Date().toISOString(),
    });

   const emailResult = await resend.emails.send({
  from: "FENIX <kontakt@mail.fenixremonty.pl>",
  to: "infobiuro.fenix@gmail.com",
  subject: "Nowe zapytanie ze strony FENIX",
  html: `
    <h2>Nowe zapytanie ze strony</h2>

    <p><strong>Imię:</strong> ${name}</p>

    <p><strong>Telefon:</strong> ${phone}</p>

    <p><strong>Wiadomość:</strong></p>

    <p>${message}</p>

    <p><strong>Link do plików:</strong></p>

<p>${filesLink}</p>
<p><strong>Załączone pliki:</strong></p>

<ul>
  ${uploadedFiles
    .map((url) => `<li><a href="${url}">${url}</a></li>`)
    .join("")}
</ul>
  `,
});

console.log("Resend result:", emailResult);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}