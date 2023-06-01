import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Layout.css';

function Layout({ children }) {
  return (
    <div className='Layout'>
      <Header />
      <main className='Layout__main'>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
