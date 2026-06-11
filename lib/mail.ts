// Minimal mail layer: uses Resend's HTTP API when RESEND_API_KEY is set,
// otherwise logs the email to the server console (dev fallback).

interface MailInput {
  to: string;
  subject: string;
  html: string;
}

const FROM = process.env.EMAIL_FROM || "Shri Sameya Village <onboarding@resend.dev>";

export async function sendMail({ to, subject, html }: MailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[mail:dev] To: ${to} | Subject: ${subject}\n${html}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mail send failed (${res.status}): ${body}`);
  }
}

/** Fire-and-forget wrapper: email failures must never fail the request. */
export function sendMailInBackground(input: MailInput): void {
  sendMail(input).catch((err) => {
    console.error(`Failed to send email "${input.subject}" to ${input.to}:`, err);
  });
}

// ── Templates ────────────────────────────────────────────────────────────────

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function layout(content: string): string {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #292524;">
    <h2 style="color: #d97706; margin-bottom: 4px;">Shri Sameya Village</h2>
    <p style="color: #78716c; font-size: 13px; margin-top: 0;">Pure cold-pressed oils, farm to kitchen</p>
    <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 16px 0;" />
    ${content}
    <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 24px 0 12px;" />
    <p style="color: #a8a29e; font-size: 12px;">If you did not expect this email, you can safely ignore it.</p>
  </div>`;
}

export function welcomeEmail(name: string | null): { subject: string; html: string } {
  return {
    subject: "Welcome to Shri Sameya Village",
    html: layout(`
      <p>Hi ${name ?? "there"},</p>
      <p>Your account is ready. Browse our cold-pressed oils and place your first order whenever you like.</p>
      <p><a href="${APP_URL}/products" style="display: inline-block; background: #d97706; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">Shop oils</a></p>
    `),
  };
}

export function orderConfirmationEmail(orderId: string, totalAmount: number): { subject: string; html: string } {
  const shortId = orderId.slice(0, 8).toUpperCase();
  return {
    subject: `Order #${shortId} confirmed`,
    html: layout(`
      <p>Thank you for your order!</p>
      <p>Order <strong>#${shortId}</strong> has been placed for a total of <strong>&#8377;${totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>.</p>
      <p>You can track its status from your account at any time.</p>
      <p><a href="${APP_URL}/orders/${orderId}" style="display: inline-block; background: #d97706; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">View order</a></p>
    `),
  };
}

export function passwordResetEmail(resetUrl: string): { subject: string; html: string } {
  return {
    subject: "Reset your password",
    html: layout(`
      <p>We received a request to reset your password. This link expires in 1 hour.</p>
      <p><a href="${resetUrl}" style="display: inline-block; background: #d97706; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reset password</a></p>
      <p style="font-size: 13px; color: #78716c;">If the button doesn't work, copy this link into your browser:<br/>${resetUrl}</p>
    `),
  };
}
