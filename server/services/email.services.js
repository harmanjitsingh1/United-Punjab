import dotenv from "dotenv";
dotenv.config();

import SibApiV3Sdk from "sib-api-v3-sdk";
import { accountVerificationCode } from "../emails/accountVerificationCode.js";
import { resetPasswordCode } from "../emails/resetPasswordCode.js";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const templates = {
  accountVerificationCode,
  resetPasswordCode,
};

function renderTemplate(templateName, variables = {}) {
  const templateFn = templates[templateName];
  if (!templateFn) {
    throw new Error(`Email template '${templateName}' not found.`);
  }

  return templateFn(variables);
}

export const sendEmail = async (to, subject, templateName, variables = {}) => {
  const html = renderTemplate(templateName, variables);
  try {
    const sendSmtpEmail = {
      sender: { name: "United Punjab", email: process.env.SMTP_SENDER },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
