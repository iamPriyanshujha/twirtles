const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Initialize Nodemailer transporter lazily to prevent crashing if credentials are not configured yet
const getMailTransporter = () => {
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;

  if (!user || !pass) {
    console.log('⚠️  NOTE: NODEMAILER_USER or NODEMAILER_PASS is not set in environment variables. Email notifications will be mock-logged to server console.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail', // Standard configuration for Gmail; can be general SMTP (e.g. Hostinger, Mailgun, Outlook)
    auth: {
      user: user,
      pass: pass
    }
  });
};

// Initialize Twilio client lazily
const getTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.log('⚠️  NOTE: Twilio SMS configuration is incomplete in .env. SMS notifications will be mock-logged to server console.');
    return null;
  }

  try {
    return {
      client: twilio(accountSid, authToken),
      from: fromNumber
    };
  } catch (error) {
    console.error('Failed to initialize Twilio client:', error.message);
    return null;
  }
};

/**
 * Sends a notification SMS to the customer using Twilio.
 * @param {string} toPhone Registered number
 * @param {string} message Summary message text
 */
const sendSMS = async (toPhone, message) => {
  const twilioObj = getTwilioClient();
  if (!twilioObj) {
    console.log(`[SIMULATED SMS to ${toPhone}]: "${message}"`);
    return;
  }

  try {
    // Basic sanitization of Indian mobile numbers
    let formattedPhone = toPhone.trim();
    if (!formattedPhone.startsWith('+')) {
      if (formattedPhone.length === 10) {
        formattedPhone = '+91' + formattedPhone;
      } else {
        formattedPhone = '+' + formattedPhone;
      }
    }

    const response = await twilioObj.client.messages.create({
      body: message,
      from: twilioObj.from,
      to: formattedPhone
    });
    console.log(`✅ SMS delivered successfully! SID: ${response.sid}`);
  } catch (error) {
    console.error(`🚨 SMS dispatch error to ${toPhone}:`, error.message);
  }
};

/**
 * Dispatch automated order placed notification
 */
const notifyOrderPlacement = async (order) => {
  const transporter = getMailTransporter();
  const subject = `Twirtles Order Placed Successfully! (#${order._id})`;
  
  // Format order items for HTML body
  const itemsHtml = order.items
    .map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">x${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: #E12B2E; text-align: center; text-transform: uppercase;">Thank you for ordering, Munchie! 🐢🍿</h2>
      <p>Hi there,</p>
      <p>Your order at <strong>Twirtles</strong> has been placed successfully and is currently under processing! Here are your transaction details:</p>
      
      <div style="background-color: #faf7f2; padding: 15px; border-left: 4px solid #351D14; margin-bottom: 20px;">
        <strong>Order ID:</strong> ${order._id}<br/>
        <strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}<br/>
        <strong>Payment Status:</strong> ${order.paymentStatus.toUpperCase()}<br/>
        <strong>Shipping Address:</strong> ${order.shippingAddress}, ${order.city}<br/>
        <strong>Contact:</strong> ${order.phone}
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #351D14; color: white;">
            <th style="padding: 8px; text-align: left;">Item Name</th>
            <th style="padding: 8px; text-align: center;">Qty</th>
            <th style="padding: 8px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr>
            <td colspan="2" style="padding: 8px; text-align: right; font-weight: bold;">Grand Total:</td>
            <td style="padding: 8px; text-align: right; font-weight: bold; color: #E12B2E;">₹${order.total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <p>We'll notify you as soon as our munchies leave our premium fulfillment hub!</p>
      <hr style="border: 0; border-top: 1px solid #eee;" />
      <p style="font-size: 11px; color: #888; text-align: center;">Twirtles E-Commerce Private Limited. All rights reserved.</p>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Twirtles Snacks" <${process.env.NODEMAILER_USER}>`,
        to: order.userEmail,
        subject: subject,
        html: htmlContent
      });
      console.log(`✅ Confirmation email sent to: ${order.userEmail}`);
    } catch (error) {
      console.error(`🚨 Nodemailer failed to notify ${order.userEmail}:`, error.message);
    }
  } else {
    console.log(`[SIMULATED EMAIL to ${order.userEmail}] Subject: ${subject}`);
  }

  // Trigger real-time SMS
  const smsMessage = `Hi! Your Twirtles order #${order._id} of ₹${order.total.toFixed(2)} is received. Payment: ${order.paymentStatus.toUpperCase()}. Thanks for choosing us! 🐢`;
  await sendSMS(order.phone, smsMessage);
};

