exports.registrationSuccessMail = () => {
  return {
    title: "Inscription réussie au FOG Club Otaku Speed Dating",
    content: `
    <p>Cher membre du FOG Club Otaku Speed Dating,</p>
    <p>Nous sommes ravis de vous informer que votre inscription au FOG Club Otaku Speed Dating a été réussie!</p>
    <p>Vous faites désormais partie de notre communauté passionnée d'otakus qui recherchent des rencontres amusantes et intéressantes.</p>
    <p>Restez à l'écoute pour les prochaines mises à jour, événements et annonces concernant nos activités.</p>
    <p>Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter. Nous sommes là pour vous aider et pour vous assurer une expérience agréable au sein de notre club.</p>
    <p>Merci de votre inscription et à bientôt!</p>
    <p>Cordialement,<br> L'équipe du FOG Club Otaku Speed Dating</p>
    `,
  };
};

exports.newRegistrationNotification = (userName, groupName) => {
  return {
    title: "Nouvelle inscription dans votre groupe de rencontre",
    content: `
    <p>Bonjour ${userName},</p>
    <p>Nous sommes heureux de vous informer qu'une nouvelle inscription a été enregistrée dans le groupe de rencontre "${groupName}".</p>
    <p>Vous avez maintenant l'opportunité de rencontrer d'autres otakus partageant vos passions et vos intérêts!</p>
    <p>Restez à l'écoute pour participer à nos prochains événements et activités!</p>
    <p>Merci et à bientôt!</p>
    <p>Cordialement,<br> L'équipe du FOG Club Otaku Speed Dating</p>
    `,
  };
};

exports.adminNotificationMail = (userData) => {
  return {
    title: "Nouvelle inscription au FOG Club Otaku Speed Dating",
    content: `
    <p>Bonjour,</p>
    <p>Une nouvelle inscription a été effectuée au FOG Club Otaku Speed Dating.</p>
    <p>Voici les détails de l'utilisateur :</p>
    <ul>
      <li><strong>Surnom:</strong> ${userData.name}</li>
      <li><strong>Email:</strong> ${userData.email}</li>
      <li><strong>Choix:</strong> ${userData.sondageChoice}</li>
     
    </ul>
    <p>Veuillez prendre les mesures nécessaires pour accueillir et gérer cette nouvelle inscription.</p>
    <p>Merci.</p>
    `,
  };
};
