
import connect from '../../../lib/database';



export default async (req, res) => {
  const [id, item] = req.query.id;
  const db = connect(id); 
  const doc = await db.getObject(`/${item}`);
  doc.images.push(doc.image);
  doc.image = doc.images.shift();
  db.push(`/${item}`, doc, true);
  res.status(200).send(doc.image);
}
