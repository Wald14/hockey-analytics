import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './footer.css'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className='footer-container'>
            <img
              alt="Blue line metrics logo"
              className='footer-img'
              src="/src/assets/img/logos/blue-line-metrics-logo.png"
            />
            <p className='footer-p1'>Blue Line Metrics</p>
            <p className='footer-p2'>
            Copyright &copy; {year} All Rights Reserved
          </p>
    </footer>
  )
}