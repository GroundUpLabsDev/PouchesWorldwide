import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { to, subject, text } = body;

    if (!to || !subject || !text) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.DEFAULT_FROM,
      to,
      subject,
      text,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending email" }), { status: 500 });
  }
}