/**
 * Dispatch automated payment failure alert
 */
const notifyPaymentFailure = async (order, reason = 'Signature mismatch or gateway rejection') => {
  const transporter = getMailTransporter();
  const subject = `⚠️ Twirtles: Payment Failed for Order #${order._id}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: #ff3333; text-align: center; text-transform: uppercase;">Payment Attempt Failed 🚨</h2>
      <p>Hi,</p>
      <p>We noticed your payment attempt for order <strong>#${order._id}</strong> with amount <strong>₹${order.total.toFixed(2)}</strong> failed or was rejected by our gateway vendor.</p>
      <p><strong>Reason indicated:</strong> ${reason}</p>
      
      <p>Your order remains saved in your draft state. If this was a technical glitch, you can retry checkout under your Account panel anytime.</p>
      
      <p>If money was processed/debited from your account, please reach out to our team with your payment refer UTR reference for immediate assistance.</p>
      <hr style="border: 0; border-top: 1px solid #eee;" />
      <p style="font-size: 11px; color: #888; text-align: center;">Twirtles E-Commerce Support Team</p>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
         from: `"Twirtles Checkout" <${process.env.NODEMAILER_USER}>`,
         to: order.userEmail,
         subject: subject,
         html: htmlContent
      });
    } catch (error) {
      console.error('🚨 Error sending payment failure email:', error.message);
    }
  } else {
    console.log(`[SIMULATED EMAIL to ${order.userEmail}] Subject: ${subject}`);
  }

  const smsMessage = `Alert: Payment of ₹${order.total.toFixed(2)} for Twirtles order #${order._id} has failed. Please retry on our portal or contact support.`;
  await sendSMS(order.phone, smsMessage);
};

/**
 * Dispatch dispatch (completion) or decline order update from dashboard managers
 */
const notifyOrderStatusUpdate = async (order, newStatus) => {
  const transporter = getMailTransporter();
  const subject = `Twirtles Order Update: #${order._id} marked as [${newStatus.toUpperCase()}]`;

  let statusDescription = '';
  let statusHeroColor = '#242424';

  if (newStatus === 'completed') {
    statusDescription = '🎉 Your order has been successfully completed and delivered! We hope you love your Twirtles snacks & crispy Makhanas!';
    statusHeroColor = '#10B981'; // green
  } else if (newStatus === 'declined') {
    statusDescription = '✕ Your order could not be processed and has been declined by the owner/manager. If it was pre-paid, a complete refund will be posted back to your original source within 3-5 business days.';
    statusHeroColor = '#EF4444'; // red
  } else {
    statusDescription = `🚚 Your order is on its way! Its dispatch status has transitioned to: ${newStatus.toUpperCase()}.`;
    statusHeroColor = '#3B82F6'; // blue
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: ${statusHeroColor}; text-align: center; text-transform: uppercase;">Order Updated 📦</h2>
      <p>Hello Muncher,</p>
      <p>An update has been registered regarding your order <strong>#${order._id}</strong> at Twirtles:</p>
      
      <div style="padding: 15px; background-color: #f9f9f9; border-top: 3px solid ${statusHeroColor}; margin-bottom: 20px;">
        <p style="font-size: 14px; font-weight: bold; margin: 0; color: ${statusHeroColor};">${statusDescription}</p>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #555;">Amount Tracked: ₹${order.total.toFixed(2)}</p>
      </div>

      <p>Feel free to look up historic orders from your user profile timeline on our e-commerce platform.</p>
      <hr style="border: 0; border-top: 1px solid #eee;" />
      <p style="font-size: 11px; color: #888; text-align: center;">Twirtles Executive Fulfillment</p>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
         from: `"Twirtles Logistics" <${process.env.NODEMAILER_USER}>`,
         to: order.userEmail,
         subject: subject,
         html: htmlContent
      });
    } catch (error) {
      console.error('🚨 Error sending order status update email:', error.message);
    }
  } else {
    console.log(`[SIMULATED EMAIL to ${order.userEmail}] Subject: ${subject}`);
  }

  const smsMessage = `Twirtles Logistics: Your order #${order._id} is now ${newStatus.toUpperCase()}. Check your account timeline for details.`;
  await sendSMS(order.phone, smsMessage);
};

module.exports = {
  notifyOrderPlacement,
  notifyPaymentFailure,
  notifyOrderStatusUpdate,
  sendSMS
};
