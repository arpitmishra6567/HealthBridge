// HealthBridge
import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting map (IP -> array of request timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Simple sanitization helper to strip HTML tags
function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .trim();
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // Basic IP rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               'anonymous';
    
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    
    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please wait a minute before submitting another message.',
          field: 'general'
        },
        { status: 429 }
      );
    }
    
    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request payload. Please submit valid form data.', field: 'general' },
        { status: 400 }
      );
    }

    const rawName = typeof body.name === 'string' ? body.name : '';
    const rawEmail = typeof body.email === 'string' ? body.email : '';
    const rawSubject = typeof body.subject === 'string' ? body.subject : '';
    const rawMessage = typeof body.message === 'string' ? body.message : '';

    const name = sanitize(rawName);
    const email = sanitize(rawEmail);
    const subject = sanitize(rawSubject);
    const message = sanitize(rawMessage);

    // Field-level validations
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name (at least 2 characters).', field: 'name' },
        { status: 400 }
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must not exceed 100 characters.', field: 'name' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.', field: 'email' },
        { status: 400 }
      );
    }
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g. name@domain.com).', field: 'email' },
        { status: 400 }
      );
    }
    if (email.length > 100) {
      return NextResponse.json(
        { error: 'Email address must not exceed 100 characters.', field: 'email' },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { error: 'Subject is required (at least 3 characters).', field: 'subject' },
        { status: 400 }
      );
    }
    if (subject.length > 150) {
      return NextResponse.json(
        { error: 'Subject must not exceed 150 characters.', field: 'subject' },
        { status: 400 }
      );
    }

    if (!message || message.length < 15) {
      return NextResponse.json(
        { error: 'Message must be at least 15 characters long.', field: 'message' },
        { status: 400 }
      );
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must not exceed 2000 characters.', field: 'message' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'support@healthbridge.demo';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'HealthBridge Contact <onboarding@resend.dev>';

    // If Resend API key is configured, execute real email dispatch via Resend REST API
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [receiverEmail],
            reply_to: email,
            subject: `[HealthBridge Contact] ${subject} - from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
                <h2 style="color: #0d9488;">New Contact Inquiry — HealthBridge</h2>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <p><strong>Sender Name:</strong> ${name}</p>
                <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #0d9488; border-radius: 4px;">
                  <h4 style="margin: 0 0 8px 0; color: #0f172a;">Message:</h4>
                  <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
                <small style="color: #64748b;">This message was submitted via the HealthBridge web platform contact form.</small>
              </div>
            `,
          }),
        });

        if (!resendRes.ok) {
          const resendError = await resendRes.json().catch(() => ({}));
          console.error('[HealthBridge Contact API] Resend API Error:', resendError);
          return NextResponse.json(
            {
              error: 'Failed to dispatch email via email service provider. Please try again later or reach out directly.',
              field: 'general'
            },
            { status: 502 }
          );
        }

        console.log(`[HealthBridge Contact API] Email dispatched successfully to ${receiverEmail} via Resend.`);
        return NextResponse.json({
          success: true,
          message: 'Thank you for contacting HealthBridge! Your message has been submitted successfully.',
          deliveryConfigured: true,
        });
      } catch (err: unknown) {
        console.error('[HealthBridge Contact API] Resend dispatch exception:', err);
        return NextResponse.json(
          {
            error: 'An unexpected communication error occurred while dispatching the message.',
            field: 'general'
          },
          { status: 500 }
        );
      }
    }

    // When RESEND_API_KEY is not configured:
    // Log the validated message securely to the server terminal.
    console.log('[HealthBridge Contact API] Contact inquiry logged (Provider not configured):', {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject,
      messageLength: message.length,
      note: 'Set RESEND_API_KEY in .env.local to enable live external email dispatch.'
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting HealthBridge! Your message has been submitted successfully.',
      deliveryConfigured: false,
      notice: 'Academic & Development Mode: Your submission was verified and logged on the server. External email forwarding is ready and activates once RESEND_API_KEY is configured in .env.local.',
    });
  } catch (error: unknown) {
    console.error('[HealthBridge Contact API] Fatal route error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.', field: 'general' },
      { status: 500 }
    );
  }
}

