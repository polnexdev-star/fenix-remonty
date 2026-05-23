import {
  Phone,
  Mail,
  MapPin,
  Hammer,
  Paintbrush,
  Bath,
  Home,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function AnimatedNumber({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  return (
    <motion.span
      initial={{ count: 0 }}
      whileInView={{ count: end }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 2 }}
      onUpdate={(latest) => {
        if (latest.count !== undefined) {
          setCount(Math.round(latest.count));
        }
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [realizations, setRealizations] = useState([]);
  const [beforeAfter, setBeforeAfter] = useState([]);
  const [contact, setContact] = useState(null);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "review"]{
        name,
        text
      }`)
      .then((data) => setReviews(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "realization"]{
        title,
        image{
          asset->{
            url
          }
        }
      }`)
      .then((data) => setRealizations(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
  client
    .fetch(`*[_type == "beforeAfter"]{
      title,
      beforeImage{
        asset->{
          url
        }
      },
      afterImage{
        asset->{
          url
        }
      }
    }`)
    .then((data) => setBeforeAfter(data))
    .catch(console.error);
  }, []);

  useEffect(() => {
  client
    .fetch(`*[_type == "contact"][0]`)
    .then((data) => setContact(data))
    .catch(console.error);
}, []);
  

  useEffect(() => {
  client
    .fetch(`*[_type == "service"]{
      title,
      text,
      icon
    }`)
    .then((data) => setServices(data))
    .catch(console.error);
}, []);

useEffect(() => {
  client
    .fetch(`*[_type == "blog"] | order(publishedAt desc){
      title,
      excerpt,
      slug,
      image{
        asset->{
          url
        }
      }
    }`)
    .then((data) => setBlogs(data))
    .catch(console.error);
}, []);

const icons = {
  home: <Home />,
  bath: <Bath />,
  paint: <Paintbrush />,
  hammer: <Hammer />,
};

  const features = [
    "Darmowa wycena",
    "Terminowa realizacja",
    "Kompleksowa obsługa",
    "Nowoczesne wykończenia",
  ];

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  message: "",
  filesLink: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const text = await response.text();
    const result = text ? JSON.parse(text) : {};

    if (!response.ok) {
      console.error("Błąd API:", result);
      alert("Błąd wysyłki. Sprawdź konsolę.");
      return;
    }

    alert("Zapytanie wysłane!");

    setFormData({
      name: "",
      phone: "",
      message: "",
      filesLink: "",
    });
  } catch (error) {
    console.error("Błąd formularza:", error);
    alert("Błąd formularza.");
  }
};

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen bg-black text-white overflow-x-hidden"
>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-yellow-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Fenix logo"
              className="w-12 h-12 rounded-xl object-cover"
            />

            <div>
              <p className="font-black text-xl leading-none">
                <span className="text-yellow-400">FENIX</span>
              </p>

              <p className="text-xs text-gray-400">
                Remonty i Wykończenia
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-300">


            <a
              href="#uslugi"
              className="hover:text-yellow-400 transition duration-300"
            >
              Usługi
            </a>

            <a
              href="#realizacje"
              className="hover:text-yellow-400 transition duration-300"
            >
              Realizacje
            </a>

            <a
              href="#kontakt"
              className="hover:text-yellow-400 transition duration-300"
            >
              Kontakt
            </a>
          </nav>
<button
  onClick={() => setMobileMenu(!mobileMenu)}
  className="md:hidden text-yellow-400 ml-auto"
>
  {mobileMenu ? <X size={32} /> : <Menu size={32} />}
</button>
          
 
                   
          <a
  href={`tel:${contact?.phone}`}
  className="hidden md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold transition duration-300 hover:scale-105 active:scale-95"
>
  <Phone size={18} />
  {contact?.phone}
</a>
        </div>
      </header>
      {mobileMenu && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="fixed top-24 left-0 w-full bg-black border-b border-yellow-500/10 z-40 md:hidden"
  >
    <div className="flex flex-col p-6 gap-6 text-xl">
      <a href="#uslugi" onClick={() => setMobileMenu(false)}>
        Usługi
      </a>

      <a href="#realizacje" onClick={() => setMobileMenu(false)}>
        Realizacje
      </a>

      <a href="#kontakt" onClick={() => setMobileMenu(false)}>
        Kontakt
      </a>
    </div>
  </motion.div>
)}

      {/* HERO */}
      <section className="relative pt-36 pb-24">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),linear-gradient(180deg,#050505,#000)]" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 rounded-full px-5 py-2 text-yellow-400 text-sm mb-8">
              <CheckCircle size={16} />
              Bochnia i okolice
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Remonty i wykończenia wnętrz{" "}
              <span className="text-yellow-400">
                pod klucz
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
              Kompleksowo wykonujemy remonty mieszkań, domów,
              kuchni, łazienek oraz wykończenia ze stanu
              deweloperskiego.
            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href="#kontakt"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black text-lg transition duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                Umów wycenę
                <ArrowRight size={20} />
              </a>

              <a
                href={`tel:${contact?.phone}`}
                className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-2xl font-bold text-lg transition duration-300 hover:scale-105 active:scale-95"
              >
                Zadzwoń teraz
              </a>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >

            <div className="absolute -inset-8 bg-yellow-500/10 blur-3xl rounded-full" />

            <div className="relative bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-6 shadow-2xl transition duration-300 hover:scale-[1.02]">

              <img
                src="/logo.jpg"
                alt="Fenix Remonty"
                className="w-full rounded-[32px] object-cover"
              />

            </div>
          </motion.div>
        </div>
      </section>
        
      {/* STATS */}
<section className="max-w-7xl mx-auto px-6 pb-20">

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-zinc-950 border border-yellow-500/10 rounded-[32px] p-8 text-center"
    >
      <h3 className="text-5xl font-black text-yellow-400 mb-3">
  <AnimatedNumber end={120} suffix="+" />
</h3>

      <p className="text-gray-400">
        Zrealizowanych remontów
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-zinc-950 border border-yellow-500/10 rounded-[32px] p-8 text-center"
    >
      <h3 className="text-5xl font-black text-yellow-400 mb-3">
        <AnimatedNumber end={10} suffix="+" />
      </h3>

      <p className="text-gray-400">
        Lat doświadczenia
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-zinc-950 border border-yellow-500/10 rounded-[32px] p-8 text-center"
    >
      <h3 className="text-5xl font-black text-yellow-400 mb-3">
        <AnimatedNumber end={100} suffix="%" />
      </h3>

      <p className="text-gray-400">
        Zadowolonych klientów
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-zinc-950 border border-yellow-500/10 rounded-[32px] p-8 text-center"
    >
      <h3 className="text-5xl font-black text-yellow-400 mb-3">
        Free
      </h3>

      <p className="text-gray-400">
        Darmowa wycena
      </p>
    </motion.div>

  </div>
</section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-6 hover:border-yellow-400 transition duration-300"
            >

              <CheckCircle className="text-yellow-400 mb-4" />

              <h3 className="text-xl font-bold">
                {item}
              </h3>

            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="uslugi"
        className="bg-zinc-950 py-24 border-y border-yellow-500/10"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <p className="text-yellow-400 uppercase tracking-[4px] mb-3">
              Oferta
            </p>

            <h2 className="text-4xl md:text-6xl font-black">
              Czym się zajmujemy?
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="bg-black border border-yellow-500/10 rounded-[32px] p-8 hover:border-yellow-400 hover:-translate-y-2 transition duration-300"
              >

                <div className="w-16 h-16 bg-yellow-500 text-black rounded-2xl flex items-center justify-center mb-6">
                  {icons[service.icon] || <CheckCircle size={32} />}
                </div>

                <h3 className="text-2xl font-black mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {service.text}
                </p>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
<section id="realizacje" className="max-w-7xl mx-auto px-6 py-24">
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
    <div>
      <p className="text-yellow-400 uppercase tracking-[4px] mb-3">
        Realizacje
      </p>

      <h2 className="text-4xl md:text-6xl font-black">
        Przykładowe wnętrza
      </h2>
    </div>

    <p className="text-gray-400 max-w-xl">
      Kliknij zdjęcie, aby zobaczyć je w powiększeniu.
    </p>
  </div>

  <PhotoProvider>
    <div className="grid md:grid-cols-3 gap-8">
      {realizations.map((item, index) => (
        <PhotoView key={item.title} src={item.image.asset.url}>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            src={item.image.asset.url}
            alt={item.title}
            className="rounded-[32px] h-[520px] w-full object-cover cursor-pointer shadow-2xl"
          />
        </PhotoView>
      ))}
    </div>
  </PhotoProvider>
</section>

{/* BEFORE AFTER */}
<section className="max-w-7xl mx-auto px-6 py-24">
  <div className="text-center mb-16">
    <p className="text-yellow-400 uppercase tracking-[4px] mb-3">
      Przed i po
    </p>

    <h2 className="text-4xl md:text-6xl font-black">
      Zobacz efekt naszej pracy
    </h2>
  </div>

  {beforeAfter.map((item, index) => (
    <div key={item.title} className="grid md:grid-cols-2 gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[40px] border border-yellow-500/10"
      >
        <span className="absolute top-6 left-6 z-10 bg-black/80 text-yellow-400 px-5 py-2 rounded-full font-bold">
          PRZED
        </span>

        <img
          src={item.beforeImage.asset.url}
          alt={`${item.title} przed`}
          className="w-full h-[520px] object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[40px] border border-yellow-500/10"
      >
        <span className="absolute top-6 left-6 z-10 bg-yellow-500 text-black px-5 py-2 rounded-full font-black">
          PO
        </span>

        <img
          src={item.afterImage.asset.url}
          alt={`${item.title} po`}
          className="w-full h-[520px] object-cover"
        />
      </motion.div>
    </div>
  ))}
</section>

      {/* CTA */}
      <section className="px-6 py-24">

        <div className="max-w-6xl mx-auto bg-yellow-500 text-black rounded-[40px] p-10 md:p-16 text-center">

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Planujesz remont?
          </h2>

          <p className="text-xl max-w-2xl mx-auto mb-10">
            Skontaktuj się z nami i otrzymaj bezpłatną wycenę prac.
          </p>

          <a
  href={`tel:${contact?.phone}`}
  className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-zinc-900 transition duration-300 hover:scale-105 active:scale-95"
>
  <Phone />
  {contact?.phone}
</a>

        </div>
      </section>


{/* REVIEWS */}
<section className="max-w-7xl mx-auto px-6 py-28">

  <div className="text-center mb-20">
    <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
      Opinie klientów
    </p>

    <h2 className="text-5xl md:text-7xl font-black leading-tight">
      Klienci o <span className="text-yellow-400">FENIX</span>
    </h2>
  </div>

  <div className="grid md:grid-cols-3 gap-10">

    {reviews.map((review, index) => (
      <motion.div
        key={review.name}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        viewport={{ once: true }}
        className="relative overflow-hidden flex flex-col bg-gradient-to-b from-zinc-900 to-black border border-yellow-500/20 rounded-[40px] p-10 min-h-[420px] hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(234,179,8,0.18)] transition duration-500"
      >

        {/* GOLD BAR */}
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />

        {/* QUOTE */}
        <div className="absolute top-6 right-8 text-yellow-500/10 text-9xl font-black leading-none">
          ”
        </div>

        {/* STARS */}
        <div className="flex gap-1 text-yellow-400 mb-8 text-3xl tracking-[6px]">
          ★★★★★
        </div>

        {/* TEXT */}
        <p className="text-gray-300 leading-relaxed mb-10 text-lg italic relative z-10">
          "{review.text}"
        </p>

        {/* AUTHOR */}
        <div className="border-t border-yellow-500/10 pt-6 mt-auto flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-xl shadow-lg">
            {review.name.charAt(0)}
          </div>

          <div>
            <p className="font-black text-lg">
              {review.name}
            </p>

            <p className="text-gray-500 text-sm">
              Klient FENIX
            </p>
          </div>

        </div>

      </motion.div>
    ))}

  </div>
</section>

{/* BLOG */}
<section id="blog" className="max-w-7xl mx-auto px-6 py-24">
  <div className="text-center mb-16">
    <p className="text-yellow-400 uppercase tracking-[4px] mb-3">
      Blog
    </p>

    <h2 className="text-4xl md:text-6xl font-black">
      Porady remontowe
    </h2>
  </div>

  <div className="grid md:grid-cols-3 gap-8">
    {blogs.map((post) => (
      <div
        key={post.title}
        className="bg-zinc-950 border border-yellow-500/10 rounded-[32px] overflow-hidden hover:border-yellow-400 transition duration-300"
      >
        <img
          src={post.image?.asset?.url}
          alt={post.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-8">
          <h3 className="text-2xl font-black mb-4">
            {post.title}
          </h3>

          <p className="text-gray-400 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* CONTACT */}
      <section
        id="kontakt"
        className="bg-zinc-950 py-24 border-t border-yellow-500/10"
      >

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          <div>

            <p className="text-yellow-400 uppercase tracking-[4px] mb-3">
              Kontakt
            </p>

            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Umów darmową wycenę
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Zadzwoń lub napisz. Odpowiemy możliwie szybko i ustalimy szczegóły remontu.
            </p>

            <div className="space-y-5">

              <div className="flex items-center gap-4 bg-black rounded-2xl p-5 border border-yellow-500/10">
                <Phone className="text-yellow-400" />
                <span>{contact?.phone}</span>
              </div>

              <div className="flex items-center gap-4 bg-black rounded-2xl p-5 border border-yellow-500/10">
                <Mail className="text-yellow-400" />
                <a href={`mailto:${contact?.email}`}>
  {contact?.email}
</a>
              </div>

              <div className="flex items-center gap-4 bg-black rounded-2xl p-5 border border-yellow-500/10">
                <MapPin className="text-yellow-400" />
                <span>{contact?.address}</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-3xl border border-yellow-500/10">
  <iframe
    title="Mapa FENIX Remonty i Wykończenia"
    src="https://www.google.com/maps?q=Bochnia%20ul.%20Trudna%2037a%2F32&output=embed"
    className="w-full h-[320px]"
    loading="lazy"
  ></iframe>
</div>

            </div>
          </div>

         <form
  onSubmit={handleSubmit}
  className="bg-black rounded-[32px] p-8 border border-yellow-500/10 space-y-5"
>

 <input
  name="name"
  value={formData.name}
  onChange={handleChange}
  className="w-full bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
  placeholder="Imię i nazwisko"
/>

  <input
  name="phone"
  value={formData.phone}
  onChange={handleChange}
    className="w-full bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
    placeholder="Numer telefonu"
  />

<input
  name="filesLink"
  value={formData.filesLink}
  onChange={handleChange}
  className="w-full bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
  placeholder="Link do zdjęć/projektu (opcjonalnie)"
/>

  <textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
    className="w-full bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
    rows="6"
    placeholder="Opisz zakres prac"
  />

  <button
    type="submit"
    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
  >
    <MessageCircle size={20} />
    Wyślij zapytanie
  </button>

</form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-10 border-t border-yellow-500/10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 justify-between items-center text-gray-500">

          <p>© 2026 FENIX Remonty i Wykończenia</p>

          <p>
            Bochnia • Remonty • Wykończenia wnętrz
          </p>

        </div>
      </footer>

      {/* WHATSAPP */}
      <a
  href="https://wa.me/48515839615?text=Dzień%20dobry,%20chciałbym%20umówić%20wycenę%20remontu."
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 bg-zinc-950 border border-yellow-500/20 hover:border-yellow-400 text-green-400 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition duration-300 hover:scale-110"
>
  <MessageCircle size={24} />
</a>

      <a
  href="https://facebook.com/fenixremonty"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-28 right-6 z-50 bg-zinc-950 border border-yellow-500/20 hover:border-yellow-400 text-yellow-400 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition duration-300 hover:scale-110"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className="w-5 h-5 fill-current"
  >
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 
    12.42-50.06 52.24-50.06H297V6.26S260.43 
    0 225.36 0c-73.22 0-121.08 44.38-121.08 
    124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
  </svg>
</a>

    </motion.div>
  );
}

export default App;