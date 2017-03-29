import qs from 'querystring';
import fetch from 'isomorphic-fetch';

export const sendOTP = (phone, otp) => {
  const url = 'https://control.msg91.com/api/sendotp.php';
  const query = qs.stringify({
    authkey: process.env.SMS_AUTHKEY,
    mobiles: phone,
    message: `${otp} - пароль для входа на сайт`,
    sender: 'VERIFY',
    otp
  });

  return fetch(`${url}?${query}`)
  .then(resp => resp.json());
};
 