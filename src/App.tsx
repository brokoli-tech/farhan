import React, { useState } from 'react';
import {
  FileText,
  ArrowRight,
  CheckCircle2,
  Zap,
  Palette,
  Smartphone,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Download,
  ArrowLeft,
  Eye,
  Check,
  RotateCcw
} from 'lucide-react';

export type ScreenStep = 'beranda' | 'form' | 'template' | 'preview';

export interface CVData {
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  deskripsi: string;
  pendidikan: string;
  pengalaman: string;
  skill: string;
}

const DEFAULT_SAMPLE_DATA: CVData = {
  nama: 'Rizky Ramadhan',
  email: 'rizky.ramadhan@email.com',
  telepon: '+62 812-3456-7890',
  alamat: 'Jakarta Selatan, DKI Jakarta',
  deskripsi:
    'Web Developer yang berfokus pada pembangunan antarmuka web modern, responsif, dan ramah pengguna. Memiliki pengalaman 2+ tahun dalam ekosistem React, TypeScript, dan Tailwind CSS.',
  pendidikan:
    'S1 Sistem Informasi — Universitas Indonesia (2019 - 2023)\nIPK: 3.82 / 4.00 (Lulus Cumlaude)',
  pengalaman:
    'Junior Frontend Developer — PT Inovasi Solusi Digital (2023 - Sekarang)\n• Mengembangkan 10+ modul antarmuka web dengan React & Tailwind\n• Meningkatkan skor performa Lighthouse dari 72 ke 96\n• Berkolaborasi erat dengan tim UI/UX dan backend engineer',
  skill: 'React.js, TypeScript, Tailwind CSS, Next.js, Git & GitHub, UI/UX Design, REST API',
};

