
import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

// client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async ({ to, subject, text }) => {
    // Re-configure api key inside function to ensure env is loaded
    client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    return emailApi.sendTransacEmail({
        sender: {
            email: process.env.SENDER_EMAIL,
            name: "PeerPath"
        },
        to: [{ email: to }],
        subject,
        textContent: text
    });
};
