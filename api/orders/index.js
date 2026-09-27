import Database from 'better-sqlite3';

const DB_PATH = '/tmp/orders.db';

function getDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  return db;
}

function ensureDb() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      items JSON NOT NULL,
      order_type TEXT NOT NULL,
      subtotal INTEGER NOT NULL,
      tax INTEGER NOT NULL,
      total INTEGER NOT NULL,
      status TEXT DEFAULT 'new',
      customer_name TEXT,
      phone TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT (datetime('now', 'localtime'))
    )
  `);
  return db;
}

export default async function handler(req, res) {
  const db = ensureDb();

  try {
    if (req.method === 'GET') {
      const statusFilter = req.query.status;
      let rows;
      if (statusFilter) {
        rows = db.prepare('SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC').all(statusFilter);
      } else {
        rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
      }
      return res.json({ orders: rows });
    }

    if (req.method === 'POST') {
      const { items, order_type, subtotal, tax, total, customer_name, phone, notes } = req.body;

      if (!items || !total) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const stmt = db.prepare(`
        INSERT INTO orders (items, order_type, subtotal, tax, total, customer_name, phone, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        JSON.stringify(items),
        order_type || 'dinein',
        subtotal || 0,
        tax || 0,
        total,
        customer_name || null,
        phone || null,
        notes || null
      );

      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid);
      return res.status(201).json({ order });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Database error' });
  } finally {
    db.close();
  }
}
