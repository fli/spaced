import * as fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';

const sendgridData = {
  content: [
    {
      type: 'text/html',
      value: '',
    },
  ],
  from: {
    email: 'francis.s.li@gmail.com',
  },
  personalizations: [
    {
      subject: 'Confirm your email address to get started with Spaced!',
      to: [
        {
          email: '',
        },
      ],
    },
  ],
};

function buildEmail(email: string, token: string) {
  sendgridData.personalizations[0].to[0].email = email;
  const params = {
    token
  };
  sendgridData.content[0].value = `<p>
  You're nearly there! Click <a href="http://localhost:3000/verify?${stringify(params)}">here</a> to finish creating your account.
  </p>`;
  return JSON.stringify(sendgridData);
}

export default function sendVerificationEmail(email: string, token: string) {
  return fetch('https://api.sendgrid.com/v3/mail/send', {
      body: buildEmail(email, token),
      headers: new Headers({
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
}
