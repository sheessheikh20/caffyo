/* ============================================================
   CAFFYO by Zauq - Barista Dashboard Logic
   Polls /api/orders and renders a live order board
   ============================================================ */

(function() {
  const DB_PATH_DISPLAY = '#CAFFYO-BARISTA-DASHBOARD';
  let currentFilter = 'new';
  let pollingInterval = null;
  let allOrders = [];

  // Init
  document.addEventListener('DOMContentLoaded', function() {
    fadeOutPreloader();
    bindFilters();
    fetchOrders(true);
    startPolling();
  });

  function fadeOutPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      preloader.style.transition = 'opacity 0.5s ease';
    }
  }

  function bindFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderOrders();
      });
    });
  }

  function startPolling() {
    pollingInterval = setInterval(() => fetchOrders(false), 10000);
  }

  async function fetchOrders(showLoader) {
    const url = showLoader ? '/api/orders' : `/api/orders`;
    const params = new URLSearchParams();
    if (currentFilter !== 'all') params.set('status', currentFilter);
    const fullUrl = params.toString() ? `/api/orders?${params.toString()}` : url;

    try {
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      allOrders = data.orders || [];
      renderOrders();
      updateTimestamp();
    } catch (err) {
      console.error('Fetch error:', err);
      renderOrders();
      updateTimestamp();
    }
  }

  function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container) return;

    const visible = currentFilter === 'all'
      ? allOrders
      : allOrders.filter(o => o.status === currentFilter);

    const emptyState = document.getElementById('empty-state');
    if (emptyState) emptyState.style.display = visible.length ? 'none' : 'block';

    if (visible.length === 0) {
      container.innerHTML = `
        <div class="empty-state" id="empty-state">
          <div class="empty-icon">☕</div>
          <h3>No orders yet</h3>
          <p>Waiting for orders from the counter…</p>
        </div>
      `;
      return;
    }

    container.innerHTML = visible.map(o => renderOrderCard(o)).join('');
  }

  function renderOrderCard(order) {
    let items;
    try { items = JSON.parse(order.items); } catch { items = []; }

    const statusMap = {
      new: 'New',
      preparing: 'Preparing',
      ready: 'Ready',
      completed: 'Completed'
    };

    const statusColor = {
      new: 'var(--status-new)',
      preparing: 'var(--status-preparing)',
      ready: 'var(--status-ready)',
      completed: 'var(--status-completed)'
    };

    const itemRows = items.map(item => `
      <div class="item-row">
        <span class="item-name">${escapeHtml(item.name)} <span class="item-qty">x${item.qty}</span></span>
        <span class="item-price">₹${item.price * item.qty}</span>
      </div>
    `).join('');

    const statusControls = order.status !== 'completed'
      ? `<div class="status-controls">
          ${['new','preparing','ready'].map(s =>
            `<button class="status-btn ${order.status === s ? 'active' : ''}"
              data-order-id="${order.id}" data-new-status="${s}">
              ${statusMap[s]}
            </button>`
          ).join('')}
          <button class="status-btn completed"
            data-order-id="${order.id}" data-new-status="completed">
            Complete
          </button>
        </div>`
      : `<div class="status-controls">
          <button class="status-btn completed active">Completed</button>
        </div>`;

    const createdAt = order.created_at
      ? new Date(order.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
      : '—';

    return `
      <div class="order-card" data-order-id="${order.id}">
        <div class="order-time">${createdAt}</div>
        <div class="order-header">
          <div class="order-number">#CZ-${order.id}</div>
          <div class="order-status-badge" style="--status-color: ${statusColor[order.status] || 'var(--gold-accent)'}">
            ${statusMap[order.status] || order.status}
          </div>
        </div>
        <div class="order-meta">
          <span>${order.order_type === 'dinein' ? '🍽️ Dine In' : order.order_type === 'takeaway' ? '🏃 Take Away' : '🚚 Delivery'}</span>
          ${order.customer_name ? `<span>👤 ${escapeHtml(order.customer_name)}</span>` : ''}
        </div>
        <div class="items-list">
          ${itemRows}
        </div>
        <div class="order-total">
          <span>Total</span>
          <span>₹${order.total}</span>
        </div>
        ${statusControls}
      </div>
    `;
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function updateTimestamp() {
    const el = document.getElementById('last-updated');
    if (el) {
      el.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
    }
  }

  // Event delegation for status buttons
  document.addEventListener('click', async function(e) {
    const btn = e.target.closest('.status-btn[data-order-id]');
    if (!btn) return;

    const orderId = btn.getAttribute('data-order-id');
    const newStatus = btn.getAttribute('data-new-status');

    await updateOrderStatus(orderId, newStatus);
  });

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      const data = await res.json();
      // Update local state
      const idx = allOrders.findIndex(o => o.id == orderId);
      if (idx !== -1) allOrders[idx] = data.order;

      renderOrders();
      updateTimestamp();
    } catch (err) {
      console.error('Status update error:', err);
    }
  }
})();
