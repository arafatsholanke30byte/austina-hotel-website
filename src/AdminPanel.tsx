import { useState, type ChangeEvent, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";
import { defaultContent, type HotelContent } from "./hotelContent";

type EditorTab =
  | "Brand"
  | "Sections"
  | "Gallery"
  | "Rooms"
  | "Experiences"
  | "Dining"
  | "Spa"
  | "Offers"
  | "Testimonials"
  | "Awards"
  | "Contact";

type AdminPanelProps = {
  content: HotelContent;
  setContent: Dispatch<SetStateAction<HotelContent>>;
  onClose: () => void;
  onReset: () => void;
  adminPassword: string;
};

const tabs: EditorTab[] = [
  "Brand",
  "Sections",
  "Gallery",
  "Rooms",
  "Experiences",
  "Dining",
  "Spa",
  "Offers",
  "Testimonials",
  "Awards",
  "Contact",
];

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "password";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#9c7a36]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#e6d9bf] bg-white px-4 py-3 text-sm font-medium text-[#142124] outline-none transition focus:border-[#0e6f70] focus:ring-4 focus:ring-[#0e6f70]/10"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#9c7a36]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-2xl border border-[#e6d9bf] bg-white px-4 py-3 text-sm font-medium leading-7 text-[#142124] outline-none transition focus:border-[#0e6f70] focus:ring-4 focus:ring-[#0e6f70]/10"
      />
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-3 rounded-3xl border border-[#e6d9bf] bg-[#fbf8f0] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#9c7a36]">{label}</span>
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-full border border-[#d9c8a9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b1d1d] transition hover:bg-[#8b1d1d] hover:text-white"
        >
          Clear
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-[170px_1fr] md:items-center">
        <div className="h-32 overflow-hidden rounded-2xl bg-[#142124]/10">
          {value ? (
            <img src={value} alt="Editable preview" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#8c7a57]">
              No Image
            </div>
          )}
        </div>
        <div className="grid gap-3">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Paste image URL here"
            className="w-full rounded-2xl border border-[#e6d9bf] bg-white px-4 py-3 text-sm font-medium text-[#142124] outline-none transition focus:border-[#0e6f70] focus:ring-4 focus:ring-[#0e6f70]/10"
          />
          <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#0e6f70]/40 bg-white px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#0e6f70] transition hover:bg-[#0e6f70] hover:text-white">
            Upload from device
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
          <p className="text-xs leading-5 text-[#68716f]">
            You can paste a hosted image URL or upload from your device. Uploaded images save in this browser.
          </p>
        </div>
      </div>
    </div>
  );
}

function EditorCard({
  title,
  children,
  onRemove,
  canRemove = true,
}: {
  title: string;
  children: ReactNode;
  onRemove?: () => void;
  canRemove?: boolean;
}) {
  return (
    <div className="rounded-[2rem] border border-[#e6d9bf] bg-white p-4 shadow-xl shadow-[#d8c7a6]/10 md:p-5">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#efe4d0] pb-4">
        <h3 className="font-display text-2xl font-semibold text-[#142124]">{title}</h3>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
            className="rounded-full bg-[#8b1d1d] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#631414] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Remove
          </button>
        ) : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function EmptyHint({ label }: { label: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[#d6b56e] bg-[#fbf8f0] p-8 text-center text-sm font-semibold text-[#68716f]">
      No {label} yet. Use the add button below to create one.
    </div>
  );
}

export default function AdminPanel({
  content,
  setContent,
  onClose,
  onReset,
  adminPassword,
}: AdminPanelProps) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("austina-admin-unlocked") === "true");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState<EditorTab>("Brand");
  const [notice, setNotice] = useState("Changes save automatically on this browser.");

  const updateContent = (mutator: (draft: HotelContent) => void) => {
    setContent((current) => {
      const draft = clone(current);
      mutator(draft);
      return draft;
    });
    setNotice("Saved automatically. Export JSON if you want a backup or permanent deployment copy.");
  };

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === adminPassword) {
      sessionStorage.setItem("austina-admin-unlocked", "true");
      setUnlocked(true);
      setPasswordError("");
      return;
    }
    setPasswordError("Incorrect password. Please try again.");
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "austina-hotel-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Content exported as a JSON backup file.");
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as HotelContent;
        if (!parsed.brand || !parsed.sections || !parsed.contact) {
          throw new Error("Invalid content file");
        }
        setContent(parsed);
        setNotice("Imported content successfully.");
      } catch {
        setNotice("Import failed. Please use a valid Austina Hotel content JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const logout = () => {
    sessionStorage.removeItem("austina-admin-unlocked");
    setUnlocked(false);
    setPassword("");
  };

  const addGalleryItem = () =>
    updateContent((draft) => {
      draft.gallery.push({
        title: "New Gallery Image",
        label: "New Feature",
        image: defaultContent.gallery[0].image,
        alt: "Hotel image",
        copy: "Write a beautiful description for this image.",
      });
    });

  const addRoom = () =>
    updateContent((draft) => {
      draft.rooms.push({
        name: "New Suite",
        description: "Describe this room or suite.",
        price: "₦0 / night",
        image: defaultContent.rooms[0].image,
        alt: "Hotel suite image",
        size: "40 sqm",
        details: ["King bed", "Breakfast", "Wi‑Fi"],
      });
    });

  const addExperience = () =>
    updateContent((draft) => {
      draft.experiences.push({
        title: "New Experience",
        eyebrow: "Experience",
        description: "Describe the experience.",
        image: defaultContent.experiences[0].image,
      });
    });

  const addDiningVenue = () =>
    updateContent((draft) => {
      draft.diningVenues.push({
        name: "New Venue",
        description: "Describe the restaurant, bar, or lounge.",
        image: defaultContent.diningVenues[0].image,
        hours: "Open daily",
      });
    });

  const addOffer = () =>
    updateContent((draft) => {
      draft.offers.push({
        title: "New Offer",
        subtitle: "Offer subtitle",
        description: "Describe the offer package.",
        price: "From ₦0",
        image: defaultContent.offers[0].image,
        inclusions: ["Inclusion one", "Inclusion two"],
      });
    });

  const addTestimonial = () =>
    updateContent((draft) => {
      draft.testimonials.push({
        quote: "Write a guest quote here.",
        guest: "Guest Name",
        origin: "City, Country",
      });
    });

  const addTreatment = () =>
    updateContent((draft) => {
      draft.treatments.push({ name: "New Treatment", time: "60 min", price: "₦0" });
    });

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-[90] grid place-items-center bg-[#071112]/88 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
        <div className="w-full max-w-md rounded-[2rem] bg-[#f8f3ea] p-6 shadow-2xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b9934b]">Owner access</p>
              <h2 className="mt-2 font-display text-4xl font-semibold leading-none text-[#142124]">Austina CMS</h2>
            </div>
            <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white text-2xl text-[#142124] shadow-lg">
              ×
            </button>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#68716f]">
            Enter the owner password to edit text, replace images, remove sections, and manage the website content.
          </p>
          <form onSubmit={handleUnlock} className="mt-6 grid gap-4">
            <TextField label="Password" value={password} onChange={setPassword} placeholder="Enter owner password" type="password" />
            <button type="submit" className="rounded-full bg-[#0e6f70] px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#0a5c5d]">
              Unlock Editor
            </button>
            {passwordError ? <p className="text-sm font-semibold text-[#8b1d1d]">{passwordError}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] bg-[#071112]/82 p-3 backdrop-blur-md md:p-6" role="dialog" aria-modal="true">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[2rem] bg-[#f8f3ea] shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-[#e6d9bf] bg-white/90 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b9934b]">Private backend editor</p>
            <h2 className="font-display text-3xl font-semibold text-[#142124] md:text-4xl">Austina Hotel CMS</h2>
            <p className="mt-1 text-xs font-semibold text-[#68716f]">{notice}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={handleExport} className="rounded-full border border-[#0e6f70]/30 bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0e6f70] transition hover:bg-[#0e6f70] hover:text-white">
              Export Backup
            </button>
            <label className="cursor-pointer rounded-full border border-[#d6b56e]/50 bg-[#fff8e7] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9c7a36] transition hover:bg-[#d6b56e] hover:text-[#142124]">
              Import JSON
              <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
            </label>
            <button type="button" onClick={onReset} className="rounded-full border border-[#8b1d1d]/20 bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b1d1d] transition hover:bg-[#8b1d1d] hover:text-white">
              Reset Site
            </button>
            <button type="button" onClick={logout} className="rounded-full border border-[#142124]/10 bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#142124] transition hover:bg-[#142124] hover:text-white">
              Lock
            </button>
            <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#142124] text-2xl text-white">
              ×
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <aside className="border-b border-[#e6d9bf] bg-[#fbf8f0] p-3 md:w-64 md:overflow-y-auto md:border-b-0 md:border-r">
            <div className="flex gap-2 overflow-x-auto md:grid md:overflow-visible">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.18em] transition md:rounded-2xl ${
                    activeTab === tab ? "bg-[#0e6f70] text-white shadow-lg shadow-[#0e6f70]/20" : "bg-white text-[#68716f] hover:text-[#0e6f70]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </aside>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
            {activeTab === "Brand" ? (
              <div className="grid gap-5">
                <EditorCard title="Logo, hero and main call-to-action">
                  <div className="grid gap-4 md:grid-cols-3">
                    <TextField label="Logo letter" value={content.brand.logoLetter} onChange={(value) => updateContent((draft) => { draft.brand.logoLetter = value; })} />
                    <TextField label="Hotel name" value={content.brand.hotelName} onChange={(value) => updateContent((draft) => { draft.brand.hotelName = value; })} />
                    <TextField label="Small brand line" value={content.brand.hotelSuffix} onChange={(value) => updateContent((draft) => { draft.brand.hotelSuffix = value; })} />
                  </div>
                  <TextField label="Location line" value={content.brand.locationLine} onChange={(value) => updateContent((draft) => { draft.brand.locationLine = value; })} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="Hero title top" value={content.brand.heroTitleTop} onChange={(value) => updateContent((draft) => { draft.brand.heroTitleTop = value; })} />
                    <TextField label="Hero title bottom" value={content.brand.heroTitleBottom} onChange={(value) => updateContent((draft) => { draft.brand.heroTitleBottom = value; })} />
                  </div>
                  <TextAreaField label="Hero tagline" value={content.brand.heroTagline} onChange={(value) => updateContent((draft) => { draft.brand.heroTagline = value; })} />
                  <ImageField label="Hero background image" value={content.brand.heroImage} onChange={(value) => updateContent((draft) => { draft.brand.heroImage = value; })} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="Primary CTA" value={content.brand.ctaPrimary} onChange={(value) => updateContent((draft) => { draft.brand.ctaPrimary = value; })} />
                    <TextField label="Secondary CTA" value={content.brand.ctaSecondary} onChange={(value) => updateContent((draft) => { draft.brand.ctaSecondary = value; })} />
                  </div>
                </EditorCard>
                <EditorCard title="Hero signature card and stats">
                  <TextField label="Signature eyebrow" value={content.brand.signatureEyebrow} onChange={(value) => updateContent((draft) => { draft.brand.signatureEyebrow = value; })} />
                  <TextAreaField label="Signature title" value={content.brand.signatureTitle} onChange={(value) => updateContent((draft) => { draft.brand.signatureTitle = value; })} />
                  <TextAreaField label="Signature supporting copy" value={content.brand.signatureCopy} onChange={(value) => updateContent((draft) => { draft.brand.signatureCopy = value; })} />
                  <div className="grid gap-4 md:grid-cols-3">
                    {content.brand.stats.map((stat, index) => (
                      <div key={`${stat.label}-${index}`} className="grid gap-3 rounded-2xl border border-[#e6d9bf] bg-[#fbf8f0] p-4">
                        <TextField label="Value" value={stat.value} onChange={(value) => updateContent((draft) => { draft.brand.stats[index].value = value; })} />
                        <TextField label="Label" value={stat.label} onChange={(value) => updateContent((draft) => { draft.brand.stats[index].label = value; })} />
                        <button type="button" onClick={() => updateContent((draft) => { draft.brand.stats.splice(index, 1); })} className="rounded-full bg-[#8b1d1d] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white disabled:opacity-40" disabled={content.brand.stats.length <= 1}>
                          Remove Stat
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => updateContent((draft) => { draft.brand.stats.push({ value: "New", label: "Stat" }); })} className="rounded-full bg-[#0e6f70] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Add Stat
                  </button>
                </EditorCard>
              </div>
            ) : null}

            {activeTab === "Sections" ? (
              <div className="grid gap-5">
                {([
                  ["Gallery heading", "gallery"],
                  ["Rooms heading", "rooms"],
                  ["Experiences heading", "experiences"],
                  ["Dining heading", "dining"],
                  ["Wellness heading", "wellness"],
                  ["Offers heading", "offers"],
                  ["Contact heading", "contact"],
                ] as const).map(([title, key]) => (
                  <EditorCard key={key} title={title}>
                    <TextField label="Eyebrow" value={content.sections[key].eyebrow} onChange={(value) => updateContent((draft) => { draft.sections[key].eyebrow = value; })} />
                    <TextAreaField label="Title" value={content.sections[key].title} onChange={(value) => updateContent((draft) => { draft.sections[key].title = value; })} rows={3} />
                    <TextAreaField label="Copy" value={content.sections[key].copy} onChange={(value) => updateContent((draft) => { draft.sections[key].copy = value; })} rows={4} />
                  </EditorCard>
                ))}
                <EditorCard title="Other section text">
                  <TextAreaField label="Rooms side copy" value={content.sections.roomsSideCopy} onChange={(value) => updateContent((draft) => { draft.sections.roomsSideCopy = value; })} />
                  <TextAreaField label="Dining note" value={content.sections.diningNote} onChange={(value) => updateContent((draft) => { draft.sections.diningNote = value; })} />
                  <TextField label="Wellness badge" value={content.sections.wellnessBadge} onChange={(value) => updateContent((draft) => { draft.sections.wellnessBadge = value; })} />
                  <ImageField label="Wellness background image" value={content.sections.wellnessBackgroundImage} onChange={(value) => updateContent((draft) => { draft.sections.wellnessBackgroundImage = value; })} />
                  <TextField label="Testimonials eyebrow" value={content.sections.testimonialsEyebrow} onChange={(value) => updateContent((draft) => { draft.sections.testimonialsEyebrow = value; })} />
                  <TextField label="Awards eyebrow" value={content.sections.awardsEyebrow} onChange={(value) => updateContent((draft) => { draft.sections.awardsEyebrow = value; })} />
                  <TextAreaField label="Awards title" value={content.sections.awardsTitle} onChange={(value) => updateContent((draft) => { draft.sections.awardsTitle = value; })} />
                  <TextField label="Reservations title" value={content.sections.reservationsTitle} onChange={(value) => updateContent((draft) => { draft.sections.reservationsTitle = value; })} />
                  <TextAreaField label="Reservations copy" value={content.sections.reservationsCopy} onChange={(value) => updateContent((draft) => { draft.sections.reservationsCopy = value; })} />
                  <TextAreaField label="Footer copy" value={content.sections.footerCopy} onChange={(value) => updateContent((draft) => { draft.sections.footerCopy = value; })} />
                  <TextField label="Newsletter title" value={content.sections.newsletterTitle} onChange={(value) => updateContent((draft) => { draft.sections.newsletterTitle = value; })} />
                  <TextAreaField label="Newsletter copy" value={content.sections.newsletterCopy} onChange={(value) => updateContent((draft) => { draft.sections.newsletterCopy = value; })} />
                </EditorCard>
              </div>
            ) : null}

            {activeTab === "Gallery" ? (
              <div className="grid gap-5">
                {content.gallery.length ? content.gallery.map((item, index) => (
                  <EditorCard key={`${item.title}-${index}`} title={`Gallery ${index + 1}: ${item.title}`} onRemove={() => updateContent((draft) => { draft.gallery.splice(index, 1); })} canRemove={content.gallery.length > 1}>
                    <ImageField label="Image" value={item.image} onChange={(value) => updateContent((draft) => { draft.gallery[index].image = value; })} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Title" value={item.title} onChange={(value) => updateContent((draft) => { draft.gallery[index].title = value; })} />
                      <TextField label="Small label" value={item.label} onChange={(value) => updateContent((draft) => { draft.gallery[index].label = value; })} />
                    </div>
                    <TextField label="Image alt text" value={item.alt} onChange={(value) => updateContent((draft) => { draft.gallery[index].alt = value; })} />
                    <TextAreaField label="Description" value={item.copy} onChange={(value) => updateContent((draft) => { draft.gallery[index].copy = value; })} />
                  </EditorCard>
                )) : <EmptyHint label="gallery images" />}
                <button type="button" onClick={addGalleryItem} className="rounded-full bg-[#0e6f70] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Add Gallery Image
                </button>
              </div>
            ) : null}

            {activeTab === "Rooms" ? (
              <div className="grid gap-5">
                {content.rooms.length ? content.rooms.map((room, index) => (
                  <EditorCard key={`${room.name}-${index}`} title={`Room ${index + 1}: ${room.name}`} onRemove={() => updateContent((draft) => { draft.rooms.splice(index, 1); })} canRemove={content.rooms.length > 1}>
                    <ImageField label="Room image" value={room.image} onChange={(value) => updateContent((draft) => { draft.rooms[index].image = value; })} />
                    <div className="grid gap-4 md:grid-cols-3">
                      <TextField label="Room name" value={room.name} onChange={(value) => updateContent((draft) => { draft.rooms[index].name = value; })} />
                      <TextField label="Starting price" value={room.price} onChange={(value) => updateContent((draft) => { draft.rooms[index].price = value; })} />
                      <TextField label="Size" value={room.size} onChange={(value) => updateContent((draft) => { draft.rooms[index].size = value; })} />
                    </div>
                    <TextField label="Image alt text" value={room.alt} onChange={(value) => updateContent((draft) => { draft.rooms[index].alt = value; })} />
                    <TextAreaField label="Short description" value={room.description} onChange={(value) => updateContent((draft) => { draft.rooms[index].description = value; })} />
                    <TextAreaField label="Details / amenities, one per line" value={room.details.join("\n")} onChange={(value) => updateContent((draft) => { draft.rooms[index].details = splitLines(value); })} rows={5} />
                  </EditorCard>
                )) : <EmptyHint label="rooms" />}
                <button type="button" onClick={addRoom} className="rounded-full bg-[#0e6f70] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Add Room
                </button>
              </div>
            ) : null}

            {activeTab === "Experiences" ? (
              <div className="grid gap-5">
                {content.experiences.length ? content.experiences.map((experience, index) => (
                  <EditorCard key={`${experience.title}-${index}`} title={`Experience ${index + 1}: ${experience.title}`} onRemove={() => updateContent((draft) => { draft.experiences.splice(index, 1); })} canRemove={content.experiences.length > 1}>
                    <ImageField label="Experience image" value={experience.image} onChange={(value) => updateContent((draft) => { draft.experiences[index].image = value; })} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Title" value={experience.title} onChange={(value) => updateContent((draft) => { draft.experiences[index].title = value; })} />
                      <TextField label="Eyebrow" value={experience.eyebrow} onChange={(value) => updateContent((draft) => { draft.experiences[index].eyebrow = value; })} />
                    </div>
                    <TextAreaField label="Description" value={experience.description} onChange={(value) => updateContent((draft) => { draft.experiences[index].description = value; })} />
                  </EditorCard>
                )) : <EmptyHint label="experiences" />}
                <button type="button" onClick={addExperience} className="rounded-full bg-[#0e6f70] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Add Experience
                </button>
              </div>
            ) : null}

            {activeTab === "Dining" ? (
              <div className="grid gap-5">
                {content.diningVenues.length ? content.diningVenues.map((venue, index) => (
                  <EditorCard key={`${venue.name}-${index}`} title={`Venue ${index + 1}: ${venue.name}`} onRemove={() => updateContent((draft) => { draft.diningVenues.splice(index, 1); })} canRemove={content.diningVenues.length > 1}>
                    <ImageField label="Venue image" value={venue.image} onChange={(value) => updateContent((draft) => { draft.diningVenues[index].image = value; })} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Venue name" value={venue.name} onChange={(value) => updateContent((draft) => { draft.diningVenues[index].name = value; })} />
                      <TextField label="Hours" value={venue.hours} onChange={(value) => updateContent((draft) => { draft.diningVenues[index].hours = value; })} />
                    </div>
                    <TextAreaField label="Description" value={venue.description} onChange={(value) => updateContent((draft) => { draft.diningVenues[index].description = value; })} />
                  </EditorCard>
                )) : <EmptyHint label="dining venues" />}
                <button type="button" onClick={addDiningVenue} className="rounded-full bg-[#0e6f70] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Add Dining Venue
                </button>
              </div>
            ) : null}

            {activeTab === "Spa" ? (
              <div className="grid gap-5">
                <EditorCard title="Spa design assets">
                  <ImageField label="Wellness background image" value={content.sections.wellnessBackgroundImage} onChange={(value) => updateContent((draft) => { draft.sections.wellnessBackgroundImage = value; })} />
                  <TextField label="Wellness badge" value={content.sections.wellnessBadge} onChange={(value) => updateContent((draft) => { draft.sections.wellnessBadge = value; })} />
                </EditorCard>
                {content.treatments.length ? content.treatments.map((treatment, index) => (
                  <EditorCard key={`${treatment.name}-${index}`} title={`Treatment ${index + 1}: ${treatment.name}`} onRemove={() => updateContent((draft) => { draft.treatments.splice(index, 1); })} canRemove={content.treatments.length > 1}>
                    <div className="grid gap-4 md:grid-cols-3">
                      <TextField label="Treatment name" value={treatment.name} onChange={(value) => updateContent((draft) => { draft.treatments[index].name = value; })} />
                      <TextField label="Duration" value={treatment.time} onChange={(value) => updateContent((draft) => { draft.treatments[index].time = value; })} />
                      <TextField label="Price" value={treatment.price} onChange={(value) => updateContent((draft) => { draft.treatments[index].price = value; })} />
                    </div>
                  </EditorCard>
                )) : <EmptyHint label="treatments" />}
                <button type="button" onClick={addTreatment} className="rounded-full bg-[#0e6f70] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Add Treatment
                </button>
              </div>
            ) : null}

            {activeTab === "Offers" ? (
              <div className="grid gap-5">
                {content.offers.length ? content.offers.map((offer, index) => (
                  <EditorCard key={`${offer.title}-${index}`} title={`Offer ${index + 1}: ${offer.title}`} onRemove={() => updateContent((draft) => { draft.offers.splice(index, 1); })} canRemove={content.offers.length > 1}>
                    <ImageField label="Offer image" value={offer.image} onChange={(value) => updateContent((draft) => { draft.offers[index].image = value; })} />
                    <div className="grid gap-4 md:grid-cols-3">
                      <TextField label="Title" value={offer.title} onChange={(value) => updateContent((draft) => { draft.offers[index].title = value; })} />
                      <TextField label="Subtitle" value={offer.subtitle} onChange={(value) => updateContent((draft) => { draft.offers[index].subtitle = value; })} />
                      <TextField label="Price" value={offer.price} onChange={(value) => updateContent((draft) => { draft.offers[index].price = value; })} />
                    </div>
                    <TextAreaField label="Description" value={offer.description} onChange={(value) => updateContent((draft) => { draft.offers[index].description = value; })} />
                    <TextAreaField label="Inclusions, one per line" value={offer.inclusions.join("\n")} onChange={(value) => updateContent((draft) => { draft.offers[index].inclusions = splitLines(value); })} rows={5} />
                  </EditorCard>
                )) : <EmptyHint label="offers" />}
                <button type="button" onClick={addOffer} className="rounded-full bg-[#0e6f70] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Add Offer
                </button>
              </div>
            ) : null}

            {activeTab === "Testimonials" ? (
              <div className="grid gap-5">
                {content.testimonials.length ? content.testimonials.map((testimonial, index) => (
                  <EditorCard key={`${testimonial.guest}-${index}`} title={`Testimonial ${index + 1}: ${testimonial.guest}`} onRemove={() => updateContent((draft) => { draft.testimonials.splice(index, 1); })} canRemove={content.testimonials.length > 1}>
                    <TextAreaField label="Quote" value={testimonial.quote} onChange={(value) => updateContent((draft) => { draft.testimonials[index].quote = value; })} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Guest name" value={testimonial.guest} onChange={(value) => updateContent((draft) => { draft.testimonials[index].guest = value; })} />
                      <TextField label="Origin" value={testimonial.origin} onChange={(value) => updateContent((draft) => { draft.testimonials[index].origin = value; })} />
                    </div>
                  </EditorCard>
                )) : <EmptyHint label="testimonials" />}
                <button type="button" onClick={addTestimonial} className="rounded-full bg-[#0e6f70] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Add Testimonial
                </button>
              </div>
            ) : null}

            {activeTab === "Awards" ? (
              <div className="grid gap-5">
                <EditorCard title="Awards and press logos/text">
                  {content.awards.map((award, index) => (
                    <div key={`${award}-${index}`} className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                      <TextField label={`Award ${index + 1}`} value={award} onChange={(value) => updateContent((draft) => { draft.awards[index] = value; })} />
                      <button type="button" onClick={() => updateContent((draft) => { draft.awards.splice(index, 1); })} disabled={content.awards.length <= 1} className="rounded-full bg-[#8b1d1d] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white disabled:opacity-40">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => updateContent((draft) => { draft.awards.push("New Award"); })} className="rounded-full bg-[#0e6f70] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Add Award
                  </button>
                </EditorCard>
              </div>
            ) : null}

            {activeTab === "Contact" ? (
              <div className="grid gap-5">
                <EditorCard title="Contact details, map and social links">
                  <TextAreaField label="Address" value={content.contact.address} onChange={(value) => updateContent((draft) => { draft.contact.address = value; })} rows={3} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="Phone display" value={content.contact.phoneDisplay} onChange={(value) => updateContent((draft) => { draft.contact.phoneDisplay = value; })} type="tel" />
                    <TextField label="Phone raw for calling" value={content.contact.phoneRaw} onChange={(value) => updateContent((draft) => { draft.contact.phoneRaw = value; })} type="tel" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="WhatsApp number" value={content.contact.whatsappNumber} onChange={(value) => updateContent((draft) => { draft.contact.whatsappNumber = value; })} type="tel" />
                    <TextField label="Email" value={content.contact.email} onChange={(value) => updateContent((draft) => { draft.contact.email = value; })} type="email" />
                  </div>
                  <TextField label="Google Maps search query" value={content.contact.mapQuery} onChange={(value) => updateContent((draft) => { draft.contact.mapQuery = value; })} />
                  <div className="grid gap-4 md:grid-cols-2">
                    {content.socialLinks.map((social, index) => (
                      <div key={`${social.label}-${index}`} className="grid gap-3 rounded-2xl border border-[#e6d9bf] bg-[#fbf8f0] p-4">
                        <TextField label="Social label" value={social.label} onChange={(value) => updateContent((draft) => { draft.socialLinks[index].label = value; })} />
                        <TextField label="Social URL" value={social.href} onChange={(value) => updateContent((draft) => { draft.socialLinks[index].href = value; })} />
                        <button type="button" onClick={() => updateContent((draft) => { draft.socialLinks.splice(index, 1); })} className="rounded-full bg-[#8b1d1d] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white disabled:opacity-40" disabled={content.socialLinks.length <= 1}>
                          Remove Social
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => updateContent((draft) => { draft.socialLinks.push({ label: "NEW", href: "#" }); })} className="rounded-full bg-[#0e6f70] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Add Social Link
                  </button>
                </EditorCard>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
