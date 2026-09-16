import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      name,
      phone,
      email,
      organization,
      kitType,
      qualityTier,
      quantity,
      customNames,
      notes
    } = payload;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.ESTIMATE_NOTIFICATION_EMAIL || 'crownandcross29@gmail.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Crown & Cross <onboarding@resend.dev>';

    // Guard if API key is not yet provided by the owner
    if (!apiKey || apiKey === 're_placeholder_api_key') {
      return NextResponse.json(
        {
          error: 'Resend API key is not configured yet in .env.local',
          isConfigError: true
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const emailSubject = `👑 New Estimate Request: ${name} (${quantity || 10} kits - ${kitType || 'Team Kit'})`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0d140f; color: #f2f6f3; padding: 32px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #141e17; border: 1px solid #233428; border-radius: 16px; overflow: hidden;">
          <div style="background-color: #19271e; padding: 24px; border-bottom: 2px solid #c8a96a; text-align: center;">
            <h1 style="color: #c8a96a; margin: 0; font-size: 24px; letter-spacing: 0.04em;">CROWN &amp; CROSS</h1>
            <p style="color: #a4b6a9; font-size: 13px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 0.08em;">Bulk / Team Estimate Request</p>
          </div>

          <div style="padding: 28px;">
            <p style="font-size: 15px; color: #f2f6f3; margin-top: 0;">
              Hello Jason, a new wholesale / team estimate request was submitted on the website:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9; width: 40%;">Customer Name:</td>
                <td style="padding: 10px 0; color: #f2f6f3; font-weight: bold;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9;">WhatsApp Phone:</td>
                <td style="padding: 10px 0;">
                  <a href="https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9]/g, '')}" style="color: #4ade80; text-decoration: none; font-weight: bold;">
                    ${phone} (Chat on WhatsApp)
                  </a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9;">Customer Email:</td>
                <td style="padding: 10px 0; color: #f2f6f3;">${email || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9;">Team / Organization:</td>
                <td style="padding: 10px 0; color: #c8a96a; font-weight: bold;">${organization || 'Individual'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9;">Kit Type:</td>
                <td style="padding: 10px 0; color: #f2f6f3;">${kitType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9;">Quality Standard:</td>
                <td style="padding: 10px 0; color: #f2f6f3;">${qualityTier}</td>
              </tr>
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9;">Quantity:</td>
                <td style="padding: 10px 0; color: #c8a96a; font-weight: bold; font-size: 16px;">${quantity} kits</td>
              </tr>
              <tr style="border-bottom: 1px solid #233428;">
                <td style="padding: 10px 0; color: #a4b6a9;">Custom Printing:</td>
                <td style="padding: 10px 0; color: #f2f6f3;">${customNames}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #a4b6a9; vertical-align: top;">Notes &amp; Requirements:</td>
                <td style="padding: 10px 0; color: #f2f6f3; white-space: pre-wrap;">${notes || 'None specified.'}</td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 28px;">
              <a href="https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #22c55e; color: #0d140f; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-size: 14px;">
                Reply to Customer on WhatsApp →
              </a>
            </div>
          </div>

          <div style="background-color: #0a0f0c; padding: 16px; text-align: center; font-size: 12px; color: #6f8374; border-top: 1px solid #233428;">
            Crown &amp; Cross • Chennai, Tamil Nadu • "Wear Your Club. Wear Your Story."
          </div>
        </div>
      </div>
    `;

    const sendResult = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      subject: emailSubject,
      html: htmlContent,
      replyTo: email || recipient
    });

    if (sendResult.error) {
      console.error('Resend delivery error:', sendResult.error);
      return NextResponse.json(
        { error: sendResult.error.message || 'Failed to dispatch email' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      id: sendResult.data?.id,
      message: `Estimate request emailed to ${recipient} successfully.`
    });
  } catch (err) {
    console.error('Estimate API error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
