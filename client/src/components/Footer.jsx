import './footer.css'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className='footer-container'>
            <img
              alt="Blue line metrics logo"
              className='footer-img'
              src="public/blue-line-metrics-logo.png"
            />
            <p className='footer-p1'>Blue Line Metrics</p>
            <p className='footer-p2'>
            Copyright &copy; {year} All Rights Reserved
          </p>
    </footer>
  )
}