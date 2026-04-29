import { useEffect, useState, type FormEvent } from "react";
import AdminPanel from "./AdminPanel";
import {
  defaultContent,
  type GalleryItem,
  type HotelContent,
  type Room,
} from "./hotelContent";

const STORAGE_KEY = "austina-hotel-content-v1";
const ADMIN_PASSWORD = "AUSTINA2026";
const [isAdmin, setIsAdminOpen] = useState(false);
useEffect(() => {
  let clickCount = 0;
  const handleSecretTap = () => {
    clickCount++;
    if (clickCount === 5) {
      setIsAdminOpen((prev: boolean) => !prev);
      alert("Admin Mode Toggled");
      clickCount = 0;
    }
    setTimeout(() => { clickCount = 0; }, 2000);
  };
  window.addEventListener('click', handleSecretTap);
  return () => window.removeEventListener('click', handleSecretTap);
}, []);
useEffect(() => {
  const savedContent = localStorage.getItem(STORAGE_KEY);
  if (savedContent) {
    // This tells the site: "Don't use the default photos, use my saved ones!"
    setContent(JSON.parse(savedContent)); 
  }
}, []);
const navLinks = [
  { label: "Suites", href: "#rooms" },
  { label: "Gallery", href: "#gallery" },
  { label: "Dining", href: "#dining" },
  { label: "Wellness", href: "#wellness" },
  { label: "Contact", href: "#contact" },
];

const cloneContent = (content: HotelContent): HotelContent =>
  JSON.parse(JSON.stringify(content)) as HotelContent;

const loadStoredContent = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return cloneContent(defaultContent);

    const parsed = JSON.parse(saved) as HotelContent;
    if (!parsed.brand || !parsed.sections || !parsed.contact) {
      return cloneContent(defaultContent);
    }
    return parsed;
  } catch {
    return cloneContent(defaultContent);
  }
};

const getDateOffset = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#b9934b]">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight text-[#142124] md:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-[#5e6a68] md:text-lg">{copy}</p>
      ) : null}
    </div>
  );
}

