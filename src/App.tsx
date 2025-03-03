import React, { useState } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { HeroSection } from './components/Hero/HeroSection';
import { BenefitsSection } from './components/Benefits/BenefitsSection';
import { IngredientsSection } from './components/Ingredients/IngredientsSection';
import { ProductSection } from './components/Product/ProductSection';
import { FAQSection } from './components/FAQ/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { AdminSection } from './components/Admin/AdminSection';
import { CartProvider } from './context/CartContext';
import { SEO } from './components/SEO';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Check if we're on a special page
  const path = window.location.pathname;
  const isSuccessPage = path === '/success';
  const isCancelPage = path === '/cancel';
  const isContactPage = path === '/contact';
  const isFAQsPage = path === '/faqs';
  const isAboutPage = path === '/about';
  const isPrivacyPage = path === '/privacy';
  const isTermsPage = path === '/terms';
  const isReturnsPage = path === '/returns';
  const isReturnFormPage = path === '/return-form';
  const isDisclaimerPage = path === '/disclaimer';
  const isShopPage = path === '/shop';
  const isAdminPage = path === '/admin';
  const isConnectReturnPage = path.startsWith('/connect/return');
  const isConnectRefreshPage = path.startsWith('/connect/refresh');

  const scrollToProduct = () => {
    const productSection = document.getElementById('product-section');
    if (productSection) {
      const windowHeight = window.innerHeight;
      const productHeight = productSection.offsetHeight;
      const offset = (windowHeight - productHeight) / 2;
      const productPosition = productSection.offsetTop - Math.max(0, offset);
      
      window.scrollTo({
        top: productPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  // Import pages dynamically
  const SuccessPage = React.lazy(() => import('./pages/success'));
  const CancelPage = React.lazy(() => import('./pages/cancel'));
  const AboutPage = React.lazy(() => import('./pages/about'));
  const ContactPage = React.lazy(() => import('./pages/contact'));
  const FAQsPage = React.lazy(() => import('./pages/faqs'));
  const PrivacyPage = React.lazy(() => import('./pages/privacy'));
  const TermsPage = React.lazy(() => import('./pages/terms'));
  const ReturnsPage = React.lazy(() => import('./pages/returns'));
  const ReturnFormPage = React.lazy(() => import('./pages/return-form'));
  const DisclaimerPage = React.lazy(() => import('./pages/disclaimer'));
  const ConnectReturnPage = React.lazy(() => import('./pages/connect/return'));
  const ConnectRefreshPage = React.lazy(() => import('./pages/connect/refresh'));
  const ShopPage = React.lazy(() => import('./pages/shop'));

  if (isSuccessPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <SuccessPage />
      </React.Suspense>
    );
  }

  if (isCancelPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <CancelPage />
      </React.Suspense>
    );
  }

  if (isAboutPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <AboutPage />
      </React.Suspense>
    );
  }

  if (isContactPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ContactPage />
      </React.Suspense>
    );
  }

  if (isFAQsPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <FAQsPage />
      </React.Suspense>
    );
  }

  if (isPrivacyPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <PrivacyPage />
      </React.Suspense>
    );
  }

  if (isTermsPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <TermsPage />
      </React.Suspense>
    );
  }

  if (isReturnsPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ReturnsPage />
      </React.Suspense>
    );
  }

  if (isReturnFormPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ReturnFormPage />
      </React.Suspense>
    );
  }

  if (isDisclaimerPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <DisclaimerPage />
      </React.Suspense>
    );
  }

  if (isConnectReturnPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ConnectReturnPage />
      </React.Suspense>
    );
  }

  if (isConnectRefreshPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ConnectRefreshPage />
      </React.Suspense>
    );
  }

  if (isShopPage) {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ShopPage />
      </React.Suspense>
    );
  }

  if (isAdminPage) {
    return <AdminSection />;
  }

  return (
    <CartProvider>
      <SEO 
        title="Premium Post-Rave Recovery Supplements"
        description="Natural, scientifically formulated supplements to help you bounce back faster after raves and festivals. Free shipping on 2+ tubs."
      />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white">
        <Navigation 
          scrollToProduct={scrollToProduct}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          showAboutModal={showAboutModal}
          setShowAboutModal={setShowAboutModal}
          showContactModal={showContactModal}
          setShowContactModal={setShowContactModal}
        />
        <HeroSection />
        <BenefitsSection />
        <IngredientsSection />
        <ProductSection />
        <FAQSection />
        <Footer 
          
        />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;