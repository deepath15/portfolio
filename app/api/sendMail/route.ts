import { log } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    if(email === process.env.EMAIL_USER){
      return NextResponse.json({message : "You can't use my email id"}  )
    }
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #eee; border-radius:8px; padding:24px;">
        <h2 style="color:#1976d2; margin-bottom: 16px;">New Contact Form Submission</h2>
        <table style="width:100%; margin-bottom: 24px;">
          <tr>
            <td style="font-weight:bold; padding: 4px 8px;">Name:</td>
            <td style="padding: 4px 8px;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; padding: 4px 8px;">Email:</td>
            <td style="padding: 4px 8px;">${email}</td>
          </tr>
        </table>
        <div style="margin-bottom: 24px;">
          <div style="font-weight:bold; margin-bottom:8px;">Message:</div>
          <div style="background:#f9f9f9; border-radius:6px; padding:16px; color:#333; white-space:pre-line;">
            ${message}
          </div>
        </div>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
        <p style="font-size:14px; color:#888;">
          This message was sent from your portfolio contact form.<br>
          <span style="color:#1976d2;">Deepath Portfolio</span>
        </p>
      </div>
    `;

    const responseHtmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #eee; border-radius:8px; padding:24px;">
        <h2 style="color:#1976d2; margin-bottom: 16px;">Thank you for contacting Deepath Portfolio!</h2>
        <p style="font-size:16px; color:#333;">
          Hi <b>${name}</b>,<br><br>
          Thank you for reaching out. I have received your message and will contact you shortly.<br><br>
          <b>Your message:</b>
        </p>
        <div style="background:#f9f9f9; border-radius:6px; padding:16px; color:#333; white-space:pre-line; margin-bottom:24px;">
          ${message}
        </div>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
        <p style="font-size:14px; color:#888;">
          This is an automated confirmation from <span style="color:#1976d2;">Deepath Portfolio</span>.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "deepath1506@gmail.com",
      subject: `New message from ${name}: ${subject}`,
      text: message, 
      html: htmlTemplate, 
    });
    console.log('Email sent successfully');
    await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to: email,
      subject: `New message from ${name}: ${subject}`,
      text: message, 
      html: responseHtmlTemplate, 
    });
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error sending email', error: error.message },
      { status: 500 }
    );
  }
}
