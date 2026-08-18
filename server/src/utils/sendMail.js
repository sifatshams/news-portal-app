import { transporter } from '../config/transporter.js';

// Common Header & Footer Styles for Reusability
const emailLayout = (content) => `
  <div style="background-color: #f8fafc; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
      <div style="background-color: #0f172a; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">NEWS PORTAL</h1>
      </div>
      <div style="padding: 40px;">
        ${content}
      </div>
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
        <p>© 2026 News Portal App. All rights reserved.</p>
        <p>This is an automated message, please do not reply directly.</p>
      </div>
    </div>
  </div>
`;

// 1. Send Mail To Admin
export const sendAdminContactMail = async ({
  name,
  email,
  subject,
  message,
}) => {
  const content = `
    <h2 style="color: #0f172a; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; pb: 10px;">New Inquiry Received 📩</h2>
    <p style="margin-bottom: 10px;"><strong>Sender Name:</strong> ${name}</p>
    <p style="margin-bottom: 10px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
    <p style="margin-bottom: 20px;"><strong>Subject:</strong> ${subject}</p>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #0f172a; padding: 20px; border-radius: 8px;">
      <p style="margin: 0; font-weight: bold; color: #475569; margin-bottom: 8px;">Message Content:</p>
      <p style="margin: 0; line-height: 1.6; color: #1e293b;">${message}</p>
    </div>
    
    <div style="margin-top: 35px; text-align: center;">
  <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:${email}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="20%" stroke="f" fillcolor="#2563eb">
      <w:anchorlock/>
      <center>
  <![endif]-->
  <a href="mailto:${email}" 
     style="background: linear-gradient(to right, #2563eb, #1d4ed8); 
            background-color: #2563eb; 
            color: #ffffff; 
            padding: 16px 32px; 
            border-radius: 12px; 
            text-decoration: none; 
            font-weight: 700; 
            font-size: 16px;
            display: inline-flex; 
            align-items: center;
            box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
            border: 1px solid #1d4ed8;
            transition: all 0.3s ease;">
     <span style="margin-right: 8px;">✉️</span> 
     Reply to Sender
  </a>
  <!--[if mso]>
      </center>
    </v:roundrect>
  <![endif]-->
</div>
  `;

  await transporter.sendMail({
    from: `"News Portal Support" <${process.env.BREVO_SENDER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🔥 Action Required: New Message from ${name}`,
    html: emailLayout(content),
  });
};

// 2. Auto Reply Mail To User
export const sendUserAutoReplyMail = async ({ name, email }) => {
  const content = `
    <div style="text-align: center;">
      <div style="font-size: 50px; margin-bottom: 20px;">✅</div>
      <h2 style="color: #0f172a; margin-bottom: 16px;">Hello ${name}, We've got it!</h2>
      <p style="line-height: 1.6; color: #475569; font-size: 16px;">
        Thank you for reaching out to <strong>News Portal App</strong>. We’ve successfully received your message and our team is already looking into it.
      </p>
      <p style="line-height: 1.6; color: #475569; font-size: 16px; margin-bottom: 30px;">
        You can expect a response from us within 24-48 hours.
      </p>
      
      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px; color: #64748b;">Best Regards,</p>
        <p style="margin: 5px 0 0 0; font-weight: bold; color: #0f172a; font-size: 18px;">Sifat Portfolio Team</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"NEWS PORTAL APP" <${process.env.BREVO_SENDER}>`,
    to: email,
    subject: `Success! We've received your inquiry, ${name}`,
    html: emailLayout(content),
  });
};
