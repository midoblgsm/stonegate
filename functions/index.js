const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailUser = defineSecret('GMAIL_USER');
const gmailPass = defineSecret('GMAIL_APP_PASSWORD');

exports.sendQuoteEmail = onDocumentCreated(
  {
    document: 'quotes/{quoteId}',
    secrets: [gmailUser, gmailPass],
  },
  async (event) => {
    const quote = event.data.data();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser.value(),
        pass: gmailPass.value(),
      },
    });

    await transporter.sendMail({
      from: `"Stonegate Website" <${gmailUser.value()}>`,
      to: 'stonegatelines@gmail.com',
      subject: `New Quote Request — ${quote.name}`,
      html: buildEmailHtml(quote),
    });
  }
);

function buildEmailHtml(q) {
  const submitted = q.submittedAt
    ? new Date(q.submittedAt.toDate()).toLocaleString('en-US', { timeZone: 'America/Chicago' }) + ' CT'
    : 'Unknown';

  const rows = [
    ['Name',     q.name],
    ['Email',    q.email],
    ['Phone',    q.phone    || '—'],
    ['Pickup',   q.pickup],
    ['Delivery', q.delivery],
    ['Details',  q.details  || '—'],
    ['Submitted', submitted],
  ];

  const tableRows = rows.map(([label, value], i) => `
    <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f9f9f9'}">
      <td style="padding:10px 14px;font-weight:600;white-space:nowrap;color:#555">${label}</td>
      <td style="padding:10px 14px;color:#222">${value}</td>
    </tr>`).join('');

  return `
    <div style="font-family:sans-serif;max-width:620px;margin:0 auto;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden">
      <div style="background:#c8922a;padding:24px 28px">
        <h2 style="margin:0;color:#fff;font-size:20px;letter-spacing:0.05em">STONEGATE</h2>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:14px">New Quote Request</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        ${tableRows}
      </table>
      <div style="padding:16px 28px;background:#fafafa;border-top:1px solid #e0e0e0;font-size:12px;color:#999">
        Submitted via stonegate website
      </div>
    </div>`;
}
