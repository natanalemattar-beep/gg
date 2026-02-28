'use client';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>Bug Analysis Application</h1>
        {/* BUG #10: Missing alt text for images */}
        <img src="/placeholder.svg?height=40&width=40" />
        
        {/* BUG #11: No keyboard navigation support for header buttons */}
        <nav style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onMouseEnter={() => console.log('hover')}>Home</button>
          <button onMouseEnter={() => console.log('hover')}>About</button>
          <button onMouseEnter={() => console.log('hover')}>Contact</button>
        </nav>
      </div>
    </header>
  );
}
