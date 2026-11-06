import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Heart, 
  MapPin, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Phone,
  Eye,
  X,
  Send,
  Star,
  Quote,
  MessageCircle,
  Truck,
  CreditCard,
  Grid3X3,
  Layers
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_PHONE = "221777475420";
const DISPLAY_PHONE = "+221 77 747 54 20";

// Les 14 Vrais Bouquets avec les VRAIES images vérifiées (100% HTTP 200 OK)
const PRODUCTS = [
  {
    name: "Blush",
    category: "pastel",
    categoryLabel: "Élégance & Pastel",
    price: "20 000 FCFA",
    desc: "Harmonie délicate aux teintes poudrées de rose et crème. Idéal pour un anniversaire tendre, une attention sincère ou un remerciement soyeux.",
    occasions: "Anniversaire • Remerciement • Tendresse",
    img: "https://timabouquets.netlify.app/img/Blush.jpeg",
    tag: "Coup de Cœur"
  },
  {
    name: "Dearest",
    category: "romance",
    categoryLabel: "Romance & Déclaration",
    price: "25 000 FCFA",
    desc: "Roses fraîches et feuillages choisis pour une déclaration d'amour passionnée qui touche droit au cœur. Le bouquet signature des amoureux.",
    occasions: "Saint-Valentin • Déclaration d'Amour • Surprise",
    img: "https://timabouquets.netlify.app/img/Dearest.jpeg",
    tag: "Best-Seller"
  },
  {
    name: "Honeymoon",
    category: "romance",
    categoryLabel: "Romance & Déclaration",
    price: "35 000 FCFA",
    desc: "Composition somptueuse et généreuse célébrant l'amour fou, la lune de miel et les grandes étapes d'une vie à deux.",
    occasions: "Lune de Miel • Anniversaire de Mariage • Grand Pardon",
    img: "https://timabouquets.netlify.app/img/Honeymoon.jpeg",
    tag: "Prestige"
  },
  {
    name: "Bloom",
    category: "romance",
    categoryLabel: "Romance & Déclaration",
    price: "40 000 FCFA",
    desc: "Le chef-d'œuvre de notre maison : un volume spectaculaire de roses épanouies d'une intensité et d'une fraîcheur incomparables.",
    occasions: "Occasion Spéciale • Grande Déclaration • Luxe",
    img: "https://timabouquets.netlify.app/img/Bloom.jpeg",
    tag: "Grand Format"
  },
  {
    name: "Roses Prestige",
    category: "romance",
    categoryLabel: "Romance & Déclaration",
    price: "40 000 FCFA",
    desc: "Sélection d'exception de roses à grandes tiges veloutées. L'expression suprême du luxe floral et de la distinction à Dakar.",
    occasions: "Romance Impériale • Réception VIP • Surprise de Taille",
    img: "https://timabouquets.netlify.app/img/roses.png",
    tag: "Luxe Pur"
  },
  {
    name: "Roses Romantiques",
    category: "romance",
    categoryLabel: "Romance & Déclaration",
    price: "30 000 FCFA",
    desc: "Ballet envoûtant de nuances carmin et rose tendre, arrangé en spirale parfaite pour faire chavirer votre moitié.",
    occasions: "Dîner Romantique • Anniversaire de Rencontre",
    img: "https://timabouquets.netlify.app/img/roses1.png",
    tag: "Romance"
  },
  {
    name: "Aurora",
    category: "pastel",
    categoryLabel: "Élégance & Pastel",
    price: "23 000 FCFA",
    desc: "Inspiré des premières lueurs de l'aurore sur la corniche dakaroise. Douceur pastel apaisante et parfum subtil.",
    occasions: "Naissance • Décoration d'Intérieur • Douceur",
    img: "https://timabouquets.netlify.app/img/Aurora.jpeg",
    tag: "Lumière"
  },
  {
    name: "Ivy",
    category: "pastel",
    categoryLabel: "Élégance & Pastel",
    price: "23 000 FCFA",
    desc: "Équilibre parfait entre fleurs nobles et feuillages graphiques, apportant une touche de nature vivante et contemporaine.",
    occasions: "Fêtes des Mères • Remerciement • Bureau Chic",
    img: "https://timabouquets.netlify.app/img/Ivy.jpeg",
    tag: "Botanique"
  },
  {
    name: "Pearl",
    category: "mariage",
    categoryLabel: "Mariages & Cérémonies",
    price: "20 000 FCFA",
    desc: "Blancheur immaculée et textures nacrées pour célébrer la pureté, les baptêmes, fiançailles et événements solennels.",
    occasions: "Baptême • Fiançailles • Cérémonie Religieuse",
    img: "https://timabouquets.netlify.app/img/Pearl.jpeg",
    tag: "Épure"
  },
  {
    name: "Ethereal",
    category: "mariage",
    categoryLabel: "Mariages & Cérémonies",
    price: "23 000 FCFA",
    desc: "Légèreté aérienne et grâce vaporeuse. Une création féerique qui sublime toute table de réception ou séance photo.",
    occasions: "Séance Photo • Fiançailles • Table d'Honneur",
    img: "https://timabouquets.netlify.app/img/Ethereal.jpeg",
    tag: "Poétique"
  },
  {
    name: "Bride to be",
    category: "mariage",
    categoryLabel: "Mariages & Cérémonies",
    price: "25 000 FCFA",
    desc: "La création iconique pensée pour les futures mariées, les demandes en mariage et les bridal showers à Dakar.",
    occasions: "Demande en Mariage • Bridal Shower • Mariée",
    img: "https://timabouquets.netlify.app/img/Bridetobe.png",
    tag: "Mariage"
  },
  {
    name: "Tender",
    category: "pastel",
    categoryLabel: "Élégance & Pastel",
    price: "25 000 FCFA",
    desc: "Douceur infinie et réconfort d'un agencement pastel soyeux, idéal pour égayer un salon ou remercier une amie chère.",
    occasions: "Rétablissement • Réconfort • Amitié",
    img: "https://timabouquets.netlify.app/img/Tender.jpeg",
    tag: "Tendresse"
  },
  {
    name: "Marie",
    category: "pastel",
    categoryLabel: "Élégance & Pastel",
    price: "17 000 FCFA",
    desc: "Attention florale chic et accessible, créée avec le même soin artisanal pour illuminer le quotidien sans occasion particulière.",
    occasions: "Attention Spontanée • Plaisir d'Offrir • Goûter",
    img: "https://timabouquets.netlify.app/img/Marie.png",
    tag: "Cadeau Idéal"
  },
  {
    name: "Roses Délicates",
    category: "romance",
    categoryLabel: "Romance & Déclaration",
    price: "15 000 FCFA",
    desc: "Boutons de roses fraîches sélectionnés à la main pour un geste d'affection élégant, sincère et spontané.",
    occasions: "Premier Rendez-vous • Geste Tendre • Invitation",
    img: "https://timabouquets.netlify.app/img/roses2.png",
    tag: "Délicatesse"
  }
];

