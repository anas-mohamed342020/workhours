export const generateHtml = (userName, otp, subject) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
            }
            .title {
                font-size: 20px;
                margin-top: 10px;
                color: #333;
            }
            .message {
                font-size: 16px;
                color: #666;
                margin: 15px 0;
            }
            .code-box {
                display: inline-block;
                background: #4CAF50;
                color: #ffffff;
                padding: 10px 20px;
                font-size: 18px;
                font-weight: bold;
                border-radius: 5px;
                margin-top: 10px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="logo">Artovia</div>
            <div class="title">${subject} on Artovia</div>
            <p class="message">Hello <span>${userName}</span>, thank you for joining us! Please use the following confirmation code to complete your account registration.</p>
            <div class="code-box">${otp}</div>
            <p class="footer">If you did not request this email, you can safely ignore it.<br> The Artovia Team</p>
        </div>
    </body>
    </html>`;
};
