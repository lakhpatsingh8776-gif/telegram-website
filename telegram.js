exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name and message required" })
      };
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text = `New Form Submission:
Name: ${name}
Email: ${email || "Not provided"}
Message: ${message}`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text })
      }
    );

    if (!response.ok) {
      return { statusCode: 500, body: "Telegram send failed" };
    }

    return { statusCode: 200, body: "Message sent" };
  } catch {
    return { statusCode: 400, body: "Invalid request" };
  }
};