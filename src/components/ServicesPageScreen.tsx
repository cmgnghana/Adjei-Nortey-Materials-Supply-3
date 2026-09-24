import React from 'react';
import {
  Truck,
  Layers,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
} from 'lucide-react';
import { COMPANY_DETAILS, SERVICES, MATERIAL_CATEGORIES } from '../data/materialsData';
import { MaterialCategoryId } from '../types';

interface ServicesPageScreenProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateMaterials?: () => void;
  onNavigateServices?: () => void;
  onNavigatePrices: () => void;
  onNavigateGallery: () => void;
  onNavigateContact: () => void;
  onSelectCategory?: (category: MaterialCategoryId) => void;
}

export const ServicesPageScreen: React.FC<ServicesPageScreenProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onNavigateMaterials,
  onNavigateServices,
  onNavigatePrices,
  onNavigateGallery,
  onNavigateContact,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white min-h-screen text-[#080e21] antialiased selection:bg-[#EB4D23] selection:text-white flex flex-col font-sans">
      {/* 1. Services Hero Section */}
      <section className="relative bg-[#080e21] text-white py-20 md:py-28 overflow-hidden" data-purpose="services-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EB4D23]/15 border border-[#EB4D23]/35 text-[#EB4D23] text-xs uppercase font-bold tracking-widest mb-6">
            <Truck className="w-4 h-4 text-[#EB4D23]" />
            <span>SUPPLY &amp; HAULAGE LOGISTICS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase mb-6 leading-tight">
            Building Material Supply Services
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {COMPANY_DETAILS.name} provides dependable supply of boulders, quarry stones, quarry dust, riversand, filling material, and stones across {COMPANY_DETAILS.location}.
          </p>
        </div>
      </section>

      {/* 2. Main Content Services Grid */}
      <section className="py-16 sm:py-24 bg-[#FAFAFC]" data-purpose="services-grid-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-[#EB4D23] font-bold text-xs sm:text-sm tracking-widest uppercase block mb-2 font-mono">
              OUR CORE SUPPLY SCOPE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-[#080e21] tracking-tight">
              Comprehensive Site Supply &amp; Fleet Logistics
            </h2>
          </div>

          {/* Full Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgba(8,14,33,0.05)] hover:shadow-[0_16px_40px_rgba(235,77,35,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF2EE] text-[#EB4D23] flex items-center justify-center mb-6 group-hover:bg-[#EB4D23] group-hover:text-white transition-colors">
                    {idx === 0 && <Truck className="w-7 h-7" />}
                    {idx === 1 && <Layers className="w-7 h-7" />}
                    {idx === 2 && <Building2 className="w-7 h-7" />}
                    {idx === 3 && <ShieldCheck className="w-7 h-7" />}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1 font-mono">
                    SERVICE SCOPE 0{idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#080e21] tracking-tight mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EB4D23]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Active 24/7 Operations</span>
                  </span>
                  <a
                    href={`tel:${COMPANY_DETAILS.phone}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-[#EB4D23] transition-colors"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Material Categories Overview Banner */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#EB4D23] uppercase tracking-wider block mb-1">
                Material Catalog Matrix
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                Supplying 6 Certified Building Materials
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                Boulders, Filling Material / Laterite, Quarry Dust, Quarry Stones / Chippings, Riversand, and Natural Foundation Stones.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <button
                onClick={onNavigateMaterials || onNavigateHome}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#080e21] hover:bg-black text-white text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onNavigatePrices}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#EB4D23] hover:bg-[#d63f17] text-white text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <span>Check Rates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Call to Action Banner */}
      <section className="bg-[#080e21] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-display">
            Ready to Order Construction Materials?
          </h3>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Contact dispatch directly for single trip deliveries or volume bulk supply to your job site across {COMPANY_DETAILS.location}.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${COMPANY_DETAILS.phone}`}
              className="bg-[#EB4D23] hover:bg-[#d63f17] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition"
            >
              Call {COMPANY_DETAILS.phone}
            </a>
            <a
              href="https://wa.me/233244520024"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition"
            >
              WhatsApp Dispatch Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
