'use client';

import React from 'react';
import { ShoppingBag, Users, DollarSign, Package, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { CRUNIQUE_PRODUCTS } from '@/data/products';

export default function AdminDashboardPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'var(--bg-scene)', minHeight: '100vh' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>
              <ShieldCheck size={14} /> Enterprise Operations Center
            </span>
            <h1 className="heading-lg" style={{ color: 'var(--cream-silk)' }}>
              Admin Dashboard & Analytics
            </h1>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', fontWeight: 600 }}>
            Live Sync: PostgreSQL Database Active
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '1.8rem', borderRadius: '20px', border: '1px solid var(--border-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-bright)', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total Revenue</span>
              <DollarSign size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cream-silk)' }}>$124,850.00</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-green)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <TrendingUp size={14} /> +24.5% vs last month
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-bright)', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total Orders</span>
              <ShoppingBag size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cream-silk)' }}>3,420</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', marginTop: '0.4rem' }}>
              Avg Order Value: $36.50
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-bright)', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Customers</span>
              <Users size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cream-silk)' }}>8,940</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', marginTop: '0.4rem' }}>
              86% Repeat Family Buyers
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-bright)', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>5 Launch Fruits Stock</span>
              <Package size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cream-silk)' }}>42,500 Pouches</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-green)', marginTop: '0.4rem' }}>
              All 5 Launch Fruits Healthy Stock
            </div>
          </div>
        </div>

        {/* Live Inventory Overview Table */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="heading-md" style={{ color: 'var(--cream-silk)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
            5 Launch Fruit Inventory Status
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--gold-accent)' }}>
                  <th style={{ padding: '0.8rem' }}>Product Name</th>
                  <th style={{ padding: '0.8rem' }}>Category Collection</th>
                  <th style={{ padding: '0.8rem' }}>Price (50g)</th>
                  <th style={{ padding: '0.8rem' }}>Stock Status</th>
                  <th style={{ padding: '0.8rem' }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {CRUNIQUE_PRODUCTS.map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--cream-silk)' }}>
                    <td style={{ padding: '0.9rem', fontWeight: 700 }}>{prod.name}</td>
                    <td style={{ padding: '0.9rem', color: 'var(--cream-muted)' }}>{prod.collection}</td>
                    <td style={{ padding: '0.9rem', color: 'var(--gold-bright)', fontWeight: 600 }}>${prod.price.toFixed(2)}</td>
                    <td style={{ padding: '0.9rem', color: 'var(--primary-green)', fontWeight: 600 }}>In Stock (8,500 units)</td>
                    <td style={{ padding: '0.9rem' }}>⭐ {prod.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
