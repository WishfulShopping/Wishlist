import connect from '../../../lib/database';


export default async (req, res) => {
  const [id, item] = req.query.id;
  const to = req.query.to;
  const source = connect(id); 
  const target = id == to ? source : connect(to); 
  const doc = await source.getObject(`/${item}`);
    
  if (req.query['change[category]']) {
      doc['category'] = req.query['change[category]'];
  }

  await target.push(`/${item}`, doc, true);
  res.status(200).send("");
}
