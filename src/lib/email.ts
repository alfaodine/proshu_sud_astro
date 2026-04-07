const EMAIL_ENDPOINT = 'https://xu5va381hj.execute-api.us-east-1.amazonaws.com/sendEmail';

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export async function sendEmail(data: {
  name: string;
  phone: string;
  comment: string;
  file?: File;
}): Promise<void> {
  const bs64 = data.file ? await toBase64(data.file) : '';
  const fileName = data.file ? data.file.name : '';

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
      message: `name: ${data.name}, tel:${data.phone}, msg: ${data.comment}`,
      base64Data: bs64,
      date: new Date(),
      fileName: fileName,
      subject: `Заявка от ${data.name}`,
    }),
  });
}
