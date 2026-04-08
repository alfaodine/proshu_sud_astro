const EMAIL_ENDPOINT = 'https://xu5va381hj.execute-api.us-east-1.amazonaws.com/sendEmail';

export async function sendEmail(data: {
  name: string;
  phone: string;
  comment?: string;
}): Promise<void> {

  await fetch(EMAIL_ENDPOINT, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      senderName: 'yatskevych.andrii@gmail.com',
      senderEmail: 'ellada74@gmail.com',
      message: `name: ${data.name}, tel:${data.phone}, msg: ${data.comment || ''}`,
      date: new Date(),
      subject: `Заявка от ${data.name}`,
    }),
  });
}
