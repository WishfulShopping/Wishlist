import db from '../../lib/database';
export default async (req, res) => {

  const user = req.query.id;
  const data = await db(user).getData(`/`);
  return res.status(200).json(Object.entries(data).map(entry=>{return entry[1];}));
}
