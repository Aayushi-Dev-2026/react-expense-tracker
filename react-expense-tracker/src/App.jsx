import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  // Application States
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Validation States (To highlight offending fields in red)
  const [errors, setErrors] = useState({ title: false, amount: false });

  // Security Helper: Basic XSS sanitization against malicious script injection
  const sanitizeInput = (text) => {
    return text.replace(/[&<>"']/g, (match) => {
      const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return entityMap[match];
    });
  };

  // Simulated Asynchronous Network Loading Indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Simulated slow network delay
    return () => clearTimeout(timer);
  }, []);

  // Form Submission Logic
  const handleAddExpense = (e) => {
    e.preventDefault();

    // Reset standard error states
    const newErrors = { title: !title.trim(), amount: !amount || parseFloat(amount) <= 0 };
    setErrors(newErrors);

    // Unhappy Path: Prevent submission and highlight malformed inputs in red
    if (newErrors.title || newErrors.amount) {
      return;
    }

    // Security: Sanitize text input before storing in local state
    const sanitizedTitle = sanitizeInput(title.trim());

    const newExpense = {
      id: Date.now(),
      title: sanitizedTitle,
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toLocaleDateString()
    };

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);

    // Telemetry Simulation: Log exact metric message to console upon action completion
    console.log('[Analytics] User interacted with React Expense Tracker');

    // Reset Form Fields
    setTitle('');
    setAmount('');
  };

  return (
    <main style={{ backgroundColor: '#ffffff', padding: '32px', border: '1px solid #e0e0e0', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      {/* Headings Structure */}
      <header style={{ marginBottom: '24px', borderBottom: '2px solid #111111', paddingBottom: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px', color: '#111111' }}>
          PRODESK IT CLIENT LOGISTIC PORTAL
        </h1>
        <p style={{ fontSize: '14px', color: '#666666', marginTop: '4px' }}>
          Internal Registry / Operational Track Matrix
        </p>
      </header>

      {/* Bad Connectivity State: Visual Loading Spinner */}
      {isLoading ? (
        <div role="status" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0' }}>
          <div style={{ width: '32px', height: '32px', border: '4px solid #e0e0e0', borderTop: '4px solid #111111', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666666' }}>Synchronizing client ledger architecture...</p>
        </div>
      ) : (
        <>
          {/* Action Module: Interactive Entry Form */}
          <section aria-labelledby="form-heading" style={{ marginBottom: '32px' }}>
            <h2 id="form-heading" className="sr-only">Record Transaction Entry</h2>
            <form onSubmit={handleAddExpense} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="exp-title" style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '6px', color: '#111111' }}>
                  Transaction Descriptor / Title
                </label>
                <input
                  id="exp-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Floor Staff Supply Ledger"
                  aria-required="true"
                  aria-invalid={errors.title}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    border: `1px solid ${errors.title ? '#d32f2f' : '#e0e0e0'}`,
                    borderRadius: '2px',
                    backgroundColor: errors.title ? '#fff8f8' : '#ffffff',
                    outlineColor: '#111111'
                  }}
                />
                {errors.title && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>Descriptor parameter field is mandatory.</p>}
              </div>

              <div>
                <label htmlFor="exp-amount" style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '6px', color: '#111111' }}>
                  Quantum Value / Amount (INR)
                </label>
                <input
                  id="exp-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  aria-required="true"
                  aria-invalid={errors.amount}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    border: `1px solid ${errors.amount ? '#d32f2f' : '#e0e0e0'}`,
                    borderRadius: '2px',
                    backgroundColor: errors.amount ? '#fff8f8' : '#ffffff',
                    outlineColor: '#111111'
                  }}
                />
                {errors.amount && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>Please specify a logical amount metric higher than zero.</p>}
              </div>

              <button
                type="submit"
                aria-label="Commit expense statement entry to internal matrix"
                style={{
                  padding: '14px',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333333'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111111'}
              >
                Commit Record Entry
              </button>
            </form>
          </section>

          {/* Database Output Module */}
          <section aria-labelledby="ledger-heading">
            <h2 id="ledger-heading" style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', color: '#111111', display: 'flex', justifyContent: 'space-between' }}>
              <span>Transaction Log Stream</span>
              <span style={{ fontWeight: '400', color: '#666666' }}>Total: {expenses.length} Records</span>
            </h2>

            {/* Empty State Management */}
            {expenses.length === 0 ? (
              <div style={{ padding: '40px 16px', textAlign: 'center', border: '1px dashed #e0e0e0', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <p style={{ fontSize: '14px', color: '#666666', fontWeight: '500' }}>No data found</p>
                <p style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>The local ledger buffer matrix is currently unpopulated.</p>
              </div>
            ) : (
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {expenses.map((item) => (
                  <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '2px', backgroundColor: '#ffffff' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }} dangerouslySetInnerHTML={{ __html: item.title }} />
                      <span style={{ fontSize: '11px', color: '#999999' }}>ID: {item.id} • Registered: {item.date}</span>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111111' }}>
                      ₹{item.amount}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}