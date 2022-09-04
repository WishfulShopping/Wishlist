
import connect from '../../../lib/database';



export default async (req, res) => {
  const [id, item] = req.query.id;

  const db = connect(id); 
  await db.delete(`/${item}`);
  res.status(200).send("");
}
