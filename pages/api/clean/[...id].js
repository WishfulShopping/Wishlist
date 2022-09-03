
import fs from 'fs'
import connect from '../../../lib/database';



export default async (req, res) => {
  const [id, item] = req.query.id;
  const path = Buffer.from(id).toString('base64');
  fs.rmdir(`data/${path}`, { recursive: true } ,console.log);
  res.status(200).send("");
}
