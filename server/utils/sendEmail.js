const mailjet = require('node-mailjet')
  .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

const sendEmail = async (to, subject, text) => {
  try {
    const request = mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_FROM,
              Name: "Christ Recruiter Portal",
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            TextPart: text,
          },
        ],
      });

    await request;
    console.log("✅ Email sent successfully via Mailjet");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;