function App() {
  const [content, setContent] = useState<HotelContent>(() => loadStoredContent());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeOffer, setActiveOffer] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [checkIn, setCheckIn] = useState(() => getDateOffset(1));
  const [checkOut, setCheckOut] = useState(() => getDateOffset(3));
  const [guests, setGuests] = useState("2 Adults");
  const [formStatus, setFormStatus] = useState("");

  const galleryItems = content.gallery.length ? content.gallery : defaultContent.gallery;
  const rooms = content.rooms.length ? content.rooms : defaultContent.rooms;
  const experiences = content.experiences.length ? content.experiences : defaultContent.experiences;
  const diningVenues = content.diningVenues.length ? content.diningVenues : defaultContent.diningVenues;
  const offers = content.offers.length ? content.offers : defaultContent.offers;
  const testimonials = content.testimonials.length ? content.testimonials : defaultContent.testimonials;
  const awards = content.awards.length ? content.awards : defaultContent.awards;
  const treatments = content.treatments.length ? content.treatments : defaultContent.treatments;
  const socialLinks = content.socialLinks.length ? content.socialLinks : defaultContent.socialLinks;
  const heroImage = content.brand.heroImage || defaultContent.brand.heroImage;
  const wellnessImage = content.sections.wellnessBackgroundImage || defaultContent.sections.wellnessBackgroundImage;
  const activeGalleryItem = galleryItems[activeGallery % galleryItems.length] ?? galleryItems[0];
  const activeOfferItem = offers[activeOffer % offers.length] ?? offers[0];
  const activeTestimonialItem = testimonials[activeTestimonial % testimonials.length] ?? testimonials[0];
  const today = getDateOffset(0);
  const phoneHref = `tel:${content.contact.phoneRaw || content.contact.phoneDisplay}`;
  const mapQuery = content.contact.mapQuery || content.contact.address;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const cleanWhatsappNumber = (content.contact.whatsappNumber || content.contact.phoneRaw).replace(/[^\d]/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hello ${content.brand.hotelName} ${content.brand.heroTitleBottom}, I would like to check availability from ${checkIn} to ${checkOut} for ${guests}.`,
  );
  const whatsappHref = cleanWhatsappNumber ? `https://wa.me/${cleanWhatsappNumber}?text=${whatsappMessage}` : "#contact";

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      window.console.warn("Austina Hotel CMS content could not be saved in this browser.");
    }
  }, [content]);

  useEffect(() => {
    document.title = `${content.brand.hotelName} ${content.brand.heroTitleBottom} Lagos | Luxury Hotel`;
  }, [content.brand.heroTitleBottom, content.brand.hotelName]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true" || window.location.hash === "#admin") {
      setIsAdminOpen(true);
    }
  }, []);

  useEffect(() => {
    if (activeGallery >= galleryItems.length) setActiveGallery(0);
  }, [activeGallery, galleryItems.length]);

  useEffect(() => {
    if (activeOffer >= offers.length) setActiveOffer(0);
  }, [activeOffer, offers.length]);

  useEffect(() => {
    if (activeTestimonial >= testimonials.length) setActiveTestimonial(0);
  }, [activeTestimonial, testimonials.length]);

  useEffect(() => {
    const galleryTimer = window.setInterval(() => {
      setActiveGallery((current) => (current + 1) % galleryItems.length);
    }, 7000);
    const offerTimer = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % offers.length);
    }, 8200);
    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 7600);

    return () => {
      window.clearInterval(galleryTimer);
      window.clearInterval(offerTimer);
      window.clearInterval(testimonialTimer);
    };
  }, [galleryItems.length, offers.length, testimonials.length]);

  const moveGallery = (direction: number) => {
    setActiveGallery((current) => (current + direction + galleryItems.length) % galleryItems.length);
  };

  const moveOffer = (direction: number) => {
    setActiveOffer((current) => (current + direction + offers.length) % offers.length);
  };

  const moveTestimonial = (direction: number) => {
    setActiveTestimonial((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  const resetContent = () => {
    const shouldReset = window.confirm("Reset the website content to the original Austina Hotel version?");
    if (shouldReset) {
      setContent(cloneContent(defaultContent));
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "Guest");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent(`Reservation enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
    setFormStatus("Thank you — your email app has been opened with your enquiry details.");
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f3ea] pb-32 text-[#172123] antialiased md:pb-0">
      <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-[#0d1719]/55 px-4 py-3 text-white shadow-2xl shadow-black/20 backdrop-blur-xl md:px-6">
          <a href="#home" className="group flex items-center gap-3" aria-label={`${content.brand.hotelName} home`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7b46a]/60 bg-white/10 font-display text-xl font-semibold text-[#f7d891] shadow-inner shadow-white/10">
              {content.brand.logoLetter || "A"}
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl font-semibold tracking-[0.12em]">
                {content.brand.hotelName}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.38em] text-white/60">
                {content.brand.hotelSuffix}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-white/78 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[#f3d184]">
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="rounded-full border border-[#d6b56e]/60 bg-[#d6b56e] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#172123] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#f0d28a]"
          >
            {content.brand.ctaPrimary}
          </a>
        </nav>
      </header>

      <div className="fixed bottom-4 left-1/2 z-50 w-[min(94vw,1180px)] -translate-x-1/2 md:bottom-auto md:top-24">
        <div className="rounded-[1.7rem] border border-white/65 bg-white/90 p-3 shadow-2xl shadow-[#071112]/25 backdrop-blur-2xl md:rounded-full md:p-2">
          <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
            <label className="group rounded-2xl border border-[#eadfca] bg-[#fbf8f0] px-4 py-3 md:rounded-full">
              <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#a17d34]">
                Check-in
              </span>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                className="mt-1 w-full bg-transparent text-sm font-semibold text-[#172123] outline-none"
                aria-label="Check-in date"
              />
            </label>
            <label className="group rounded-2xl border border-[#eadfca] bg-[#fbf8f0] px-4 py-3 md:rounded-full">
              <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#a17d34]">
                Check-out
              </span>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                className="mt-1 w-full bg-transparent text-sm font-semibold text-[#172123] outline-none"
                aria-label="Check-out date"
              />
            </label>
            <label className="group rounded-2xl border border-[#eadfca] bg-[#fbf8f0] px-4 py-3 md:rounded-full">
              <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#a17d34]">
                Guests
              </span>
              <select
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
                className="mt-1 w-full bg-transparent text-sm font-semibold text-[#172123] outline-none"
                aria-label="Guests"
              >
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>Family of 4</option>
                <option>Group / Event</option>
              </select>
            </label>
            <a
              href="#contact"
              className="flex h-full items-center justify-center rounded-2xl bg-[#0e6f70] px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white shadow-xl shadow-[#0e6f70]/25 transition hover:-translate-y-0.5 hover:bg-[#0a5c5d] md:rounded-full"
            >
              Check Availability
            </a>
          </div>
        </div>
      </div>

      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden bg-[#071112] px-5 py-28 text-white md:px-10"
        >
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-80 transition-transform duration-[3000ms]"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-label={content.brand.heroAlt}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(15,111,112,0.25),transparent_28%),linear-gradient(90deg,rgba(5,12,14,0.88),rgba(5,12,14,0.52)_45%,rgba(5,12,14,0.22))]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f8f3ea] via-[#f8f3ea]/20 to-transparent" />

          <div className="relative z-10 mx-auto mt-14 grid w-full max-w-7xl gap-12 md:mt-20 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5d88d] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5d88d]" />
                {content.brand.locationLine}
              </div>
              <h1 className="font-display text-6xl font-semibold leading-[0.82] tracking-tight text-white md:text-8xl lg:text-[9.5rem]">
                {content.brand.heroTitleTop}
                <span className="block text-[#f5d88d]">{content.brand.heroTitleBottom}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-white/82 md:text-2xl">
                {content.brand.heroTagline}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#d6b56e] px-8 py-4 text-sm font-bold uppercase tracking-[0.24em] text-[#172123] shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:bg-[#f0d28a]"
                >
                  {content.brand.ctaPrimary}
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/18"
                >
                  {content.brand.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/16 bg-white/10 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f5d88d]">
                {content.brand.signatureEyebrow}
              </p>
              <p className="mt-5 font-display text-4xl leading-tight text-white md:text-5xl">
                {content.brand.signatureTitle}
              </p>
              <p className="mt-5 text-sm leading-7 text-white/62">{content.brand.signatureCopy}</p>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 text-center">
                {content.brand.stats.slice(0, 3).map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <p className="font-display text-4xl text-[#f5d88d]">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/58">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#gallery"
            className="scroll-arrow absolute bottom-9 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70 md:flex"
            aria-label="Scroll to gallery"
          >
            Scroll
            <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/40 p-1">
              <span className="h-2 w-2 rounded-full bg-[#f5d88d]" />
            </span>
          </a>
        </section>

        <section id="gallery" className="px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow={content.sections.gallery.eyebrow}
              title={content.sections.gallery.title}
              copy={content.sections.gallery.copy}
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.34fr]">
              <div className="group relative min-h-[520px] overflow-hidden rounded-[2.5rem] bg-[#0b1517] shadow-2xl shadow-[#38524f]/20">
                <img
                  src={activeGalleryItem.image || defaultContent.gallery[0].image}
                  alt={activeGalleryItem.alt}
                  className="h-full min-h-[520px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071112]/88 via-[#071112]/18 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f2cf82]">
                    {activeGalleryItem.label}
                  </p>
                  <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="font-display text-4xl font-semibold text-white md:text-6xl">
                        {activeGalleryItem.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                        {activeGalleryItem.copy}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightboxImage(activeGalleryItem)}
                      className="rounded-full border border-white/25 bg-white/12 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:bg-white/22"
                    >
                      Open Lightbox
                    </button>
                  </div>
                </div>
                <div className="absolute right-5 top-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => moveGallery(-1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/25"
                    aria-label="Previous gallery image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => moveGallery(1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/25"
                    aria-label="Next gallery image"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                {galleryItems.map((item, index) => (
                  <button
                    key={`${item.title}-${index}`}
                    type="button"
                    onClick={() => setActiveGallery(index)}
                    className={`group relative min-h-36 overflow-hidden rounded-[1.5rem] border text-left shadow-xl transition ${
                      activeGallery === index
                        ? "border-[#d6b56e] shadow-[#d6b56e]/20"
                        : "border-white/60 shadow-black/5"
                    }`}
                  >
                    <img
                      src={item.image || defaultContent.gallery[0].image}
                      alt={item.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#071112]/78 via-[#071112]/12 to-transparent" />
                    <span className="absolute bottom-4 left-4 right-4 font-display text-2xl font-semibold text-white">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="rooms" className="bg-[#101b1d] px-5 py-24 text-white md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <SectionHeading
                eyebrow={content.sections.rooms.eyebrow}
                title={content.sections.rooms.title}
                copy={content.sections.rooms.copy}
                align="left"
              />
              <p className="max-w-2xl text-base leading-8 text-white/62 lg:justify-self-end">
                {content.sections.roomsSideCopy}
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rooms.map((room, index) => (
                <article
                  key={`${room.name}-${index}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={room.image || defaultContent.rooms[0].image}
                      alt={room.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b1d]/70 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-[#d6b56e] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#101b1d]">
                      {room.size}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-3xl font-semibold text-white">{room.name}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-7 text-white/62">{room.description}</p>
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                      <p>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#d6b56e]">
                          Starting at
                        </span>
                        <span className="mt-1 block text-lg font-semibold text-white">{room.price}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedRoom(room)}
                        className="rounded-full border border-[#d6b56e]/55 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cf82] transition hover:bg-[#d6b56e] hover:text-[#101b1d]"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiences" className="px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow={content.sections.experiences.eyebrow}
              title={content.sections.experiences.title}
              copy={content.sections.experiences.copy}
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {experiences.map((experience, index) => (
                <article
                  key={`${experience.title}-${index}`}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#d4c5a9]/25"
                >
                  <div className="h-72 overflow-hidden">
                    <img
                      src={experience.image || defaultContent.experiences[0].image}
                      alt={experience.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0e6f70]">
                      {experience.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-[#142124]">
                      {experience.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#68716f]">{experience.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dining" className="bg-[#eee4d3] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <SectionHeading
                eyebrow={content.sections.dining.eyebrow}
                title={content.sections.dining.title}
                copy={content.sections.dining.copy}
                align="left"
              />
              <div className="rounded-[2rem] border border-[#d7c7a8] bg-[#f8f3ea]/80 p-6 shadow-xl shadow-[#c8b896]/20">
                <p className="font-display text-3xl leading-tight text-[#142124]">
                  {content.sections.diningNote}
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {diningVenues.map((venue, index) => (
                <article
                  key={`${venue.name}-${index}`}
                  className="grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#cbb990]/20 lg:grid-cols-[0.9fr_1fr]"
                >
                  <img
                    src={venue.image || defaultContent.diningVenues[0].image}
                    alt={venue.name}
                    loading="lazy"
                    className="h-72 w-full object-cover lg:h-full"
                  />
                  <div className="flex flex-col justify-between p-7">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#b9934b]">
                        {venue.hours}
                      </p>
                      <h3 className="mt-3 font-display text-4xl font-semibold text-[#142124]">
                        {venue.name}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[#68716f]">{venue.description}</p>
                    </div>
                    <a
                      href="#contact"
                      className="mt-8 inline-flex w-fit rounded-full border border-[#0e6f70]/25 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0e6f70] transition hover:bg-[#0e6f70] hover:text-white"
                    >
                      Reserve a Table
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="wellness" className="relative overflow-hidden bg-[#0d1719] px-5 py-24 text-white md:px-10 md:py-32">
          <div className="absolute inset-0 opacity-35">
            <img
              src={wellnessImage}
              alt="Spa stones and treatment setting"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0d1719_0%,rgba(13,23,25,0.94)_38%,rgba(13,23,25,0.62)_100%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow={content.sections.wellness.eyebrow}
              title={content.sections.wellness.title}
              copy={content.sections.wellness.copy}
              align="left"
            />
            <div className="rounded-[2.25rem] border border-white/12 bg-white/10 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <h3 className="font-display text-4xl font-semibold text-white">Treatment Preview</h3>
                <span className="rounded-full bg-[#d6b56e] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#101b1d]">
                  {content.sections.wellnessBadge}
                </span>
              </div>
              <div className="divide-y divide-white/10">
                {treatments.map((treatment, index) => (
                  <div key={`${treatment.name}-${index}`} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                    <p className="font-display text-2xl text-white">{treatment.name}</p>
                    <p className="text-sm text-white/58">{treatment.time}</p>
                    <p className="font-semibold text-[#f2cf82]">{treatment.price}</p>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#0d1719] transition hover:-translate-y-1 hover:bg-[#f2cf82]"
              >
                Request Spa Menu
              </a>
            </div>
          </div>
        </section>

        <section id="offers" className="px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow={content.sections.offers.eyebrow}
                title={content.sections.offers.title}
                copy={content.sections.offers.copy}
                align="left"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveOffer(-1)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[#0e6f70]/20 bg-white text-2xl text-[#0e6f70] shadow-lg transition hover:bg-[#0e6f70] hover:text-white"
                  aria-label="Previous offer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => moveOffer(1)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[#0e6f70]/20 bg-white text-2xl text-[#0e6f70] shadow-lg transition hover:bg-[#0e6f70] hover:text-white"
                  aria-label="Next offer"
                >
                  ›
                </button>
              </div>
            </div>

            <article className="grid overflow-hidden rounded-[2.5rem] bg-[#101b1d] shadow-2xl shadow-[#31514f]/20 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[420px]">
                <img
                  src={activeOfferItem.image || defaultContent.offers[0].image}
                  alt={activeOfferItem.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#101b1d]/15 to-[#101b1d]/70 lg:hidden" />
              </div>
              <div className="p-7 text-white md:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#f2cf82]">
                  {activeOfferItem.subtitle}
                </p>
                <h3 className="mt-4 font-display text-5xl font-semibold leading-none md:text-7xl">
                  {activeOfferItem.title}
                </h3>
                <p className="mt-6 text-lg leading-8 text-white/68">{activeOfferItem.description}</p>
                <p className="mt-7 font-display text-4xl text-[#f2cf82]">{activeOfferItem.price}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {activeOfferItem.inclusions.map((inclusion) => (
                    <div key={inclusion} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-sm font-semibold text-white/82">{inclusion}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-9 inline-flex rounded-full bg-[#d6b56e] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#101b1d] transition hover:-translate-y-1 hover:bg-[#f2cf82]"
                >
                  Claim Offer
                </a>
                <div className="mt-8 flex gap-2">
                  {offers.map((offer, index) => (
                    <button
                      key={`${offer.title}-${index}`}
                      type="button"
                      onClick={() => setActiveOffer(index)}
                      className={`h-2 rounded-full transition ${
                        activeOffer === index ? "w-10 bg-[#d6b56e]" : "w-2 bg-white/25"
                      }`}
                      aria-label={`Show offer ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="testimonials" className="bg-[#fdfaf4] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#b9934b]">
              {content.sections.testimonialsEyebrow}
            </p>
            <div className="mt-8 rounded-[2.5rem] border border-[#eadfca] bg-white p-7 shadow-2xl shadow-[#d8c7a6]/25 md:p-12">
              <p className="font-display text-5xl leading-tight text-[#142124] md:text-7xl">“</p>
              <blockquote className="mx-auto max-w-4xl font-display text-3xl leading-tight text-[#142124] md:text-5xl">
                {activeTestimonialItem.quote}
              </blockquote>
              <div className="mt-8">
                <p className="font-semibold text-[#142124]">{activeTestimonialItem.guest}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.24em] text-[#8c7a57]">
                  {activeTestimonialItem.origin}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => moveTestimonial(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c7a6] text-2xl text-[#0e6f70] transition hover:bg-[#0e6f70] hover:text-white"
                  aria-label="Previous testimonial"
                >
                  ‹
                </button>
                {testimonials.map((testimonial, index) => (
                  <button
                    key={`${testimonial.guest}-${index}`}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition ${
                      activeTestimonial === index ? "w-9 bg-[#0e6f70]" : "w-2 bg-[#d8c7a6]"
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => moveTestimonial(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c7a6] text-2xl text-[#0e6f70] transition hover:bg-[#0e6f70] hover:text-white"
                  aria-label="Next testimonial"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="press" className="px-5 py-18 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#eadfca] bg-[#142124] p-8 text-white shadow-2xl shadow-[#142124]/20 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#f2cf82]">
                  {content.sections.awardsEyebrow}
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
                  {content.sections.awardsTitle}
                </h2>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-5">
                {awards.map((award, index) => (
                  <div
                    key={`${award}-${index}`}
                    className="grid min-h-28 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center"
                  >
                    <span className="font-display text-xl leading-tight text-white/82">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow={content.sections.contact.eyebrow}
              title={content.sections.contact.title}
              copy={content.sections.contact.copy}
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2.25rem] bg-[#101b1d] p-6 text-white shadow-2xl shadow-[#31514f]/20 md:p-8">
                <h3 className="font-display text-4xl font-semibold">{content.sections.reservationsTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {content.sections.reservationsCopy}
                </p>

                <form onSubmit={handleContactSubmit} className="mt-8 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f2cf82]">Name</span>
                    <input
                      name="name"
                      required
                      placeholder="Your full name"
                      className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#d6b56e]"
                    />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f2cf82]">Email</span>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#d6b56e]"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f2cf82]">Phone</span>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+234..."
                        className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#d6b56e]"
                      />
                    </label>
                  </div>
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f2cf82]">Message</span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your stay, event, dining, or spa request."
                      className="resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#d6b56e]"
                    />
                  </label>
                  <button
                    type="submit"
                    className="rounded-full bg-[#d6b56e] px-7 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#101b1d] transition hover:-translate-y-1 hover:bg-[#f2cf82]"
                  >
                    Send Enquiry
                  </button>
                  {formStatus ? <p className="text-sm text-[#f2cf82]">{formStatus}</p> : null}
                </form>
              </div>

              <div className="overflow-hidden rounded-[2.25rem] bg-white shadow-2xl shadow-[#d4c5a9]/25">
                <iframe
                  title={`${content.brand.hotelName} location map`}
                  src={mapSrc}
                  className="h-80 w-full border-0 md:h-[430px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#b9934b]">Address</p>
                    <p className="mt-2 text-sm leading-6 text-[#4e5b59]">
                      {content.contact.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#b9934b]">Phone</p>
                    <a href={phoneHref} className="mt-2 block text-sm font-semibold text-[#0e6f70]">
                      {content.contact.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#b9934b]">Email</p>
                    <a
                      href={`mailto:${content.contact.email}`}
                      className="mt-2 block text-sm font-semibold text-[#0e6f70]"
                    >
                      {content.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#071112] px-5 py-14 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d7b46a]/60 bg-white/10 font-display text-2xl text-[#f7d891]">
                {content.brand.logoLetter || "A"}
              </span>
              <div>
                <p className="font-display text-3xl font-semibold tracking-[0.12em]">{content.brand.hotelName}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-white/50">{content.brand.hotelSuffix}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/58">
              {content.sections.footerCopy}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={`${social.label}-${social.href}`}
                  href={social.href || "#home"}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-bold text-white/70 transition hover:border-[#d6b56e] hover:text-[#f2cf82]"
                  aria-label={`${social.label} social profile`}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-3xl font-semibold">Quick Links</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/62">
              {navLinks.concat([{ label: "Offers", href: "#offers" }, { label: "Experiences", href: "#experiences" }]).map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-[#f2cf82]">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-3xl font-semibold">{content.sections.newsletterTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-white/58">
              {content.sections.newsletterCopy}
            </p>
            <form
              className="mt-5 flex overflow-hidden rounded-full border border-white/10 bg-white/[0.06] p-1"
              onSubmit={(event) => {
                event.preventDefault();
                window.alert(`Thank you for joining the ${content.brand.hotelName} newsletter.`);
              }}
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                className="rounded-full bg-[#d6b56e] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#071112]"
              >
                Join
</footer>
    {isAdmin && (
      <button 
        type="button"
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-28 left-4 z-[60] rounded-full bg-black/80 p-4 text-white shadow-lg"
      >
        Owner Edit
      </button>
    )}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-28 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/25 transition hover:-translate-y-1 md:bottom-8 md:right-8"
        aria-label={`Chat with ${content.brand.hotelName} on WhatsApp`}
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M16.04 3C9.02 3 3.3 8.62 3.3 15.52c0 2.22.6 4.38 1.73 6.27L3 29l7.42-1.94a12.97 12.97 0 0 0 5.62 1.28c7.02 0 12.73-5.62 12.73-12.52C28.77 8.62 23.06 3 16.04 3Zm0 22.98c-1.84 0-3.64-.5-5.2-1.45l-.37-.22-4.4 1.15 1.17-4.2-.25-.39a10.08 10.08 0 0 1-1.55-5.35c0-5.58 4.75-10.13 10.6-10.13 5.84 0 10.6 4.55 10.6 10.13 0 5.59-4.76 10.46-10.6 10.46Zm5.82-7.82c-.32-.16-1.9-.92-2.2-1.03-.3-.1-.51-.16-.73.16-.22.32-.84 1.03-1.03 1.24-.19.22-.38.24-.7.08-.32-.16-1.35-.49-2.57-1.55-.95-.83-1.6-1.86-1.78-2.18-.19-.32-.02-.49.14-.65.14-.14.32-.38.49-.57.16-.19.22-.32.32-.54.11-.22.05-.4-.03-.57-.08-.16-.73-1.72-1-2.35-.26-.62-.53-.54-.73-.55h-.62c-.22 0-.57.08-.87.4-.3.32-1.14 1.1-1.14 2.68 0 1.58 1.17 3.1 1.33 3.32.16.22 2.3 3.45 5.57 4.84.78.33 1.38.53 1.85.68.78.24 1.49.21 2.05.13.63-.09 1.9-.76 2.17-1.5.27-.73.27-1.36.19-1.5-.08-.13-.3-.21-.62-.37Z" />
        </svg>
      </a>

      {lightboxImage ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#071112]/92 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <div className="max-h-[86vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <img src={lightboxImage.image || defaultContent.gallery[0].image} alt={lightboxImage.alt} className="max-h-[72vh] w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b9934b]">{lightboxImage.label}</p>
              <h3 className="mt-2 font-display text-4xl font-semibold text-[#142124]">{lightboxImage.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#68716f]">{lightboxImage.copy}</p>
            </div>
          </div>
        </div>
      ) : null}

      {selectedRoom ? (
        <div className="fixed inset-0 z-[75] grid place-items-center bg-[#071112]/90 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-[#f8f3ea] shadow-2xl">
            <button
              type="button"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl text-[#142124] shadow-lg"
              onClick={() => setSelectedRoom(null)}
              aria-label="Close room details"
            >
              ×
            </button>
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <img src={selectedRoom.image || defaultContent.rooms[0].image} alt={selectedRoom.alt} className="h-full min-h-[360px] w-full object-cover" />
              <div className="p-7 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b9934b]">{selectedRoom.size}</p>
                <h3 className="mt-3 font-display text-5xl font-semibold leading-none text-[#142124]">
                  {selectedRoom.name}
                </h3>
                <p className="mt-5 text-base leading-8 text-[#5e6a68]">{selectedRoom.description}</p>
                <p className="mt-6 font-display text-4xl text-[#0e6f70]">{selectedRoom.price}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {selectedRoom.details.map((detail) => (
                    <div key={detail} className="rounded-2xl border border-[#eadfca] bg-white p-4 text-sm font-semibold text-[#142124]">
                      {detail}
                    </div>
                  ))}
                </div>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    onClick={() => setSelectedRoom(null)}
                    className="rounded-full bg-[#0e6f70] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#0a5c5d]"
                  >
                    Enquire Now
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedRoom(null)}
                    className="rounded-full border border-[#142124]/15 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#142124] transition hover:bg-white"
                  >
                    Keep Exploring
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isAdminOpen ? (
        <AdminPanel
          content={content}
          setContent={setContent}
          onClose={() => setIsAdminOpen(false)}
          onReset={resetContent}
          adminPassword={ADMIN_PASSWORD}
        />
      ) : null}
    </div>
  );
}

export default App;
