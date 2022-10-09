import { NextApiRequest, NextApiResponse } from 'next'

import { uid } from 'uid/secure';
import fs from 'fs';

export default async (req, res) => {
  const id = uid(32);
  try {
    fs.mkdirSync(`data/${Buffer.from(id).toString('base64')}`);
  } catch (e) {
    console.log(e);
  }
  return res.redirect(302, `../list/${id}`).end()
}
