
import { uid } from 'uid/secure';
import fs from 'fs';

export default async (req, res) => {
  const id = uid(32);
    fs.mkdirSync(`data/${Buffer.from(id).toString('base64')}`);

  return res.redirect(302, `../list/${id}`).end()
}