// 6 Témoignages Vérifiés Dakar avec détails d'arrondissement
const TESTIMONIALS = [
  {
    name: "Mamadou D.",
    location: "Les Almadies · Dakar",
    rating: 5,
    tag: "Anniversaire",
    bouquet: "Bouquet Bloom",
    text: "J'ai commandé le bouquet Bloom pour l'anniversaire de ma femme aux Almadies. Livraison en 2h15 chrono, fleurs veloutées d'une fraîcheur éclatante et carte manuscrite cachetée à la cire. Un service d'une classe rare à Dakar."
  },
  {
    name: "Aïssatou S.",
    location: "Fann Résidence · Dakar",
    rating: 5,
    tag: "Surprise Romantique",
    bouquet: "Bouquet Dearest",
    text: "Le bouquet Dearest a fait une sensation incroyable. Les couleurs sont exactement conformes aux photos, aucun bouton fatigué. Paiement Wave instantané et suivi WhatsApp aux petits soins."
  },
  {
    name: "Cheikh O.",
    location: "Plateau · Commande Paris-Dakar",
    rating: 5,
    tag: "Distance",
    bouquet: "Roses Prestige",
    text: "J'ai passé commande depuis Paris pour faire livrer au Plateau. Équipe d'une réactivité remarquable sur WhatsApp : ils m'ont envoyé la vidéo du bouquet avant le départ du coursier. Professionnalisme absolu !"
  },
  {
    name: "Marième B.",
    location: "Ngor Virage · Dakar",
    rating: 5,
    tag: "Fiançailles",
    bouquet: "Bride to be",
    text: "Pour la demande en mariage de ma sœur, le bouquet Bride to be était le clou de la soirée. Des roses blanches immaculées et une présentation digne de la haute couture. Merci infiniment !"
  },
  {
    name: "Babacar T.",
    location: "Point E · Dakar",
    rating: 5,
    tag: "Remerciement",
    bouquet: "Bouquet Blush",
    text: "Première commande chez Timabouquets pour remercier un partenaire d'affaires. Emballage soyeux impeccable, ponctualité exemplaire et odeur enivrante dans tout le bureau."
  },
  {
    name: "Fatou K.",
    location: "Mermoz · Dakar",
    rating: 5,
    tag: "Attention Spontanée",
    bouquet: "Roses Romantiques",
    text: "Le parfum des roses a embaumé mon salon pendant plus de 9 jours ! La fraîcheur promise est bien réelle. On sent que chaque tige est choisie avec amour."
  }
];

// Canvas interactif de pétales floraux flottants
function PetalFloatingCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // 24 pétales soyeux aux teintes de roses et d'or doux
    const petalCount = 22;
    const petals = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 6,
      speedY: Math.random() * 0.45 + 0.25,
      speedX: (Math.random() - 0.5) * 0.3,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.25 + 0.15,
      color: Math.random() > 0.4 ? 'rgba(232, 167, 147, ' : 'rgba(212, 175, 55, '
    }));

    let mouseX = -100;
    let mouseY = -100;
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.005) * 0.25;
        p.angle += p.rotationSpeed;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = `${p.color}${p.opacity})`;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-10" 
      style={{ opacity: 0.85 }} 
    />
  );
}

