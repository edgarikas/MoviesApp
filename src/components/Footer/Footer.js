import creditCardsImg from '../../images/payments.jpg';
import './Footer.css';

function Footer() {
  return (
    <footer className='Footer'>
      <div className='Footer__container'>
        <p>Copyright © 2019-2023 Domain</p>
        <img src={creditCardsImg} alt='credit card icons' />
      </div>
    </footer>
  );
}

export default Footer;
