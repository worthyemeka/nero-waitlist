# Backend Integration Guide - Resend Waitlist

This guide explains how to set up the backend endpoint for the nēro waitlist form using Resend.

## Environment Variables

Add these to your backend environment:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_TEMPLATE_ID=your_template_id
FROM_EMAIL=noreply@yourdomain.com
```

## API Endpoint

Create a `POST /api/waitlist` endpoint that:

1. Receives the email from the frontend
2. Triggers a Resend email using your pre-created template
3. Returns success/error response

## Example Implementation (Node.js/Express)

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Send welcome email using Resend template
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Welcome to nēro Waitlist!',
      // Use your pre-created Resend template
      react: null, // Template will be used instead
      // OR if you want to use a custom template:
      // react: WelcomeEmail({ email }), 
    });

    // Optionally: Store email in database
    // await db.waitlist.create({ email, signupDate: new Date() });

    res.status(200).json({ 
      success: true, 
      message: 'Successfully joined waitlist' 
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({ 
      error: 'Failed to join waitlist. Please try again.' 
    });
  }
});
```

## Example Implementation (Next.js API Route)

```typescript
// app/api/waitlist/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: 'Welcome to nēro Waitlist!',
      // Use your Resend template here
      react: null,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Successfully joined waitlist' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
```

## Resend Template Setup

1. Go to [Resend Dashboard](https://resend.com/emails)
2. Create a new email template
3. Design your welcome email with:
   - nēro branding
   - Confirmation message
   - Next steps or launch timeline
   - Social media links
4. Save the template and note the template ID
5. Use the template ID in your API endpoint

## Testing

Test the endpoint with:

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## Frontend Configuration

Update the frontend fetch URL in `src/app/components/waitlist-form.tsx`:

```typescript
const response = await fetch("YOUR_BACKEND_URL/api/waitlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email }),
});
```

Replace `YOUR_BACKEND_URL` with your actual backend URL (e.g., `https://api.yourdomain.com`).

## Security Recommendations

1. ✅ Never expose `RESEND_API_KEY` in client-side code
2. ✅ Validate email format on both frontend and backend
3. ✅ Implement rate limiting to prevent spam
4. ✅ Add CORS headers to allow only your frontend domain
5. ✅ Store emails in a database for analytics
6. ✅ Consider double opt-in to verify email addresses
7. ✅ Add honeypot field to prevent bot submissions
