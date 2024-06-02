import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner animation="border" role="status"/>
    </div>
  )
}