const INITIAL_EMPTY_DATA: CVData = {
  nama: '',
  email: '',
  telepon: '',
  alamat: '',
  deskripsi: '',
  pendidikan: '',
  pengalaman: '',
  skill: '',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('beranda');
  const [selectedTemplate, setSelectedTemplate] = useState<1 | 2 | 3>(1);
  const [cvData, setCvData] = useState<CVData>(INITIAL_EMPTY_DATA);
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);

  // Quick fill sample data
  const handleFillSample = () => {
    setCvData(DEFAULT_SAMPLE_DATA);
  };

  // Reset form
  const handleResetForm = () => {
    setCvData(INITIAL_EMPTY_DATA);
  };

  // Navigation handlers
  const goTo = (step: ScreenStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goTo('template');
  };

  const handlePrint = () => {
    window.print();
  };

  // Determine active stepper indices
  const stepList: { id: ScreenStep; label: string; number: number }[] = [
    { id: 'beranda', label: '1. Beranda', number: 1 },
    { id: 'form', label: '2. Data Diri', number: 2 },
    { id: 'template', label: '3. Template', number: 3 },
    { id: 'preview', label: '4. Preview', number: 4 },
  ];

  const currentStepIndex = stepList.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen text-slate-800 antialiased p-3 sm:p-6 lg:p-8 flex items-center justify-center relative overflow-x-hidden">
      {/* Decorative background glow elements */}
      <div className="fixed -bottom-24 -left-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="fixed top-10 -right-20 w-96 h-96 rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />
      <div className="fixed bottom-6 left-6 w-16 h-16 rounded-full bg-white/80 shadow-2xl backdrop-blur-md hidden md:block pointer-events-none no-print" />

      {/* Main App Container */}
      <div className="w-full max-w-6xl bg-[#f5f4fa] rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col min-h-[750px] relative z-10 print-area">
        {/* Top Header App Bar */}
        <header className="bg-[#5833ea] text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-indigo-400/30 no-print">
          {/* Logo */}
          <div
            onClick={() => goTo('beranda')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="Kembali ke Beranda"
          >
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-black text-xl shadow-inner group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">
                CVgua<span className="text-amber-300">Tu</span>
              </span>
              <span className="text-[10px] block text-indigo-200 tracking-wider font-medium uppercase -mt-1">
                CV MAKER
              </span>
            </div>
          </div>

          {/* Stepper / Breadcrumbs */}
          <nav aria-label="Alur pembuatan CV" className="hidden md:flex items-center gap-2 text-xs font-medium bg-indigo-900/40 px-4 py-1.5 rounded-full border border-white/10">
            {stepList.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isPast = idx < currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => goTo(step.id)}
                    className={`transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white font-bold'
                        : isPast
                        ? 'text-indigo-200 hover:text-white'
                        : 'text-indigo-300/60 hover:text-indigo-200'
                    }`}
                  >
                    {step.label}
                  </button>
                  {idx < stepList.length - 1 && (
                    <span className="text-indigo-300/60 select-none">›</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Top Right Badges */}
          <div className="flex items-center gap-3">
            <span className="text-xs bg-white/20 hover:bg-white/30 transition text-white px-3 py-1.5 rounded-lg font-medium hidden sm:inline-block">
              Gratis &amp; Cepat
            </span>
            <div
              className="w-8 h-8 rounded-full bg-amber-400 text-indigo-950 font-bold flex items-center justify-center text-xs shadow-md select-none"
              title="CV Maker Profile"
            >
              TU
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          {/* ================= SCREEN 1: BERANDA ================= */}
          {currentStep === 'beranda' && (
            <section className="w-full transition-opacity duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto py-4">
                {/* Left Hero Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 text-[#5833ea] text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#5833ea] animate-pulse" />
                    Generator CV Digital Modern
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Buat CV Profesional dengan{' '}
                    <span className="text-[#5833ea]">Mudah</span>
                  </h1>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Platform ramah pengguna untuk menyusun resume kerja impianmu dalam
                    hitungan menit. Tampilan rapi, layout estetik, dan siap diunduh
                    secara instan tanpa ribet.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <button
                      type="button"
                      onClick={() => goTo('form')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#5833ea] hover:bg-[#4825d1] active:scale-[0.98] transition shadow-lg shadow-indigo-300 text-white font-bold rounded-xl flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Mulai Buat CV</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Tanpa Akun &amp; 100% Gratis
                    </div>
                  </div>

                  {/* Feature Highlights Cards */}
                  <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm text-center">
                      <Zap className="w-5 h-5 mx-auto text-amber-500" />
                      <p className="text-xs font-bold text-slate-800 mt-1">Cepat &amp; Rapi</p>
                      <p className="text-[11px] text-slate-400">Isi data langsung jadi</p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm text-center">
                      <Palette className="w-5 h-5 mx-auto text-violet-500" />
                      <p className="text-xs font-bold text-slate-800 mt-1">Template Siap</p>
                      <p className="text-[11px] text-slate-400">Pilihan desain elegan</p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm text-center">
                      <Smartphone className="w-5 h-5 mx-auto text-sky-500" />
                      <p className="text-xs font-bold text-slate-800 mt-1">Responsif</p>
                      <p className="text-[11px] text-slate-400">Bisa di HP atau laptop</p>
                    </div>
                  </div>
                </div>

                {/* Right Mockup Visual */}
                <div className="lg:col-span-5 flex justify-center">
                  <div
                    onClick={() => goTo('preview')}
                    className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-xl border border-slate-100 relative group transform hover:-translate-y-1 transition duration-300 cursor-pointer"
                    title="Klik untuk melihat preview interaktif"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Eye className="w-3 h-3 text-[#5833ea]" />
                        Live Preview
                      </span>
                    </div>

                    {/* Mini CV visual mockup matching reference image */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#5833ea] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                          R
                        </div>
                        <div>
                          <div className="h-4 px-2 bg-slate-900 rounded font-bold text-[10px] text-white flex items-center">
                            Rizky Ramadhan
                          </div>
                          <div className="h-2.5 w-20 bg-violet-200 rounded mt-1.5" />
                        </div>
                      </div>

                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-4/5 bg-slate-200 rounded" />

                      <div className="pt-2 grid grid-cols-2 gap-2">
                        <div className="p-2 bg-white rounded border border-slate-100">
                          <div className="h-2 w-10 bg-indigo-300 rounded mb-1" />
                          <div className="h-1.5 w-full bg-slate-200 rounded" />
                        </div>
                        <div className="p-2 bg-white rounded border border-slate-100">
                          <div className="h-2 w-10 bg-indigo-300 rounded mb-1" />
                          <div className="h-1.5 w-full bg-slate-200 rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Contoh Format ATS</span>
                      <span className="text-xs text-[#5833ea] font-bold">1 Halaman Rapi</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================= SCREEN 2: DATA DIRI (FORM) ================= */}
          {currentStep === 'form' && (
            <section className="w-full max-w-4xl mx-auto transition-opacity duration-300">
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-100">
                {/* Header with Title and Quick Fill Helper */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Form Data CV</h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Lengkapi informasi di bawah ini untuk membuat CV profesionalmu.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFillSample}
                      className="text-xs text-[#5833ea] bg-violet-50 hover:bg-violet-100 py-1.5 px-3 rounded-lg border border-violet-200 font-semibold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Isi Contoh Data
                    </button>
                    {cvData.nama && (
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="text-xs text-slate-500 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 py-1.5 px-2.5 rounded-lg border border-slate-200 font-medium transition flex items-center gap-1 cursor-pointer"
                        title="Kosongkan formulir"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => goTo('beranda')}
                      className="text-xs text-slate-500 hover:text-slate-800 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Kembali
                    </button>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Section 1: Informasi Kontak */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] mb-3 flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      Informasi Kontak Pribadi
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inputNama" className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Lengkap *
                        </label>
                        <input
                          id="inputNama"
                          type="text"
                          required
                          value={cvData.nama}
                          onChange={(e) => setCvData({ ...cvData, nama: e.target.value })}
                          placeholder="Contoh: Rizky Ramadhan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="inputEmail" className="block text-xs font-semibold text-slate-700 mb-1">
                          Email *
                        </label>
                        <input
                          id="inputEmail"
                          type="email"
                          required
                          value={cvData.email}
                          onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                          placeholder="Contoh: rizky.ramadhan@email.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="inputTelepon" className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor Telepon *
                        </label>
                        <input
                          id="inputTelepon"
                          type="tel"
                          required
                          value={cvData.telepon}
                          onChange={(e) => setCvData({ ...cvData, telepon: e.target.value })}
                          placeholder="Contoh: +62 812-3456-7890"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="inputAlamat" className="block text-xs font-semibold text-slate-700 mb-1">
                          Alamat Domisili *
                        </label>
                        <input
                          id="inputAlamat"
                          type="text"
                          required
                          value={cvData.alamat}
                          onChange={(e) => setCvData({ ...cvData, alamat: e.target.value })}
                          placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Deskripsi Diri */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] mb-3 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      Deskripsi Diri / Ringkasan *
                    </h3>
                    <textarea
                      required
                      rows={3}
                      value={cvData.deskripsi}
                      onChange={(e) => setCvData({ ...cvData, deskripsi: e.target.value })}
                      placeholder="Tuliskan rangkuman singkat mengenai latar belakang, bidang keahlian, minat karir, dan keunggulan profesionalmu..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                    />
                  </div>

                  {/* Section 3: Riwayat Pendidikan & Pengalaman */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] mb-2 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        Pendidikan *
                      </h3>
                      <textarea
                        required
                        rows={3}
                        value={cvData.pendidikan}
                        onChange={(e) => setCvData({ ...cvData, pendidikan: e.target.value })}
                        placeholder="Contoh: S1 Sistem Informasi - Universitas Indonesia (2019 - 2023)&#10;IPK 3.82 / 4.00"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] mb-2 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        Pengalaman Kerja *
                      </h3>
                      <textarea
                        required
                        rows={3}
                        value={cvData.pengalaman}
                        onChange={(e) => setCvData({ ...cvData, pengalaman: e.target.value })}
                        placeholder="Contoh: Junior Web Developer - PT Inovasi Digital (2023 - Sekarang)&#10;Mengembangkan 5+ landing page klien dan mengoptimasi performa web."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                      />
                    </div>
                  </div>

                  {/* Section 4: Keahlian / Skill */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Keahlian / Skill * (Pisahkan dengan koma)
                    </h3>
                    <input
                      type="text"
                      required
                      value={cvData.skill}
                      onChange={(e) => setCvData({ ...cvData, skill: e.target.value })}
                      placeholder="Contoh: HTML5, CSS3, JavaScript, Tailwind CSS, React.js, Figma, Git & GitHub"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5833ea] focus:border-transparent text-sm bg-white"
                    />
                    {/* Live tags preview */}
                    {cvData.skill && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {cvData.skill
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean)
                          .map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md bg-violet-50 text-[#5833ea] text-xs font-medium border border-violet-100"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Action Navigation */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => goTo('beranda')}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-xs font-semibold cursor-pointer"
                    >
                      ← Beranda
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#5833ea] hover:bg-[#4825d1] transition text-white font-bold rounded-xl shadow-md text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <span>Lanjutkan ke Template</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* ================= SCREEN 3: PILIH TEMPLATE ================= */}
          {currentStep === 'template' && (
            <section className="w-full max-w-4xl mx-auto transition-opacity duration-300">
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-100">
                <div className="text-center max-w-md mx-auto mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Pilih Template CV</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Pilih desain yang paling cocok untuk melamar posisi impianmu.
                  </p>
                </div>

                {/* 3 Template Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Template 1: Classic Lavender */}
                  <div
                    onClick={() => setSelectedTemplate(1)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition relative flex flex-col justify-between select-none ${
                      selectedTemplate === 1
                        ? 'border-[#5833ea] bg-violet-50/50 shadow-md ring-2 ring-[#5833ea]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow'
                    }`}
                  >
                    {selectedTemplate === 1 && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#5833ea] text-white flex items-center justify-center text-xs font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm aspect-[3/4] flex flex-col justify-between overflow-hidden">
                      <div className="space-y-2">
                        <div className="w-full h-8 bg-[#5833ea] rounded-lg p-1.5 flex items-center gap-1.5 text-white">
                          <div className="w-5 h-5 rounded-full bg-white/30" />
                          <div className="h-2 w-16 bg-white/70 rounded" />
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded" />
                        <div className="h-1.5 w-4/5 bg-slate-200 rounded" />
                        <div className="h-2 w-12 bg-[#5833ea]/40 rounded mt-2" />
                        <div className="h-1.5 w-full bg-slate-100 rounded" />
                        <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex gap-1">
                        <span className="h-2 w-8 bg-slate-200 rounded-full" />
                        <span className="h-2 w-8 bg-slate-200 rounded-full" />
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <h4 className="font-bold text-slate-800 text-sm">Classic Lavender</h4>
                      <p className="text-[11px] text-slate-500">Elegan, rapi, modern</p>
                    </div>
                  </div>

                  {/* Template 2: Minimalist Clean Monokrom */}
                  <div
                    onClick={() => setSelectedTemplate(2)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition relative flex flex-col justify-between select-none ${
                      selectedTemplate === 2
                        ? 'border-[#5833ea] bg-violet-50/50 shadow-md ring-2 ring-[#5833ea]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow'
                    }`}
                  >
                    {selectedTemplate === 2 && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#5833ea] text-white flex items-center justify-center text-xs font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 shadow-sm aspect-[3/4] flex flex-col justify-between overflow-hidden">
                      <div className="space-y-2">
                        <div className="border-b border-slate-300 pb-2">
                          <div className="h-3 w-20 bg-slate-800 rounded" />
                          <div className="h-1.5 w-12 bg-slate-400 rounded mt-1" />
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded" />
                        <div className="h-1.5 w-5/6 bg-slate-200 rounded" />
                        <div className="h-2 w-14 bg-slate-700 rounded mt-2" />
                        <div className="h-1.5 w-full bg-slate-200 rounded" />
                      </div>
                      <div className="flex gap-1">
                        <span className="h-2 w-6 bg-slate-300 rounded" />
                        <span className="h-2 w-6 bg-slate-300 rounded" />
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <h4 className="font-bold text-slate-800 text-sm">Minimalis Monokrom</h4>
                      <p className="text-[11px] text-slate-500">Standar ATS, formal &amp; bersih</p>
                    </div>
                  </div>

                  {/* Template 3: Executive Split Two-Tone */}
                  <div
                    onClick={() => setSelectedTemplate(3)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition relative flex flex-col justify-between select-none ${
                      selectedTemplate === 3
                        ? 'border-[#5833ea] bg-violet-50/50 shadow-md ring-2 ring-[#5833ea]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow'
                    }`}
                  >
                    {selectedTemplate === 3 && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#5833ea] text-white flex items-center justify-center text-xs font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm aspect-[3/4] flex overflow-hidden">
                      <div className="w-1/3 bg-slate-800 p-2 space-y-1.5">
                        <div className="w-5 h-5 rounded-full bg-white/20 mx-auto mb-1" />
                        <div className="h-1 w-full bg-white/40 rounded" />
                        <div className="h-1 w-3/4 bg-white/40 rounded" />
                      </div>
                      <div className="w-2/3 p-2.5 space-y-1.5">
                        <div className="h-2 w-16 bg-slate-700 rounded" />
                        <div className="h-1 w-full bg-slate-200 rounded" />
                        <div className="h-1 w-4/5 bg-slate-200 rounded" />
                        <div className="h-1.5 w-10 bg-slate-400 rounded mt-2" />
                        <div className="h-1 w-full bg-slate-200 rounded" />
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <h4 className="font-bold text-slate-800 text-sm">Modern Two-Tone</h4>
                      <p className="text-[11px] text-slate-500">Sidebar elegan, kreatif</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => goTo('form')}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-xs font-semibold cursor-pointer"
                  >
                    ← Ubah Data
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo('preview')}
                    className="px-8 py-3 bg-[#5833ea] hover:bg-[#4825d1] transition text-white font-bold rounded-xl shadow-md text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Lihat Preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ================= SCREEN 4: PREVIEW CV ================= */}
          {currentStep === 'preview' && (
            <section className="w-full max-w-4xl mx-auto transition-opacity duration-300">
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-100">
                {/* Top bar with actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6 no-print">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-700">
                      Preview Siap
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      CV Kamu Siap Digunakan!
                    </h2>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => goTo('template')}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-xs font-semibold cursor-pointer"
                    >
                      Ganti Template
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Unduh PDF
                    </button>
                  </div>
                </div>

                {/* Rendered CV Document Sheet */}
                <div className="p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto transition-all print-area">
                  {/* Template 1: Classic Lavender */}
                  {selectedTemplate === 1 && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="border-b border-violet-100 pb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            {cvData.nama || 'Nama Lengkap Anda'}
                          </h1>
                          <p className="text-xs font-bold text-[#5833ea] uppercase tracking-wider mt-0.5">
                            Profesional Resume
                          </p>
                        </div>
                        <div className="text-xs text-slate-500 space-y-1 text-left sm:text-right">
                          <div className="flex items-center sm:justify-end gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#5833ea]" />
                            <span>{cvData.email || 'email@contoh.com'}</span>
                          </div>
                          <div className="flex items-center sm:justify-end gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#5833ea]" />
                            <span>{cvData.telepon || '+62 812-xxxx-xxxx'}</span>
                          </div>
                          <div className="flex items-center sm:justify-end gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#5833ea]" />
                            <span>{cvData.alamat || 'Kota, Provinsi'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Ringkasan Diri */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] border-b border-violet-100 pb-1 mb-2">
                          Deskripsi Diri
                        </h3>
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            cvData.deskripsi ? 'text-slate-600' : 'text-slate-400 italic'
                          }`}
                        >
                          {cvData.deskripsi ||
                            'Ringkasan profil profesional dan keunggulan diri Anda akan ditampilkan di sini.'}
                        </p>
                      </div>

                      {/* Pengalaman Kerja */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] border-b border-violet-100 pb-1 mb-2">
                          Pengalaman Kerja
                        </h3>
                        <div
                          className={`text-xs sm:text-sm whitespace-pre-line leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 ${
                            cvData.pengalaman ? 'text-slate-700' : 'text-slate-400 italic'
                          }`}
                        >
                          {cvData.pengalaman ||
                            'Informasi riwayat pengalaman kerja Anda akan ditampilkan di sini.'}
                        </div>
                      </div>

                      {/* Pendidikan */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] border-b border-violet-100 pb-1 mb-2">
                          Pendidikan
                        </h3>
                        <div
                          className={`text-xs sm:text-sm whitespace-pre-line leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 ${
                            cvData.pendidikan ? 'text-slate-700' : 'text-slate-400 italic'
                          }`}
                        >
                          {cvData.pendidikan ||
                            'Informasi riwayat pendidikan atau latar belakang studi Anda akan ditampilkan di sini.'}
                        </div>
                      </div>

                      {/* Keahlian */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5833ea] border-b border-violet-100 pb-1 mb-2">
                          Keahlian &amp; Kemampuan
                        </h3>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {cvData.skill ? (
                            cvData.skill
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-violet-100 text-[#5833ea] rounded-lg text-xs font-semibold border border-violet-200"
                                >
                                  {skill}
                                </span>
                              ))
                          ) : (
                            ['Keahlian 1', 'Keahlian 2', 'Keahlian 3'].map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-medium border border-slate-200 italic"
                              >
                                {skill}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Template 2: Minimalis Monokrom */}
                  {selectedTemplate === 2 && (
                    <div className="space-y-6 text-slate-800">
                      {/* Header */}
                      <div className="border-b-2 border-slate-900 pb-4">
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-slate-950">
                          {cvData.nama || 'Nama Lengkap Anda'}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                          <span>{cvData.email || 'email@contoh.com'}</span>
                          <span>•</span>
                          <span>{cvData.telepon || '+62 812-xxxx-xxxx'}</span>
                          <span>•</span>
                          <span>{cvData.alamat || 'Kota, Provinsi'}</span>
                        </div>
                      </div>

                      {/* Ringkasan Diri */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                          Profil Profesional
                        </h3>
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            cvData.deskripsi ? 'text-slate-700' : 'text-slate-400 italic'
                          }`}
                        >
                          {cvData.deskripsi ||
                            'Ringkasan profil profesional dan keunggulan diri Anda akan ditampilkan di sini.'}
                        </p>
                      </div>

                      {/* Pengalaman Kerja */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                          Pengalaman Kerja
                        </h3>
                        <div
                          className={`text-xs sm:text-sm whitespace-pre-line leading-relaxed ${
                            cvData.pengalaman ? 'text-slate-800' : 'text-slate-400 italic'
                          }`}
                        >
                          {cvData.pengalaman ||
                            'Informasi riwayat pengalaman kerja Anda akan ditampilkan di sini.'}
                        </div>
                      </div>

                      {/* Pendidikan */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                          Pendidikan
                        </h3>
                        <div
                          className={`text-xs sm:text-sm whitespace-pre-line leading-relaxed ${
                            cvData.pendidikan ? 'text-slate-800' : 'text-slate-400 italic'
                          }`}
                        >
                          {cvData.pendidikan ||
                            'Informasi riwayat pendidikan atau latar belakang studi Anda akan ditampilkan di sini.'}
                        </div>
                      </div>

                      {/* Keahlian */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                          Keahlian &amp; Kompetensi
                        </h3>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cvData.skill ? (
                            cvData.skill
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded text-xs font-medium border border-slate-200"
                                >
                                  {skill}
                                </span>
                              ))
                          ) : (
                            ['Kompetensi 1', 'Kompetensi 2', 'Kompetensi 3'].map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-slate-50 text-slate-400 rounded text-xs italic border border-slate-200"
                              >
                                {skill}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Template 3: Modern Two-Tone */}
                  {selectedTemplate === 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-12 rounded-xl overflow-hidden border border-slate-200 bg-white">
                      {/* Left Sidebar */}
                      <div className="sm:col-span-4 bg-slate-900 text-slate-100 p-5 space-y-5">
                        <div className="w-14 h-14 rounded-full bg-[#5833ea] text-white flex items-center justify-center font-bold text-xl shadow-md">
                          {cvData.nama ? cvData.nama.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-violet-300 mb-2">
                            Kontak
                          </h4>
                          <div className="space-y-2 text-[11px] text-slate-300">
                            <p className="break-words">{cvData.email || 'email@contoh.com'}</p>
                            <p>{cvData.telepon || '+62 812-xxxx-xxxx'}</p>
                            <p>{cvData.alamat || 'Kota, Provinsi'}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-violet-300 mb-2">
                            Keahlian
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {cvData.skill ? (
                              cvData.skill
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean)
                                .map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-slate-800 text-violet-200 rounded text-[10px] font-medium border border-slate-700"
                                  >
                                    {skill}
                                  </span>
                                ))
                            ) : (
                              ['Skill 1', 'Skill 2'].map((s, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-slate-800 text-slate-500 rounded text-[10px] italic"
                                >
                                  {s}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Main Column */}
                      <div className="sm:col-span-8 p-5 sm:p-6 space-y-5 bg-white">
                        <div>
                          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                            {cvData.nama || 'Nama Lengkap Anda'}
                          </h1>
                          <p className="text-xs font-semibold text-[#5833ea] mt-0.5">
                            Profesional Candidate
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
                            Tentang Saya
                          </h4>
                          <p
                            className={`text-xs leading-relaxed ${
                              cvData.deskripsi ? 'text-slate-600' : 'text-slate-400 italic'
                            }`}
                          >
                            {cvData.deskripsi ||
                              'Ringkasan profil profesional dan keunggulan diri Anda akan ditampilkan di sini.'}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
                            Pengalaman Kerja
                          </h4>
                          <div
                            className={`text-xs whitespace-pre-line leading-relaxed ${
                              cvData.pengalaman ? 'text-slate-700' : 'text-slate-400 italic'
                            }`}
                          >
                            {cvData.pengalaman ||
                              'Informasi riwayat pengalaman kerja Anda akan ditampilkan di sini.'}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
                            Pendidikan
                          </h4>
                          <div
                            className={`text-xs whitespace-pre-line leading-relaxed ${
                              cvData.pendidikan ? 'text-slate-700' : 'text-slate-400 italic'
                            }`}
                          >
                            {cvData.pendidikan ||
                              'Informasi riwayat pendidikan atau latar belakang studi Anda akan ditampilkan di sini.'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Finish Action */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between no-print">
                  <button
                    type="button"
                    onClick={() => goTo('form')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    ← Edit Informasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFinishModal(true)}
                    className="px-8 py-3 bg-[#5833ea] hover:bg-[#4825d1] transition text-white font-bold rounded-xl shadow-md text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Selesai</span>
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ================= SUCCESS MODAL ================= */}
          {showFinishModal && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 transition animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-4 font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">CV Berhasil Diselesaikan!</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  Terima kasih telah menggunakan <strong>CVguaTu</strong>. CV Anda siap untuk
                  melamar pekerjaan impian!
                </p>
                <div className="mt-6 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFinishModal(false);
                      goTo('beranda');
                    }}
                    className="w-full py-3 bg-[#5833ea] hover:bg-[#4825d1] text-white font-bold rounded-xl text-sm transition cursor-pointer"
                  >
                    Kembali ke Beranda
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFinishModal(false)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
                  >
                    Tetap di Halaman Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 px-6 py-3.5 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#5833ea]">CVguaTu</span>
            <span>— Platform Pembuat CV Digital Sederhana &amp; Cepat</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Desain Responsif (Desktop, Tablet, Mobile)</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
