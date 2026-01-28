function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-900/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h2 className="text-xl font-bold text-white tracking-wide">
          Neel Gosavi
        </h2>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-zinc-300 font-medium">
          <li><a href="#home" className="hover:text-white transition">Home</a></li>
          <li><a href="#about" className="hover:text-white transition">About</a></li>
          <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
          <li><a href="#skills" className="hover:text-white transition">Skills</a></li>
          <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          <li>
            <a
              href="/Neel_Resume.pdf"
              download
              className="px-4 py-2 rounded-lg border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black transition"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
