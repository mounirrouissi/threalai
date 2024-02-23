import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react';

function SuccessPage() {
  const router = useRouter();
  const { phone, name } = router.query;

  useEffect(() => {
  console.log("phone =" + phone);
  console.log("name =" + name);
  });

  return (
<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF3E0' }}>


<Link href="/">
        <button
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Go Home
        </button>
      </Link>

      <div
        style={{
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          backgroundColor: '#fff'
        }}
      >
        <h1 style={{textAlign: 'center', color: '#4CAF50'}}>
          Order Success!
        </h1>

        <p style={{ fontSize: '18px', color: '#333', lineHeight: '1.6' }}>
  Thank you, {name}! Your order has been placed successfully. We will contact you shortly at {phone}.
</p>
      </div>

    </div>
  )
}

export default SuccessPage