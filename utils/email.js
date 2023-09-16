const nodemailer = require('nodemailer'); // medium/package for sending mail
const pug = require('pug');
const { htmlToText } = require('html-to-text');

// EMAIL CLASS FOR SENDING EMAIL
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `ShopMe <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // Create a transport(medium) to send email
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template.
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html, {
        wordwrap: 130,
      }),
    };

    // 3) Create a tansport and send a email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the ShopMe Family!');
  }

  async sendOrderResponse() {
    await this.send('order', 'Thank you for ordering 👐');
  }
};
