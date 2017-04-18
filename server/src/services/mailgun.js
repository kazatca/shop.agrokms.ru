import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

const base64 = txt => 
  new Buffer(txt, 'ascii').toString('base64');

const getFormData = form => 
  Object.keys(form).reduce(
    (result, key) => {
      result.append(key, form[key]);
      return result;
    }, 
    new FormData());

export const send = (to, subject, text) => {
  const emailFrom = process.env.MAILGUN_FROM;
  const apiKey = process.env.MAILGUN_KEY;
  const domain = process.env.MAILGUN_DOMAIN;

  // console.log(emailFrom);

  const formData = {
    from: emailFrom,
    to,
    subject,
    text
  };

  return fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    headers: {
      Authorization: 'Basic ' + base64(`api:${apiKey}`)
    },
    method: 'POST',
    body: getFormData(formData)
  })
  .then(resp => resp.json());
};