// Carte avec physique 3D Tilt & reflet spéculaire
function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: tilt.isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out'
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {tilt.isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.28) 0%, transparent 65%)`
          }}
        />
      )}
      {children}
    </div>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [dakarTime, setDakarTime] = useState("");
  const [mobileCatalogView, setMobileCatalogView] = useState('carousel'); // 'carousel' | 'grid'
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const manifestoRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const testimonialRailRef = useRef(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Défilement fluide du carrousel tactile mobile
  const scrollCarousel = (direction) => {
    if (!carouselContainerRef.current) return;
    const cardWidth = carouselContainerRef.current.clientWidth * 0.82;
    carouselContainerRef.current.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollToSlide = (index) => {
    if (!carouselContainerRef.current) return;
    const cardWidth = carouselContainerRef.current.clientWidth * 0.82 + 16;
    carouselContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveSlideIndex(index);
  };

  const handleCarouselScroll = () => {
    if (!carouselContainerRef.current) return;
    const scrollLeft = carouselContainerRef.current.scrollLeft;
    const cardWidth = carouselContainerRef.current.clientWidth * 0.82 + 16;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex !== activeSlideIndex) {
      setActiveSlideIndex(newIndex);
    }
  };

  // Défilement fluide des témoignages (Mobile & Ordi)
  const scrollTestimonials = (direction) => {
    if (!testimonialRailRef.current) return;
    const isDesktop = window.innerWidth >= 768;
    const step = isDesktop ? 404 : testimonialRailRef.current.clientWidth * 0.85 + 20;
    testimonialRailRef.current.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth'
    });
  };

  const scrollToTestimonial = (index) => {
    if (!testimonialRailRef.current) return;
    const isDesktop = window.innerWidth >= 768;
    const step = isDesktop ? 404 : testimonialRailRef.current.clientWidth * 0.85 + 20;
    testimonialRailRef.current.scrollTo({
      left: index * step,
      behavior: 'smooth'
    });
    setActiveTestimonialIndex(index);
  };

  const handleTestimonialScroll = () => {
    if (!testimonialRailRef.current) return;
    const scrollLeft = testimonialRailRef.current.scrollLeft;
    const isDesktop = window.innerWidth >= 768;
    const step = isDesktop ? 404 : testimonialRailRef.current.clientWidth * 0.85 + 20;
    const newIndex = Math.round(scrollLeft / step);
    if (newIndex >= 0 && newIndex !== activeTestimonialIndex && newIndex < TESTIMONIALS.length) {
      setActiveTestimonialIndex(newIndex);
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setActiveSlideIndex(0);
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Sélection d'un univers et défilement fluide direct vers le catalogue (Mobile & Ordi)
  const selectUniverseAndScroll = (category) => {
    handleCategoryChange(category);
    setTimeout(() => {
      const collectionEl = document.getElementById('collection');
      if (collectionEl) {
        collectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Heure locale de Dakar (UTC+0)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('fr-FR', {
        timeZone: 'Africa/Dakar',
        hour: '2-digit',
        minute: '2-digit'
      });
      setDakarTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Détection du scroll pour Navbar morphing
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Défilement automatique fluide des témoignages toutes les 5.5s (Mobile & Ordi)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!testimonialRailRef.current) return;
      setActiveTestimonialIndex((prev) => {
        const nextIndex = (prev + 1) % TESTIMONIALS.length;
        const isDesktop = window.innerWidth >= 768;
        const step = isDesktop ? 404 : testimonialRailRef.current.clientWidth * 0.85 + 20;
        testimonialRailRef.current.scrollTo({
          left: nextIndex * step,
          behavior: 'smooth'
        });
        return nextIndex;
      });
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations : Parallaxe Hero, Stagger et Révélation du Manifeste
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Stagger Reveal
      gsap.from('.hero-fade', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: 'power3.out'
      });

      // 2. Parallaxe de fond sur le Hero
      gsap.to('.hero-bg-parallax', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 90,
        scale: 1.12
      });

      // 3. Univers Cards Reveal
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 82%'
        },
        y: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power2.out'
      });

      // 4. Manifeste Révélation mot par mot au Scroll
      gsap.fromTo('.manifesto-word', 
        { opacity: 0.18, y: 15 },
        {
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 1
          },
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: 'power1.out'
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const filteredProducts = PRODUCTS.filter(p => 
    selectedCategory === 'all' || p.category === selectedCategory
  );

  const getWhatsAppLink = (bouquetName, bouquetPrice) => {
    const text = bouquetName 
      ? `Bonjour Timabouquets, je souhaite commander le bouquet "${bouquetName}" à ${bouquetPrice}. Pouvez-vous me confirmer la disponibilité pour Dakar ?`
      : "Bonjour Timabouquets, je souhaite commander une création florale sur-mesure pour aujourd'hui.";
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  const manifestoText = "Notre obsession : sculpter chaque tige comme une déclaration inoubliable, et la déposer entre vos mains en moins de 3 heures à Dakar.";

  return (
    <div ref={heroRef} className="min-h-screen bg-[#FAF7F2] text-[#161816] font-sans noise-bg relative">
      
      {/* Canevas de pétales vivants */}
      <PetalFloatingCanvas />

      {/* =====================================================================
          1. NAVBAR — L'ÎLE FLOTTANTE MORPHING AÉRÉE
          ===================================================================== */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav 
          className={`pointer-events-auto w-full max-w-5xl rounded-full py-2 sm:py-3 px-3.5 sm:px-7 flex items-center justify-between gap-3 sm:gap-6 transition-all duration-500 border ${
            scrolled 
              ? 'bg-[#161816]/90 border-white/20 text-white shadow-2xl backdrop-blur-xl' 
              : 'bg-[#161816]/75 border-white/20 text-white backdrop-blur-md shadow-xl'
          }`}
        >
          {/* Logo & Nom avec espacement respirant */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white p-0.5 sm:p-1 flex items-center justify-center shadow-md shrink-0 overflow-hidden transition-transform group-hover:scale-105">
              <img src="https://timabouquets.netlify.app/img/logo.png" alt="Timabouquets" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-base sm:text-xl tracking-wider leading-none text-white group-hover:text-[#E8A793] transition-colors truncate">TIMABOUQUETS</span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-widest uppercase text-white/70 mt-0.5 truncate hidden xs:block">Haute Maison Florale · Dakar</span>
            </div>
          </a>

          {/* Liens de navigation */}
          <div className="hidden md:flex items-center gap-8 font-sans text-xs tracking-wider uppercase font-semibold text-white/85">
            <a href="#univers" className="hover:text-[#E8A793] transition-colors">Univers</a>
            <a href="#savoir-faire" className="hover:text-[#E8A793] transition-colors">Savoir-Faire</a>
            <a href="#collection" className="hover:text-[#E8A793] transition-colors">Collection (14)</a>
            <a href="#temoignages" className="hover:text-[#E8A793] transition-colors">Avis Vérifiés</a>
            <a href="#faq" className="hover:text-[#E8A793] transition-colors">FAQ</a>
          </div>

          {/* Action Commander - non collé et calibré sur mobile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a 
              href="https://instagram.com/timabouquets" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:flex text-white/80 hover:text-white transition-colors p-2"
              title="Instagram @timabouquets"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-magnetic px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#C0593E] hover:bg-[#A7482F] text-white font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#C0593E]/30 flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <span>Commander</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* =====================================================================
          2. SECTION HERO — PLAN D'OUVERTURE CINÉMATOGRAPHIQUE & RESPONSIVE
          ===================================================================== */}
      <section className="relative w-full min-h-[100dvh] sm:h-[100dvh] sm:min-h-[720px] flex flex-col justify-between pt-14 sm:pt-20 pb-0 overflow-hidden">
        {/* Background photo plein cadre avec parallaxe GSAP */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://timabouquets.netlify.app/img/Bloom.jpeg" 
            alt="Bouquet Bloom Timabouquets" 
            className="hero-bg-parallax w-full h-full object-cover object-center scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161816] via-[#161816]/75 to-[#161816]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161816]/90 via-[#161816]/50 to-transparent" />
        </div>

        {/* Contenu Hero équilibré et respirant au millimètre */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-12 lg:px-16 flex-1 flex flex-col justify-center py-2 sm:py-6 my-auto">
          
          {/* Badge compact sur 1 seule ligne (w-fit self-start : zéro étirement) */}
          <div className="hero-fade inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 mb-3 sm:mb-4 text-white text-[10.5px] sm:text-xs font-mono w-fit self-start shrink-0 shadow-sm whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="tracking-wider uppercase font-semibold">Atelier Ouvert · {dakarTime || "Dakar"} · Express &lt; 3H</span>
          </div>

          <h1 className="hero-fade text-white tracking-tight leading-[0.98] max-w-4xl mb-3.5 sm:mb-5">
            <span className="block font-sans font-extrabold text-[15px] sm:text-2xl md:text-3xl uppercase tracking-[0.16em] text-white/95 mb-1.5 sm:mb-2.5">
              Timabouquets est l'art de
            </span>
            <span className="block font-serif italic text-[3.35rem] sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#E8A793] via-[#FAF7F2] to-[#C0593E] drop-shadow-lg leading-[1.02]">
              L'Émotion Pure.
            </span>
          </h1>

          <p className="hero-fade text-[#FAF7F2]/90 font-sans text-[14.5px] sm:text-base md:text-lg max-w-xl font-light leading-relaxed mb-6 sm:mb-8">
            Maison d'orfèvrerie florale à Dakar. Nous sélectionnons des fleurs nobles fraîches coupées à l'aube pour sculpter des créations inoubliables — livrées discrètement avec un mot calligraphié sous pli scellé.
          </p>

          <div className="hero-fade flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a 
              href="#collection" 
              className="btn-magnetic px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C0593E] hover:bg-[#A7482F] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-xl shadow-[#C0593E]/40 flex items-center justify-center gap-2.5"
            >
              <span>Découvrir la Collection (14 Bouquets)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-magnetic px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.938l-1.572 5.846 6.002-1.574c1.706.945 3.668 1.49 5.753 1.49 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.882 0-3.642-.524-5.15-1.433l-.369-.221-3.568.936.952-3.477-.243-.387c-1.007-1.604-1.543-3.47-1.543-5.418 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
              <span>WhatsApp : {DISPLAY_PHONE}</span>
            </a>
          </div>

        </div>

        {/* Télémétrie Défilante avec protection d'espacement pour le bouton WhatsApp mobile */}
        <div className="relative z-10 w-full border-t border-white/10 bg-[#161816]/90 backdrop-blur-md py-3 px-5 sm:px-6 pr-20 sm:pr-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-[#FAF7F2]/75 font-mono text-[10px] sm:text-xs gap-3">
            <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
              <span className="truncate">🌸 14 COMPOSITIONS SIGNATURES</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline">⚡ LIVRAISONS DAKAR &lt; 3H</span>
              <span className="hidden md:inline text-white/30">•</span>
              <span className="hidden md:inline">💳 WAVE &amp; ORANGE MONEY ACCEPTÉS</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px] sm:text-xs shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DAKAR · PRÊT À EXPÉDIER</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SECTION UNIVERS FLORAUX — LES 3 MONDES DE TIMABOUQUETS
          ===================================================================== */}
      <section id="univers" ref={cardsRef} className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C0593E] font-bold block mb-2">// NOS 3 UNIVERS SIGNATURES</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3528] font-bold tracking-tight mb-4">L'Écrin Adapté à Votre Moment.</h2>
          <p className="font-sans text-[#6B756D] text-sm sm:text-base font-light">Chaque événement mérite une harmonie chromatique et des parfums façonnés avec intention.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Romance */}
          <TiltCard className="feature-card product-card group bg-white rounded-[2.5rem] p-7 border border-[#1F3528]/10 shadow-lg shadow-[#1F3528]/5 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#F3EDE4]">
                <img src="https://timabouquets.netlify.app/img/roses.png" alt="Romance" className="w-full h-full object-cover" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C0593E] font-bold block mb-1">UNIVERS 01</span>
              <h3 className="font-serif text-2xl font-bold text-[#1F3528] mb-3">Romance Passion</h3>
              <p className="font-sans text-xs text-[#6B756D] leading-relaxed mb-6 font-light">
                Roses rouges veloutées à grandes tiges et bouquets majestueux pour enflammer un anniversaire ou marquer une grande preuve d'amour.
              </p>
            </div>
            <button 
              onClick={() => selectUniverseAndScroll('romance')}
              className="inline-flex items-center justify-between text-xs font-mono font-bold text-[#C0593E] uppercase tracking-wider hover:underline text-left cursor-pointer pt-3 w-full"
            >
              <span>Découvrir la sélection Romance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </TiltCard>

          {/* Pastel */}
          <TiltCard className="feature-card product-card group bg-white rounded-[2.5rem] p-7 border border-[#1F3528]/10 shadow-lg shadow-[#1F3528]/5 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#F3EDE4]">
                <img src="https://timabouquets.netlify.app/img/Blush.jpeg" alt="Douceur & Pastel" className="w-full h-full object-cover" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C0593E] font-bold block mb-1">UNIVERS 02</span>
              <h3 className="font-serif text-2xl font-bold text-[#1F3528] mb-3">Douceur Pastel</h3>
              <p className="font-sans text-xs text-[#6B756D] leading-relaxed mb-6 font-light">
                Harmonies poudrées, roses pâles et feuillages vaporeux pour exprimer la gratitude, fêter une amie ou réconforter avec délicatesse.
              </p>
            </div>
            <button 
              onClick={() => selectUniverseAndScroll('pastel')}
              className="inline-flex items-center justify-between text-xs font-mono font-bold text-[#C0593E] uppercase tracking-wider hover:underline text-left cursor-pointer pt-3 w-full"
            >
              <span>Découvrir la sélection Pastel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </TiltCard>

          {/* Mariages */}
          <TiltCard className="feature-card product-card group bg-white rounded-[2.5rem] p-7 border border-[#1F3528]/10 shadow-lg shadow-[#1F3528]/5 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#F3EDE4]">
                <img src="https://timabouquets.netlify.app/img/Bridetobe.png" alt="Mariages & Cérémonies" className="w-full h-full object-cover" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C0593E] font-bold block mb-1">UNIVERS 03</span>
              <h3 className="font-serif text-2xl font-bold text-[#1F3528] mb-3">Mariages & Cérémonies</h3>
              <p className="font-sans text-xs text-[#6B756D] leading-relaxed mb-6 font-light">
                Blancheurs immaculées, bouquets de mariée et bridal showers. La signature prestigieuse des moments d'union inoubliables à Dakar.
              </p>
            </div>
            <button 
              onClick={() => selectUniverseAndScroll('mariage')}
              className="inline-flex items-center justify-between text-xs font-mono font-bold text-[#C0593E] uppercase tracking-wider hover:underline text-left cursor-pointer pt-3 w-full"
            >
              <span>Découvrir la sélection Cérémonie</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </TiltCard>

        </div>
      </section>

      {/* =====================================================================
          4. SAVOIR-FAIRE — LE RITUEL D'EXCELLENCE
          ===================================================================== */}
      <section id="savoir-faire" className="py-24 px-6 sm:px-12 bg-[#F3EDE4]/50 border-y border-[#1F3528]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#C0593E] font-bold block mb-3">// L'EXIGENCE TIMABOUQUETS</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3528] font-bold tracking-tight mb-6">
                Pourquoi Nos Fleurs Éveillent Tant d'Émotion.
              </h2>
              <p className="font-sans text-[#6B756D] text-base font-light leading-relaxed mb-8">
                À Dakar, offrir des fleurs est un geste rare et précieux. Nous avons banni les tiges fatiguées et les arrangements impersonnels pour concevoir une expérience sensorielle intégrale.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C0593E]/10 text-[#C0593E] flex items-center justify-center font-serif font-bold text-lg shrink-0">1</div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#1F3528]">Arrivages Quotidiens Sélectionnés</h4>
                    <p className="font-sans text-xs text-[#6B756D] leading-relaxed">Chaque bouton est inspecté à l'aube pour garantir une tenue en vase prolongée de 7 à 10 jours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C0593E]/10 text-[#C0593E] flex items-center justify-center font-serif font-bold text-lg shrink-0">2</div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#1F3528]">Présentation Haute Couture & Sceau</h4>
                    <p className="font-sans text-xs text-[#6B756D] leading-relaxed">Papier d'orfèvre soyeux, ruban de satin noué à la main et carte de correspondance manuscrite sous pli scellé.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C0593E]/10 text-[#C0593E] flex items-center justify-center font-serif font-bold text-lg shrink-0">3</div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#1F3528]">Expédition Climatisée en Moins de 3H</h4>
                    <p className="font-sans text-xs text-[#6B756D] leading-relaxed">Nos coursiers dédiés transportent votre bouquet verticalement avec réservoir d'eau pour préserver l'effet de surprise intact.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-[#1F3528]/15 relative">
              <img src="https://timabouquets.netlify.app/img/Dearest.jpeg" alt="Bouquet Dearest en atelier" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161816]/85 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E8A793]">Atelier Privé Timabouquets</span>
                <span className="font-serif italic text-2xl font-bold">Façonné à la main, remis en mains propres.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          5. LA GRANDE COLLECTION — LES 14 VRAIS BOUQUETS CLIENT (EXPÉRIENCE MOBILE ÉLITE)
          ===================================================================== */}
      <section id="collection" className="py-20 sm:py-32 px-5 sm:px-12 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C0593E] font-bold block mb-2">// CATALOGUE OFFICIEL DAKAR</span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1F3528] font-bold tracking-tight">
              La Collection Complète (14 Créations)
            </h2>
          </div>
          <p className="font-sans text-[#6B756D] text-xs sm:text-sm font-light max-w-md">
            Photographies réelles prises dans nos ateliers. Prix transparents en FCFA, commande 1-clic pré-remplie sur WhatsApp.
          </p>
        </div>

        {/* Filtres par Univers / Catégories (Défilement horizontal doux sur mobile) */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 mb-4 sm:mb-8">
          <button 
            onClick={() => handleCategoryChange('all')} 
            className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shrink-0 ${
              selectedCategory === 'all' 
                ? 'bg-[#1F3528] text-white shadow-md' 
                : 'bg-white text-[#161816] hover:bg-[#F3EDE4] border border-[#1F3528]/15'
            }`}
          >
            Tous les Bouquets (14)
          </button>
          <button 
            onClick={() => handleCategoryChange('romance')} 
            className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shrink-0 ${
              selectedCategory === 'romance' 
                ? 'bg-[#1F3528] text-white shadow-md' 
                : 'bg-white text-[#161816] hover:bg-[#F3EDE4] border border-[#1F3528]/15'
            }`}
          >
            🌹 Romance &amp; Déclaration (5)
          </button>
          <button 
            onClick={() => handleCategoryChange('pastel')} 
            className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shrink-0 ${
              selectedCategory === 'pastel' 
                ? 'bg-[#1F3528] text-white shadow-md' 
                : 'bg-white text-[#161816] hover:bg-[#F3EDE4] border border-[#1F3528]/15'
            }`}
          >
            🌸 Douceur &amp; Pastel (5)
          </button>
          <button 
            onClick={() => handleCategoryChange('mariage')} 
            className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shrink-0 ${
              selectedCategory === 'mariage' 
                ? 'bg-[#1F3528] text-white shadow-md' 
                : 'bg-white text-[#161816] hover:bg-[#F3EDE4] border border-[#1F3528]/15'
            }`}
          >
            🕊️ Cérémonies &amp; Mariages (4)
          </button>
        </div>

        {/* Barre de contrôle mobile : sélecteur de mode d'affichage & compteur */}
        <div className="flex md:hidden items-center justify-between mb-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#1F3528]/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#1F3528] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C0593E]" />
            <span>
              {mobileCatalogView === 'carousel' 
                ? `Création 0${activeSlideIndex + 1} / 0${filteredProducts.length}` 
                : `${filteredProducts.length} créations`}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#F3EDE4] p-1 rounded-xl">
            <button
              onClick={() => setMobileCatalogView('carousel')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold flex items-center gap-1 transition-all ${
                mobileCatalogView === 'carousel' 
                  ? 'bg-white text-[#1F3528] shadow-xs' 
                  : 'text-[#6B756D]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Carrousel</span>
            </button>
            <button
              onClick={() => setMobileCatalogView('grid')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold flex items-center gap-1 transition-all ${
                mobileCatalogView === 'grid' 
                  ? 'bg-white text-[#1F3528] shadow-xs' 
                  : 'text-[#6B756D]'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grille 2x</span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
            A. MODE CARROUSEL MOBILE TACTILE HAUTE-COUTURE (md:hidden)
            ------------------------------------------------------------- */}
        {mobileCatalogView === 'carousel' && (
          <div className="block md:hidden">
            <div 
              ref={carouselContainerRef}
              onScroll={handleCarouselScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 no-scrollbar scroll-smooth"
            >
              {filteredProducts.map((p, idx) => (
                <div 
                  key={idx}
                  className="w-[82vw] max-w-[340px] shrink-0 snap-center rounded-[2.2rem] bg-white border border-[#1F3528]/10 shadow-xl overflow-hidden flex flex-col justify-between"
                >
                  <div 
                    className="relative w-full aspect-square overflow-hidden bg-[#F3EDE4] cursor-pointer"
                    onClick={() => setActiveModalProduct(p)}
                  >
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="w-full h-full object-cover object-center" 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-white/95 text-[#1F3528] shadow-sm">
                        {p.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3.5 right-3.5 z-10">
                      <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-[#161816]/90 text-white shadow-md">
                        {p.price}
                      </span>
                    </div>
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveModalProduct(p); }}
                        className="w-8 h-8 rounded-full bg-white/90 text-[#161816] flex items-center justify-center shadow-md"
                        title="Agrandir"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="font-mono text-[10px] text-[#C0593E] uppercase tracking-widest font-semibold block mb-1">
                        {p.categoryLabel}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1F3528] mb-1.5">
                        {p.name}
                      </h3>
                      <p className="font-sans text-xs text-[#6B756D] leading-relaxed mb-4 font-light line-clamp-2">
                        {p.desc}
                      </p>
                    </div>

                    <a 
                      href={getWhatsAppLink(p.name, p.price)}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-magnetic w-full py-3 rounded-full bg-[#1F3528] hover:bg-[#C0593E] text-white font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.938l-1.572 5.846 6.002-1.574c1.706.945 3.668 1.49 5.753 1.49 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.882 0-3.642-.524-5.15-1.433l-.369-.221-3.568.936.952-3.477-.243-.387c-1.007-1.604-1.543-3.47-1.543-5.418 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
                      <span>Commander sur WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Puces et boutons de défilement mobile */}
            <div className="flex items-center justify-between pt-3 px-2">
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] no-scrollbar py-1">
                {filteredProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeSlideIndex === i ? 'w-5 bg-[#C0593E]' : 'w-1.5 bg-[#1F3528]/25'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollCarousel('prev')}
                  disabled={activeSlideIndex === 0}
                  className="w-9 h-9 rounded-full bg-white border border-[#1F3528]/15 text-[#1F3528] flex items-center justify-center disabled:opacity-35 shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollCarousel('next')}
                  disabled={activeSlideIndex === filteredProducts.length - 1}
                  className="w-9 h-9 rounded-full bg-white border border-[#1F3528]/15 text-[#1F3528] flex items-center justify-center disabled:opacity-35 shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            B. MODE GRILLE DUO 2 COLONNES COMPACTE (md:hidden)
            ------------------------------------------------------------- */}
        {mobileCatalogView === 'grid' && (
          <div className="grid md:hidden grid-cols-2 gap-3.5">
            {filteredProducts.map((p, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveModalProduct(p)}
                className="bg-white rounded-[1.8rem] border border-[#1F3528]/10 shadow-md p-3 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F3EDE4] mb-2.5">
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/95 text-[#1F3528] shadow-xs">
                        {p.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 z-10">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#161816]/90 text-white shadow-xs">
                        {p.price}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-[#C0593E] uppercase tracking-wider block font-semibold">
                    {p.categoryLabel.split('&')[0]}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#1F3528] leading-tight mb-2 truncate">
                    {p.name}
                  </h4>
                </div>

                <a 
                  href={getWhatsAppLink(p.name, p.price)}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-2 rounded-full bg-[#1F3528] hover:bg-[#C0593E] text-white font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.938l-1.572 5.846 6.002-1.574c1.706.945 3.668 1.49 5.753 1.49 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.882 0-3.642-.524-5.15-1.433l-.369-.221-3.568.936.952-3.477-.243-.387c-1.007-1.604-1.543-3.47-1.543-5.418 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  <span>Commander</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* -------------------------------------------------------------
            C. GRILLE MAJESTUEUSE DESKTOP (hidden md:grid) AVEC TILT 3D
            ------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-4 gap-7">
          {filteredProducts.map((p, idx) => (
            <TiltCard 
              key={idx}
              className="product-card bg-white rounded-[2.2rem] border border-[#1F3528]/10 shadow-lg shadow-[#1F3528]/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div 
                className="relative w-full aspect-square overflow-hidden bg-[#F3EDE4] cursor-pointer group"
                onClick={() => setActiveModalProduct(p)}
              >
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="w-full h-full object-cover object-center" 
                  loading="lazy" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-white/95 text-[#1F3528] shadow-sm">
                    {p.tag}
                  </span>
                </div>
                <div className="absolute bottom-3.5 right-3.5 z-10">
                  <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-[#161816]/90 text-white shadow-md">
                    {p.price}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#161816]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white/90 text-[#161816] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5" /> Voir les détails
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="font-mono text-[10px] text-[#C0593E] uppercase tracking-widest font-semibold block mb-1">
                    {p.categoryLabel}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1F3528] mb-2">
                    {p.name}
                  </h3>
                  <p className="font-sans text-xs text-[#6B756D] leading-relaxed mb-6 font-light line-clamp-3">
                    {p.desc}
                  </p>
                </div>

                <a 
                  href={getWhatsAppLink(p.name, p.price)}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-magnetic w-full py-3 rounded-full bg-[#1F3528] hover:bg-[#C0593E] text-white font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.938l-1.572 5.846 6.002-1.574c1.706.945 3.668 1.49 5.753 1.49 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.882 0-3.642-.524-5.15-1.433l-.369-.221-3.568.936.952-3.477-.243-.387c-1.007-1.604-1.543-3.47-1.543-5.418 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  <span>Commander ce Bouquet</span>
                </a>
              </div>
            </TiltCard>
          ))}
        </div>

      </section>

      {/* =====================================================================
          6. MANIFESTE — AVEC RÉVÉLATION MOT PAR MOT AU SCROLL
          ===================================================================== */}
      <section id="manifeste" ref={manifestoRef} className="py-28 px-6 sm:px-12 bg-[#161816] text-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#E8A793] font-bold block mb-6">// NOTRE ENGAGEMENT DE COEUR</span>
          
          <p className="font-sans text-[#FAF7F2]/60 text-lg sm:text-2xl font-light leading-relaxed mb-8">
            La plupart des fleuristes se contentent de bouquets standardisés et de fleurs fatiguées sous cellophane.
          </p>

          <h2 className="font-serif italic text-4xl sm:text-6xl text-white font-normal leading-tight mb-10 flex flex-wrap justify-center">
            {manifestoText.split(" ").map((word, i) => (
              <span key={i} className="manifesto-word inline-block mr-2.5 transition-colors">
                {word}
              </span>
            ))}
          </h2>

          <div className="inline-flex items-center gap-6 font-mono text-xs text-[#FAF7F2]/50 uppercase tracking-widest pt-6 border-t border-white/10">
            <span>Maison Fondée à Dakar</span>
            <span>•</span>
            <span>Paiements Wave &amp; OM</span>
            <span>•</span>
            <span>Fleurs 100% Fraîches</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. SECTION TÉMOIGNAGES ENRICHIE & ANIMÉE (CARROUSEL FLUIDE MOBILE & ORDI)
          ===================================================================== */}
      <section id="temoignages" className="py-20 sm:py-28 px-5 sm:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C0593E] font-bold block mb-2">// 06 EXPÉRIENCES CLIENTS AUTHENTIQUES</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1F3528] font-bold">Le Témoignage de l'Émotion à Dakar.</h2>
            <p className="font-sans text-[#6B756D] text-xs sm:text-sm mt-2 font-light">Toutes nos créations sont accompagnées d'un suivi photographique WhatsApp avant expédition.</p>
          </div>

          {/* Boutons fléchés de contrôle (Desktop & Mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs text-[#1F3528]/70 font-semibold mr-2">
              Avis 0{activeTestimonialIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button 
              onClick={() => scrollTestimonials('prev')}
              aria-label="Avis précédent"
              className="w-10 h-10 rounded-full bg-white border border-[#1F3528]/15 text-[#1F3528] hover:bg-[#1F3528] hover:text-white transition-colors flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollTestimonials('next')}
              aria-label="Avis suivant"
              className="w-10 h-10 rounded-full bg-white border border-[#1F3528]/15 text-[#1F3528] hover:bg-[#1F3528] hover:text-white transition-colors flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rail de défilement horizontal fluide des 6 témoignages */}
        <div 
          ref={testimonialRailRef}
          onScroll={handleTestimonialScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-7 pb-6 px-1 no-scrollbar scroll-smooth"
        >
          {TESTIMONIALS.map((t, idx) => {
            const isHighlight = idx === activeTestimonialIndex;
            return (
              <div 
                key={idx}
                onClick={() => scrollToTestimonial(idx)}
                className={`w-[85vw] max-w-[360px] md:w-[390px] shrink-0 snap-center rounded-[2.2rem] p-7 sm:p-8 border transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                  isHighlight 
                    ? 'bg-white border-[#C0593E] shadow-2xl ring-2 ring-[#C0593E]/20 scale-[1.01]' 
                    : 'bg-white/90 border-[#1F3528]/10 shadow-md hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500 text-sm gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#C0593E] border border-[#1F3528]/10">
                      {t.tag}
                    </span>
                  </div>

                  <p className="font-serif italic text-base sm:text-lg text-[#1F3528] leading-relaxed mb-6">
                    « {t.text} »
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F3528]/10 flex items-center justify-between font-mono text-xs">
                  <div>
                    <strong className="text-[#161816] block font-sans font-bold text-sm">{t.name}</strong>
                    <span className="text-[#6B756D] text-[11px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C0593E]" /> {t.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Achat Vérifié
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Puces de navigation interactive */}
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToTestimonial(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeTestimonialIndex === i ? 'w-8 bg-[#C0593E]' : 'w-2 bg-[#1F3528]/20'
              }`}
              title={`Avis ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* =====================================================================
          8. FAQ INTERACTIVE (ACCORDÉON REACT)
          ===================================================================== */}
      <section id="faq" className="py-20 sm:py-24 px-5 sm:px-12 bg-[#F3EDE4]/40 border-t border-[#1F3528]/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C0593E] font-bold block mb-2">// QUESTIONS FRÉQUENTES</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1F3528] font-bold">Tout Savoir sur Votre Commande.</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Comment fonctionne la livraison express à Dakar ?",
                a: "Dès confirmation sur WhatsApp, nos fleuristes préparent votre composition et confient le bouquet à notre coursier dédié. La livraison s'effectue en 1h30 à 3h selon votre quartier (Almadies, Ngor, Ouakam, Mermoz, Plateau, Point E, Maristes...)."
              },
              {
                q: "Quels modes de règlement acceptez-vous ?",
                a: "Nous acceptons les règlements instantanés par Wave et Orange Money sur notre numéro officiel (+221 77 747 54 20). Vous pouvez aussi régler en espèces à la livraison."
              },
              {
                q: "Le mot personnalisé d'accompagnement est-il inclus ?",
                a: "Oui, absolument. Chaque commande inclut gratuitement une élégante carte de correspondance rédigée à la main avec votre message personnel, remise sous pli cacheté."
              },
              {
                q: "Peut-on demander une création personnalisée non présente au catalogue ?",
                a: "Tout à fait. Sur simple message WhatsApp, vous pouvez partager une photo d'inspiration ou exprimer votre budget : notre cheffe d'atelier compose un arrangement sur-mesure spécialement pour vous."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#1F3528]/10 overflow-hidden shadow-xs">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left font-serif text-lg sm:text-xl font-bold text-[#1F3528] flex justify-between items-center cursor-pointer"
                >
                  <span>{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="text-[#C0593E] w-5 h-5 shrink-0" /> : <ChevronDown className="text-[#C0593E] w-5 h-5 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 text-[#6B756D] font-sans text-xs sm:text-sm leading-relaxed border-t border-[#1F3528]/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. FOOTER STATUTAIRE HAUTE COUTURE — ÉPURÉ, LUXUEUX & PROFESSIONNEL
          ===================================================================== */}
      <footer className="bg-[#101210] text-[#FAF7F2] rounded-t-[3rem] sm:rounded-t-[4rem] pt-14 sm:pt-16 pb-10 px-5 sm:px-12 lg:px-16 border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Grille Principale Aérée & Équilibrée */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 border-b border-white/10">
            
            {/* Col 1 : Marque & Identité (5 cols) */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-lg">
                  <img src="https://timabouquets.netlify.app/img/logo.png" alt="Timabouquets" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-serif font-bold text-xl sm:text-2xl tracking-wider block text-white leading-none">TIMABOUQUETS</span>
                  <span className="font-mono text-[9px] text-[#E8A793] tracking-widest uppercase mt-1 block">Haute Maison Florale · Dakar</span>
                </div>
              </div>
              <p className="font-sans text-[#FAF7F2]/70 text-xs sm:text-sm max-w-sm leading-relaxed mb-5 font-light">
                L'orfèvrerie florale au service de vos plus belles émotions. Fleurs fraîches coupées le matin, pli scellé et remise en mains propres soignée en moins de 3 heures à Dakar.
              </p>
              
              {/* Réseaux Sociaux & Contact Direct */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://instagram.com/timabouquets" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C0593E] transition-all flex items-center justify-center text-white" 
                  title="Instagram @timabouquets"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@timabouquets" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C0593E] transition-all flex items-center justify-center text-white" 
                  title="TikTok @timabouquets"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center gap-2 text-white text-xs font-mono font-bold shadow-md shadow-[#25D366]/30" 
                  title="WhatsApp Ligne Directe"
                >
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.938l-1.572 5.846 6.002-1.574c1.706.945 3.668 1.49 5.753 1.49 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.882 0-3.642-.524-5.15-1.433l-.369-.221-3.568.936.952-3.477-.243-.387c-1.007-1.604-1.543-3.47-1.543-5.418 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>

            {/* Col 2 : Liens Rapides (3 cols) */}
            <div className="md:col-span-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#E8A793] font-bold mb-3 sm:mb-4">Maison Florale</h4>
              <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#FAF7F2]/75">
                <li><a href="#univers" className="hover:text-white transition-colors">Nos 3 Univers Signatures</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Collection Complète (14)</a></li>
                <li><a href="#savoir-faire" className="hover:text-white transition-colors">Notre Savoir-Faire Artisanal</a></li>
                <li><a href="#temoignages" className="hover:text-white transition-colors">Témoignages Clients</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Questions Fréquentes</a></li>
              </ul>
            </div>

            {/* Col 3 : Atelier Dakar & Paiements (4 cols) */}
            <div className="md:col-span-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#E8A793] font-bold mb-3 sm:mb-4">Atelier & Expéditions</h4>
              <div className="space-y-2.5 font-sans text-xs sm:text-sm text-[#FAF7F2]/75">
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E8A793] shrink-0" />
                  <span>Ouvert 7j/7 de 08h00 à 21h00</span>
                </p>
                <p className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#E8A793] shrink-0" />
                  <span>Livraison express &lt; 3h dans tout Dakar</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E8A793] shrink-0" />
                  <a href={`tel:+${WHATSAPP_PHONE}`} className="hover:text-white font-mono text-xs text-white">
                    Ligne : {DISPLAY_PHONE}
                  </a>
                </p>

                {/* Badges de paiements sénégalais */}
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-sky-500/15 border border-sky-400/30 text-sky-300 font-mono text-[10px] font-bold">
                      Wave
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-orange-500/15 border border-orange-400/30 text-orange-300 font-mono text-[10px] font-bold">
                      Orange Money
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono text-[10px]">
                      Espèces
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Barre inférieure de statut et copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#FAF7F2]/50 gap-3">
            <div>© {new Date().getFullYear()} Timabouquets Dakar · Haute Maison Florale · Tous droits réservés.</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DAKAR · ATELIER EN ACTIVITÉ</span>
            </div>
          </div>

        </div>
      </footer>

      {/* =====================================================================
          10. MODAL DE DÉTAIL DU BOUQUET (LIGHTBOX ÉLÉGANTE)
          ===================================================================== */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl border border-[#1F3528]/15 relative">
            <button 
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 text-[#161816] flex items-center justify-center hover:bg-[#C0593E] hover:text-white transition-colors shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-square bg-[#F3EDE4] overflow-hidden">
                <img 
                  src={activeModalProduct.img} 
                  alt={activeModalProduct.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              <div className="p-7 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#C0593E] uppercase tracking-widest font-bold block mb-1">
                    {activeModalProduct.categoryLabel}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#1F3528] mb-2">
                    {activeModalProduct.name}
                  </h3>
                  <div className="font-mono text-lg font-bold text-[#C0593E] mb-4">
                    {activeModalProduct.price}
                  </div>
                  <p className="font-sans text-xs text-[#6B756D] leading-relaxed mb-4">
                    {activeModalProduct.desc}
                  </p>
                  <div className="text-[11px] font-mono text-[#1F3528]/80 mb-6 bg-[#FAF7F2] p-3 rounded-xl border border-[#1F3528]/10">
                    <strong>Occasions recommandées :</strong><br />
                    {activeModalProduct.occasions}
                  </div>
                </div>

                <a 
                  href={getWhatsAppLink(activeModalProduct.name, activeModalProduct.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Commander sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          11. VRAI BOUTON FLOTTANT WHATSAPP DYNAMIQUE HAUTE-FIDÉLITÉ
          (PULSATION CIRCULAIRE SOIE, BADGE EN LIGNE, TRACÉ SVG OFFICIEL)
          ===================================================================== */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        
        {/* Tooltip badge dynamique flottant discret (desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-[#1F3528]/10 text-xs font-mono text-[#161816]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Atelier en direct · Réponse &lt; 5 min</span>
        </div>

        {/* Bouton vert WhatsApp officiel avec pulsation pure par box-shadow (zéro artefact GPU) */}
        <a 
          href={getWhatsAppLink()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-float-btn relative p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:bg-[#20ba59] transition-all" 
          title="Discuter directement avec l'atelier sur WhatsApp"
        >
          {/* VRAI LOGO VECTORIEL SVG OFFICIEL WHATSAPP */}
          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.572 5.938l-1.572 5.846 6.002-1.574c1.706.945 3.668 1.49 5.753 1.49 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.882 0-3.642-.524-5.15-1.433l-.369-.221-3.568.936.952-3.477-.243-.387c-1.007-1.604-1.543-3.47-1.543-5.418 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}
