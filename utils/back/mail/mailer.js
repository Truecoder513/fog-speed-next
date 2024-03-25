const nodemailer = require("nodemailer");

let brevoToken = {
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.smtpEmail,
    pass: process.env.smtpPassword,
  },
};

const transporter = nodemailer.createTransport(brevoToken);

function bodyWrapper(template) {
  const { title, content } = template;
  return `
      <body style="margin: 0; padding: 0">
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="font-family: Arial, sans-serif"
      >
        <tr>
          <td>
            <table
              class="container"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background-color: #ffffff;
                border-radius: 4px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              "
            >
              <tr>
                <td
                style="
                padding: 20px;
                background-color: #34aadc;
                color: #ffffff;
                font-size: 20px;
                text-align: center;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
              "
                >
                  FOG club otaku speed dating
                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 20px">
                  ${content}
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 20px;
                    background-color: #f4f4f4;
                    color: #666666;
                    font-size: 12px;
                    text-align: center;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                  "
                >
                  <p>
               Si vous avez reçu ce message par erreur, veuillez nous en informer et
                    supprimer ce courrier électronique.
                  </p>
                  <p>
                   Cotonou | République du Bénin
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
      `;
}

// <h1 style="font-size: 14px">${title}</h1>

exports.mailSetter = async (template, receiver) => {
  // create reusable transporter object using the default SMTP transport
  let info = await transporter.sendMail({
    from: process.env.contactMail, // sender address
    to: receiver, // list of receivers
    subject: template.title, // Subject line
    html: bodyWrapper(template),
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
