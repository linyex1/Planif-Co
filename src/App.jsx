import { useState } from 'react';
import CartPage from './components/CartPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import CourseModulePage from './components/CourseModulePage.jsx';
import DarkIntroSection from './components/DarkIntroSection.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ModulesSection from './components/ModulesSection.jsx';
import MpmFocus from './components/MpmFocus.jsx';
import MpmModulePage from './components/MpmModulePage.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import PricingSection from './components/PricingSection.jsx';
import StatsSection from './components/StatsSection.jsx';
import StudentJourney from './components/StudentJourney.jsx';
import TutorialSection from './components/TutorialSection.jsx';
import { premiumProduct } from './data/content.js';
import { modulePages } from './data/modulePages.js';

const PREMIUM_ACCESS_KEY = 'planifco-premium-access';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function App() {
  const [view, setView] = useState('home');
  const [cartItem, setCartItem] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(() => {
    return window.localStorage.getItem(PREMIUM_ACCESS_KEY) === 'unlocked';
  });

  const unlockPremiumAccess = () => {
    window.localStorage.setItem(PREMIUM_ACCESS_KEY, 'unlocked');
    setPremiumUnlocked(true);
  };

  const navigateHome = (hash = '#accueil') => {
    setView('home');
    window.setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        scrollToTop();
      }
    }, 0);
  };

  const openCart = () => {
    setView('cart');
    scrollToTop();
  };

  const addPremiumToCart = () => {
    setCartItem(premiumProduct);
    setView('cart');
    scrollToTop();
  };

  const openMpmModule = () => {
    setView('mpm');
    scrollToTop();
  };

  const openCourseModule = (moduleId) => {
    if (!premiumUnlocked) {
      navigateHome('#tarifs');
      return;
    }

    setActiveModuleId(moduleId);
    setView('course-module');
    scrollToTop();
  };

  const removeCartItem = () => {
    setCartItem(null);
  };

  const openCheckout = () => {
    if (!cartItem) return;
    setView('checkout');
    scrollToTop();
  };

  const submitOrder = () => {
    setOrderNumber(`PC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
    unlockPremiumAccess();
    setCartItem(null);
    setView('success');
    scrollToTop();
  };

  const renderMain = () => {
    if (view === 'cart') {
      return (
        <CartPage
          item={cartItem}
          onBackToPricing={() => navigateHome('#tarifs')}
          onCheckout={openCheckout}
          onRemove={removeCartItem}
        />
      );
    }

    if (view === 'checkout') {
      return (
        <CheckoutPage
          item={cartItem}
          onBackToCart={openCart}
          onSubmitOrder={submitOrder}
        />
      );
    }

    if (view === 'success') {
      return <OrderConfirmation orderNumber={orderNumber} onBackHome={() => navigateHome('#accueil')} />;
    }

    if (view === 'mpm') {
      return (
        <MpmModulePage
          onBackHome={() => navigateHome('#accueil')}
          onChoosePremium={addPremiumToCart}
        />
      );
    }

    if (view === 'course-module') {
      return (
        <CourseModulePage
          module={modulePages[activeModuleId]}
          onBackHome={() => navigateHome('#cours')}
        />
      );
    }

    return (
      <main>
        <Hero onStartFree={openMpmModule} />
        <DarkIntroSection />
        <ModulesSection
          premiumUnlocked={premiumUnlocked}
          onOpenModule={openCourseModule}
          onChoosePremium={addPremiumToCart}
          onUnlockPremiumDemo={unlockPremiumAccess}
        />
        <PricingSection
          premiumUnlocked={premiumUnlocked}
          onChoosePremium={addPremiumToCart}
          onStartFree={openMpmModule}
          onViewCourses={() => navigateHome('#cours')}
        />
        <StudentJourney />
        <MpmFocus onOpenModule={openMpmModule} />
        <TutorialSection />
        <StatsSection />
      </main>
    );
  };

  return (
    <>
      <Header
        cartCount={cartItem ? 1 : 0}
        onCartOpen={openCart}
        onNavigateHome={navigateHome}
      />
      {renderMain()}
      <Footer onNavigateHome={navigateHome} />
    </>
  );
}

export default App;
