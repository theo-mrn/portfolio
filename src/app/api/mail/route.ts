import { NotionMagicLinkEmail } from '../../../../react-email-starter/emails/notion-magic-link';
import { Resend } from 'resend';
import { config } from '../../config';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, subject, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: config.email,
      subject: `Contact Form: ${subject}`,
      react: NotionMagicLinkEmail({ name, subject, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}