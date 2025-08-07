import { Link } from 'react-router-dom';

const NotFound = () => (
  <div
    data-testid="not-found"
    style={{
      height: '100vh',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
      color: '#fff',
      textAlign: 'center',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <h1 style={{ fontSize: '6rem', margin: 0, fontWeight: 'bold' }}>404</h1>
    <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
      Oops! The page you’re looking for doesn’t exist.
    </p>
    <Link
      to="/"
      style={{
        marginTop: '20px',
        padding: '12px 30px',
        backgroundColor: '#fff',
        color: '#ff4b2b',
        fontWeight: 'bold',
        textDecoration: 'none',
        borderRadius: '30px',
        boxShadow: '0 4px 15px rgba(255, 75, 43, 0.4)',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
          '#ff7259';
        (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#fff';
        (e.currentTarget as HTMLAnchorElement).style.color = '#ff4b2b';
      }}
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
