/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AboutPageScreen } from './components/AboutPageScreen';
import { ServicesPageScreen } from './components/ServicesPageScreen';
import { PricesPageScreen } from './components/PricesPageScreen';
import { MaterialsPageScreen } from './components/MaterialsPageScreen';
import { QuarryStonesPageScreen } from './components/QuarryStonesPageScreen';
import { ContactPageScreen } from './components/ContactPageScreen';
import { TermsPageScreen } from './components/TermsPageScreen';
import { PrivacyPageScreen } from './components/PrivacyPageScreen';
import { MaterialsSection } from './components/MaterialsSection';
import { PricingSection } from './components/PricingSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MaterialCalculatorModal } from './components/MaterialCalculatorModal';
import { FullPriceListModal } from './components/FullPriceListModal';
import { MaterialDetailModal } from './components/MaterialDetailModal';
import { QuoteSuccessModal } from './components/QuoteSuccessModal';
import { QuoteRequest, PriceItem } from './types';
import { PRICE_ITEMS } from './data/materialsData';

type ViewType =
  | 'home'
  | 'about'
  | 'materials'
  | 'quarry-stones'
  | 'services'
  | 'prices'
  | 'contact'
  | 'terms'
  | 'privacy';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [priceListOpen, setPriceListOpen] = useState(false);
  const [detailModalCategory, setDetailModalCategory] = useState<
    'boulders' | 'quarry-stones' | 'quarry-dust' | 'filling' | 'riversand' | 'stones' | null
  >(null);
  const [activeQuote, setActiveQuote] = useState<QuoteRequest | null>(null);

  /**
   * Unified navigation helper: updates current view, sets browser hash for bookmarking/history,
   * and handles smooth scrolling to top or target element.
   */
  const navigate = useCallback(
    (view: ViewType, opts?: { scrollToElement?: string; noScroll?: boolean }) => {
      setCurrentView(view);
      const targetHash = opts?.scrollToElement
        ? `#${opts.scrollToElement}`
        : view === 'home'
        ? '#home'
        : `#${view}`;

      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }

      if (opts?.scrollToElement) {
        setTimeout(() => {
          const el = document.getElementById(opts.scrollToElement!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (!opts?.noScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    []
  );

  // Synchronize hash aliases with view on initial load and back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about-page' || hash === '#about' || hash === '#about-us') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#terms' ||
        hash === '#terms-and-conditions' ||
        hash === '#terms-page' ||
        hash === '#legal'
      ) {
        setCurrentView('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#privacy' ||
        hash === '#privacy-policy' ||
        hash === '#privacy-page'
      ) {
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#quarry-stones' ||
        hash === '#quarry' ||
        hash === '#quarry-stone' ||
        hash === '#stones'
      ) {
        setCurrentView('quarry-stones');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#materials-page' ||
        hash === '#materials' ||
        hash === '#catalog'
      ) {
        setCurrentView('materials');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#services-page' || hash === '#services') {
        setCurrentView('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#prices-page' ||
        hash === '#prices' ||
        hash === '#pricing-page' ||
        hash === '#pricing'
      ) {
        setCurrentView('prices');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#contact-page' ||
        hash === '#contact' ||
        hash === '#contact-us' ||
        hash === '#enquiry-form'
      ) {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#gallery') {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById('gallery');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === '#quote-form') {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById('quote-form');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === '#home' || hash === '' || hash === '#') {
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleQuoteSubmit = (quote: QuoteRequest) => {
    setActiveQuote(quote);
  };

  const handleSelectMaterial = (materialId: string) => {
    if (materialId === 'quarry-stones') {
      navigate('quarry-stones');
      return;
    }
    const item = PRICE_ITEMS.find((p) => p.id === materialId);
    if (item) {
      setDetailModalCategory(item.category);
    }
  };

  const handleSelectCategoryFromFooter = (category: string) => {
    if (category === 'quarry-stones') {
      navigate('quarry-stones');
      return;
    }
    const validCategory = (
      ['boulders', 'quarry-stones', 'quarry-dust', 'filling', 'riversand', 'stones'] as const
    ).find((c) => c === category);
    if (validCategory) {
      setDetailModalCategory(validCategory);
    }
  };

  const handleSelectPriceItemForQuote = (item: PriceItem) => {
    navigate('home', { scrollToElement: 'quote-form' });
  };

  const handleOrderWithCalc = (materialSummary: string, trips: number) => {
    setActiveQuote({
      fullName: 'Prospective Contractor / Builder',
      email: '',
      phone: '0244520024',
      materialId: 'quarry-stones',
      quantity: trips,
      unit: 'trip',
      location: 'Mallam Junction & Greater Accra Delivery Zone',
      additionalNotes: materialSummary,
    });
  };

  // Consistent navigation callback bundle passed to all pages, header and footer
  const navProps = {
    onNavigateHome: () => navigate('home'),
    onNavigateAbout: () => navigate('about'),
    onNavigateMaterials: () => navigate('materials'),
    onNavigateServices: () => navigate('services'),
    onNavigatePrices: () => navigate('prices'),
    onNavigateGallery: () => navigate('home', { scrollToElement: 'gallery' }),
    onNavigateContact: () => navigate('contact'),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans selection:bg-[#EB4D23] selection:text-white">
      {/* 1. Top Utility Bar */}
      <TopBar />

      {/* 2. Header Navigation */}
      <Header
        currentView={currentView}
        {...navProps}
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenPriceList={() => setPriceListOpen(true)}
        onSelectMaterial={handleSelectMaterial}
      />

      <main className="flex-grow">
        {currentView === 'terms' ? (
          /* Dedicated Terms & Conditions Page Screen */
          <TermsPageScreen {...navProps} />
        ) : currentView === 'privacy' ? (
          /* Dedicated Privacy Policy Page Screen */
          <PrivacyPageScreen {...navProps} />
        ) : currentView === 'quarry-stones' ? (
          /* Dedicated Quarry Stones Material Detail Page Screen */
          <QuarryStonesPageScreen
            {...navProps}
            onSelectOtherMaterial={(cat) => {
              setDetailModalCategory(cat);
            }}
            onQuoteSubmit={handleQuoteSubmit}
          />
        ) : currentView === 'contact' ? (
          /* Dedicated Contact Us Page Screen */
          <ContactPageScreen {...navProps} onQuoteSubmit={handleQuoteSubmit} />
        ) : currentView === 'materials' ? (
          /* Dedicated Building Materials Catalog Page Screen */
          <MaterialsPageScreen
            {...navProps}
            onOpenPriceList={() => setPriceListOpen(true)}
            onOpenDetailModal={(cat) => setDetailModalCategory(cat)}
            onSelectMaterial={handleSelectPriceItemForQuote}
          />
        ) : currentView === 'about' ? (
          /* Dedicated About Us Page Screen */
          <AboutPageScreen
            {...navProps}
            onOpenCalculator={() => setCalculatorOpen(true)}
            onSelectMaterial={handleSelectPriceItemForQuote}
          />
        ) : currentView === 'services' ? (
          /* Dedicated Services Page Screen */
          <ServicesPageScreen
            {...navProps}
            onSelectCategory={(cat) => {
              setDetailModalCategory(cat);
            }}
          />
        ) : currentView === 'prices' ? (
          /* Dedicated Building Material Supply Prices Page Screen */
          <PricesPageScreen
            {...navProps}
            onSelectMaterial={handleSelectPriceItemForQuote}
            onQuoteSubmit={handleQuoteSubmit}
          />
        ) : (
          /* Home Landing View */
          <>
            {/* 3. Hero Section with Request a Quote */}
            <HeroSection
              onQuoteSubmit={handleQuoteSubmit}
              onNavigateContact={() => navigate('contact')}
            />

            {/* 4. About Us Preview Section */}
            <AboutSection />

            {/* 5. Our Supply Materials Section */}
            <MaterialsSection
              onSelectCategory={(cat) => setDetailModalCategory(cat)}
              onOpenDetailModal={(cat) => setDetailModalCategory(cat)}
              onNavigatePrices={() => navigate('prices')}
            />

            {/* 6. Pricing Preview Section */}
            <PricingSection
              onOpenPriceListModal={() => setPriceListOpen(true)}
              onOpenCalculatorModal={() => setCalculatorOpen(true)}
              onSelectMaterialForQuote={handleSelectPriceItemForQuote}
              onNavigatePrices={() => navigate('prices')}
            />

            {/* 7. Gallery & Services Section */}
            <GallerySection onNavigateServices={() => navigate('services')} />

            {/* 8. Contact & CTA Block */}
            <ContactSection
              onOpenQuoteModal={() => navigate('home', { scrollToElement: 'quote-form' })}
            />
          </>
        )}
      </main>

      {/* 9. Footer */}
      <Footer
        {...navProps}
        onSelectCategory={handleSelectCategoryFromFooter}
        onNavigateTerms={() => navigate('terms')}
        onNavigatePrivacy={() => navigate('privacy')}
      />

      {/* 10. Sticky Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Modals & Dialogs */}
      <MaterialCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onOrderWithCalc={handleOrderWithCalc}
      />

      <FullPriceListModal
        isOpen={priceListOpen}
        onClose={() => setPriceListOpen(false)}
        onSelectMaterial={handleSelectPriceItemForQuote}
      />

      <MaterialDetailModal
        category={detailModalCategory}
        onClose={() => setDetailModalCategory(null)}
        onSelectForQuote={handleSelectPriceItemForQuote}
      />

      <QuoteSuccessModal
        quote={activeQuote}
        onClose={() => setActiveQuote(null)}
      />
    </div>
  );
}
