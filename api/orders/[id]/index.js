import Database from 'better-sqlite3';

const DB_PATH = '/tmp/orders.db';

function getDb() {
  const db = new Database(DB_PATH);
  return db;
}

export default async function handler(req, res) {
  const { id } = req.query;
  const db = getDb();

  try {
    if (req.method === 'PATCH') {
      const { status } = req.body;
      const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
      stmt.run(status, id);
      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
      return res.json({ order });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Database error' });
  } finally {
    db.close();
  }
}
