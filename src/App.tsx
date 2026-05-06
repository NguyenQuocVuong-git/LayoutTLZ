import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Settings, 
  LayoutDashboard, 
  MessageSquare, 
  Play, 
  Square, 
  Clock, 
  MousePointer2, 
  Send, 
  Monitor, 
  ShieldCheck, 
  Activity,
  Zap,
  ChevronRight,
  User,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type LogEntry = {
  id: string;
  time: string;
  module: 'CORE' | 'SCAN' | 'SYS';
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
};

// Custom Brand Logo Component (Static Robot Head for .ico use)
const BrandLogo = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`logo-glow ${className}`}
  >
    {/* Recognition Corners (Outer Frame) */}
    <path d="M10 30V10H30" stroke="#58a6ff" strokeWidth="3" strokeLinecap="round" />
    <path d="M70 10H90V30" stroke="#58a6ff" strokeWidth="3" strokeLinecap="round" />
    <path d="M10 70V90H30" stroke="#58a6ff" strokeWidth="3" strokeLinecap="round" />
    <path d="M70 90H90V70" stroke="#58a6ff" strokeWidth="3" strokeLinecap="round" />

    {/* Robot Main Head */}
    <rect x="25" y="30" width="50" height="45" rx="8" fill="#161b22" stroke="#58a6ff" strokeWidth="4" />
    
    {/* AI Visor / Eyes */}
    <rect x="32" y="42" width="36" height="12" rx="6" fill="#1f6feb" />
    <circle cx="41" cy="48" r="3" fill="#fff" />
    <circle cx="59" cy="48" r="3" fill="#fff" />
    
    {/* Antenna */}
    <path d="M50 30V18" stroke="#58a6ff" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="14" r="4" fill="#1f6feb" stroke="#58a6ff" strokeWidth="2" />
    
    {/* Mouth Detail */}
    <rect x="40" y="62" width="20" height="3" rx="1.5" fill="#30363d" />
  </svg>
);

export default function App() {
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Account & License State
  const [isLicensed, setIsLicensed] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [licenseType, setLicenseType] = useState('TRIAL');
  const [daysRemaining, setDaysRemaining] = useState(0);

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Form states
  const [activationSeconds, setActivationSeconds] = useState('5');
  const [delay, setDelay] = useState('30');
  const [clicks, setClicks] = useState('100');
  const [botToken, setBotToken] = useState('7391983011:AAFLp1m_xY...');
  const [chatId, setChatId] = useState('-51873111422');

  useEffect(() => {
    if (isRunning && isLicensed) {
      addLog('CORE', 'Initialization sequence completed. Target recognized.', 'info');
      const interval = setInterval(() => {
        const modules: LogEntry['module'][] = ['CORE', 'SCAN', 'SYS'];
        const types: LogEntry['type'][] = ['info', 'success', 'warn'];
        const randomMsg = [
          'Hooked into GameProcess.exe [PID: 12440]',
          'Anti-cheat detected packet sniffing attempt. Rerouting...',
          'Scanning pixels for RGB(255, 0, 44) at area [240, 110, 80, 80]',
          'Telegram connection timed out. Retrying in 3s...',
          'Executing click sequence: Stage 1/3 (Spam enabled)',
          'Pulse signal sent. Delay set to 30ms.',
          'Monitoring resource consumption: RAM 240MB | CPU 1.2%'
        ];
        
        addLog(
          modules[Math.floor(Math.random() * modules.length)],
          randomMsg[Math.floor(Math.random() * randomMsg.length)],
          types[Math.floor(Math.random() * 3)]
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRunning, isLicensed]);

  const addLog = (module: LogEntry['module'], message: string, type: LogEntry['type'] = 'info') => {
    const entry: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString(),
      module,
      message,
      type
    };
    setLogs(prev => [...prev.slice(-100), entry]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const toggleBot = () => {
    if (!isLicensed) {
      addLog('SYS', 'Access denied: Active license required.', 'error');
      setShowPricing(true);
      return;
    }
    if (!isRunning) {
      addLog('SYS', 'User requested Start command', 'success');
    } else {
      addLog('SYS', 'Service shutdown initiated', 'warn');
    }
    setIsRunning(!isRunning);
  };

  const [activeSubTask, setActiveSubTask] = useState('zombie');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    // For demo purposes, we start unlicensed
  };

  const purchasePlan = (days: number, type: string) => {
    setIsLicensed(true);
    setLicenseType(type);
    setDaysRemaining(days);
    setShowPricing(false);
    addLog('SYS', `License activated: ${type} (${days} days)`, 'success');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-bg-main flex items-center justify-center p-4 selection:bg-github-blue/30 selection:text-github-blue">
        <AnimatePresence mode="wait">
          {authView === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-[340px] space-y-6"
            >
              <div className="flex flex-col items-center gap-2 mb-8">
                <BrandLogo size={80} className="mb-2" />
                <h1 className="text-2xl font-black text-white italic tracking-tighter">LAST Z <span className="text-github-blue">AUTO</span></h1>
                <p className="text-xs text-github-text-muted font-mono uppercase tracking-widest">Đăng nhập hệ thống</p>
              </div>

              <form onSubmit={handleLogin} className="bg-bg-sidebar border border-border-github rounded-xl p-6 shadow-2xl space-y-4">
                <div className="space-y-1">
                  <label>Tên đăng nhập / Email</label>
                  <input 
                    type="text" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full" 
                    placeholder="Nhập tài khoản..."
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label>Mật khẩu</label>
                    <span 
                      onClick={() => setAuthView('forgot')}
                      className="text-[10px] text-github-blue cursor-pointer hover:underline"
                    >
                      Quên mật khẩu?
                    </span>
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full" 
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="w-full bg-github-green hover:bg-green-600 text-white font-bold py-2.5 rounded-md shadow-lg shadow-green-900/20 transition-all border border-transparent active:scale-[0.98] mt-2">
                  ĐĂNG NHẬP NGAY
                </button>
              </form>

              <div className="bg-bg-sidebar border border-border-github rounded-xl p-4 text-center">
                <p className="text-xs text-github-text-muted">
                  Chưa có tài khoản?{" "}
                  <span 
                    onClick={() => setAuthView('register')}
                    className="text-github-blue font-bold cursor-pointer hover:underline"
                  >
                    Đăng ký ngay
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {authView === 'register' && (
            <motion.div 
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-[340px] space-y-6"
            >
              <div className="flex flex-col items-center gap-2 mb-8">
                <h1 className="text-2xl font-black text-white italic tracking-tighter">LAST Z <span className="text-github-blue">REGISTER</span></h1>
                <p className="text-xs text-github-text-muted font-mono uppercase tracking-widest">Tạo tài khoản mới</p>
              </div>

              <form onSubmit={handleLogin} className="bg-bg-sidebar border border-border-github rounded-xl p-6 shadow-2xl space-y-4">
                <div className="space-y-1">
                  <label>Tên người dùng</label>
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full" 
                    placeholder="lastz_pro..."
                  />
                </div>
                <div className="space-y-1">
                  <label>Địa chỉ Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full" 
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label>Mật khẩu</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full" 
                    placeholder="Tối thiểu 8 ký tự"
                  />
                </div>
                <button type="submit" className="w-full bg-github-blue-mure hover:bg-blue-600 text-white font-bold py-2.5 rounded-md shadow-lg shadow-blue-900/20 transition-all border border-transparent active:scale-[0.98] mt-2">
                  TẠO TÀI KHOẢN
                </button>
              </form>

              <div className="text-center">
                <p className="text-xs text-github-text-muted">
                  Đã có tài khoản?{" "}
                  <span 
                    onClick={() => setAuthView('login')}
                    className="text-github-blue font-bold cursor-pointer hover:underline"
                  >
                    Quay lại Đăng nhập
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {authView === 'forgot' && (
            <motion.div 
              key="forgot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-[340px] space-y-6"
            >
              <div className="flex flex-col items-center gap-2 mb-8 text-center px-4">
                <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">Reset Password</h1>
                <p className="text-xs text-github-text-muted">Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('Email khôi phục đã được gửi!'); setAuthView('login'); }} className="bg-bg-sidebar border border-border-github rounded-xl p-6 shadow-2xl space-y-4">
                <div className="space-y-1">
                  <label>Địa chỉ Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full" 
                    placeholder="email@example.com"
                  />
                </div>
                <button type="submit" className="w-full bg-[#30363d] hover:bg-[#444c56] text-white font-bold py-2.5 rounded-md transition-all border border-border-github active:scale-[0.98] mt-2">
                  GỬI YÊU CẦU
                </button>
              </form>

              <div className="text-center">
                <span 
                  onClick={() => setAuthView('login')}
                  className="text-xs text-github-blue font-bold cursor-pointer hover:underline"
                >
                  Huỷ và quay lại
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-main font-sans select-none border-4 border-border-github">
      {/* Sidebar */}
      <aside className="w-[220px] bg-bg-sidebar border-r border-border-github flex flex-col shrink-0">
        <div className="p-6 border-b border-border-github flex flex-col items-center">
          <BrandLogo size={48} className="mb-2" />
          <div className="text-2xl font-black text-white tracking-tighter italic">LAST Z <span className="text-github-blue">AUTO</span></div>
          <div className="text-[10px] text-github-text-muted font-mono mt-1">VERSION 1.0.4 BUILD-72</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Bảng điều khiển" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label="Cấu hình hệ thống" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
          <NavItem 
            icon={<Zap size={18} />} 
            label="Nhiệm vụ" 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')} 
          />
          <NavItem 
            icon={<User size={18} />} 
            label="Tài khoản" 
            active={activeTab === 'account'} 
            onClick={() => setActiveTab('account')} 
          />
        </nav>

        <div className="p-4">
          <div className="bg-bg-main rounded-lg p-3 border border-border-github">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-github-text-muted mb-2">
              <span>Trạng thái</span>
              <span className={`${isLicensed ? 'text-github-green' : 'text-github-red'} animate-pulse italic`}>
                • {isLicensed ? 'Online' : 'Unlicensed'}
              </span>
            </div>
            <div className="text-xs text-github-text-main font-mono">
              Hết hạn: <span className={daysRemaining < 3 ? 'text-github-red' : 'text-github-green'}>{daysRemaining} ngày</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-bg-main overflow-hidden">
        {/* Header */}
        <header className="h-[80px] bg-bg-sidebar border-b border-border-github flex items-center justify-between px-8 shrink-0">
          <div className="flex gap-8">
            <div>
              <div className="text-[10px] text-github-text-muted uppercase font-bold tracking-widest">
                {activeTab === 'dashboard' ? 'Trạng thái' : 
                 activeTab === 'settings' ? 'Cấu hình' : 
                 activeTab === 'tasks' ? 'Nhiệm vụ (Tasks)' : 'Quản lý tài khoản'}
              </div>
              <div className="text-lg font-medium text-github-text-bright">
                {activeTab === 'dashboard' ? 'ZOMBIE WORLD ESCAPE' : 
                 activeTab === 'settings' ? 'HỆ THỐNG & ĐƯỜNG DẪN' : 
                 activeTab === 'tasks' ? 'QUẢN LÝ TIẾN TRÌNH' : 'THÔNG TIN BẢN QUYỀN'}
              </div>
            </div>
            <div className="w-[1px] h-10 bg-border-github"></div>
            <div>
              <div className="text-[10px] text-github-text-muted uppercase font-bold tracking-widest">Tiến trình</div>
              <div className={`text-lg font-mono ${isRunning ? 'text-github-green' : 'text-github-text-muted'}`}>
                {isRunning ? 'RUNNING_ACTIVE' : 'IDLE_STANDBY'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!isLicensed && (
              <button 
                onClick={() => setShowPricing(true)}
                className="px-4 py-2 bg-github-orange hover:bg-orange-600 text-black text-xs font-bold rounded flex items-center gap-2 transition-all active:scale-95"
              >
                <ShoppingBag size={14} /> MUA NGAY
              </button>
            )}
            {activeTab === 'settings' && isLicensed && (
              <button className="px-4 py-2 bg-github-blue-mure hover:bg-blue-600 text-white text-xs font-bold rounded flex items-center gap-2 transition-all active:scale-95">
                <Play size={14} fill="currentColor" /> MỞ GAME NHANH
              </button>
            )}
            <button 
              onClick={toggleBot}
              className={`px-6 py-2.5 font-bold rounded-md flex items-center gap-2 border border-transparent shadow-lg active:scale-95 transition-all
                ${isRunning 
                  ? 'bg-github-red hover:bg-red-600 text-white shadow-red-900/20' 
                  : (isLicensed ? 'bg-github-green hover:bg-green-600 text-white shadow-green-900/20' : 'bg-gray-700 text-gray-500 cursor-not-allowed')
                }`}
            >
              {isRunning ? <div className="w-3 h-3 bg-white rounded-sm"></div> : <Play size={16} fill="currentColor" />}
              {isRunning ? 'NGỪNG HOẠT ĐỘNG' : 'BẮT ĐẦU'}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-6 space-y-6"
              >
                {!isLicensed && (
                  <div className="p-4 bg-github-red/10 border border-github-red/20 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock size={18} className="text-github-red" />
                      <p className="text-sm font-medium text-github-text-bright">Bản quyền của bạn đã hết hạn. Vui lòng gia hạn để sử dụng đầy đủ tính năng.</p>
                    </div>
                    <button onClick={() => setShowPricing(true)} className="text-xs font-bold text-github-red hover:underline uppercase">Gia hạn ngay →</button>
                  </div>
                )}
                
                <div className={`grid grid-cols-2 gap-6 ${!isLicensed ? 'opacity-50 pointer-events-none' : ''}`}>
                  {/* Box 1: Spam Parameters */}
                  <section className="gh-card">
                    <div className="gh-panel-header">
                      <span className="text-xs font-bold text-github-text-muted uppercase tracking-wider flex items-center gap-2">
                        <Zap size={14} /> Thông số Spam (Cơ bản)
                      </span>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-github-text-muted normal-case font-normal mb-0">Giây kích hoạt (s)</label>
                        <input 
                          type="number" 
                          value={activationSeconds} 
                          onChange={(e) => setActivationSeconds(e.target.value)}
                          className="w-24 text-center text-github-blue font-mono"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-github-text-muted normal-case font-normal mb-0">Delay giữa các lần (ms)</label>
                        <input 
                          type="number" 
                          value={delay} 
                          onChange={(e) => setDelay(e.target.value)}
                          className="w-24 text-center text-github-blue font-mono"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-github-text-muted normal-case font-normal mb-0">Tổng số lần Click</label>
                        <input 
                          type="number" 
                          value={clicks} 
                          onChange={(e) => setClicks(e.target.value)}
                          className="w-24 text-center text-github-blue font-mono"
                        />
                      </div>
                      <div className="pt-2 flex gap-2">
                         <button className="flex-1 bg-bg-panel-header border border-border-github text-[10px] font-bold py-2 rounded hover:bg-border-github text-github-text-bright transition-colors uppercase">RE-CALIBRATE</button>
                         <button className="flex-1 bg-bg-panel-header border border-border-github text-[10px] font-bold py-2 rounded hover:bg-border-github text-github-text-bright transition-colors uppercase">TEST CYCLE</button>
                      </div>
                    </div>
                  </section>

                  {/* Box 2: Telegram & Notify */}
                  <section className="gh-card">
                    <div className="gh-panel-header">
                      <span className="text-xs font-bold text-github-text-muted uppercase tracking-wider flex items-center gap-2">
                        <MessageSquare size={14} /> Thông báo Telegram
                      </span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <label>Bot Token</label>
                        <input 
                          type="password" 
                          value={botToken} 
                          onChange={(e) => setBotToken(e.target.value)}
                          className="w-full text-github-text-main font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label>Chat ID</label>
                        <input 
                          type="text" 
                          value={chatId} 
                          onChange={(e) => setChatId(e.target.value)}
                          className="w-full text-github-text-main font-mono"
                        />
                      </div>
                      <div className="flex gap-4 pt-1">
                        <div className="flex-1 space-y-1">
                          <label>Màn hình Quét</label>
                          <select className="w-full">
                            <option>Display 02 (Primary)</option>
                            <option>Display 01 (Laptops)</option>
                          </select>
                        </div>
                        <div className="w-24 space-y-1">
                          <label>FPS Lock</label>
                          <select className="w-full text-center">
                            <option>30</option>
                            <option selected>60</option>
                            <option>120</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Terminal Logs (Inside Dashboard) */}
                <div className="h-64 gh-terminal min-h-0 flex flex-col">
                  <div className="px-4 py-1.5 border-b border-border-github bg-bg-sidebar flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-mono text-github-text-muted uppercase font-bold">System Runtime Logs</span>
                    <span 
                      onClick={() => setLogs([])}
                      className="text-[10px] font-mono text-github-red cursor-pointer hover:underline"
                    >
                      Xóa nhật ký
                    </span>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1 leading-relaxed bg-[#010409]">
                    {logs.length === 0 && (
                      <p className="text-github-text-muted italic opacity-50">System idle. Awaiting tactical deployment.</p>
                    )}
                    {logs.map((log) => (
                      <div key={log.id} className="flex gap-3 text-github-text-muted">
                        <span className="shrink-0 shrink-0">[{log.time}]</span> 
                        <span className={`shrink-0 w-12 font-bold ${
                          log.module === 'CORE' ? 'text-github-blue' : 
                          log.module === 'SCAN' ? 'text-github-orange' : 'text-github-text-muted'
                        }`}>
                          [{log.module}]
                        </span> 
                        <span className={`
                          ${log.type === 'info' ? 'text-github-text-main' : ''}
                          ${log.type === 'success' ? 'text-github-green' : ''}
                          ${log.type === 'warn' ? 'text-github-orange' : ''}
                          ${log.type === 'error' ? 'text-github-red' : ''}
                        `}>
                          {log.message}
                        </span>
                      </div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`p-6 max-w-4xl space-y-6 ${!isLicensed ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <section className="gh-card">
                  <div className="gh-panel-header">
                    <span className="text-xs font-bold text-github-text-bright uppercase tracking-wider flex items-center gap-2">
                      <Settings size={14} /> Đường dẫn & Khởi chạy Game
                    </span>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label>Đường dẫn thực thi Game (.exe)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="C:\Games\LastZ_World\Game.exe"
                          className="flex-1 font-mono text-xs"
                          defaultValue="D:\Games\ZombieWorld\Client\GameProcess.exe"
                        />
                        <button className="px-4 py-1.5 bg-bg-panel-header border border-border-github text-xs font-bold rounded hover:bg-border-github">
                          CHỌN FILE
                        </button>
                      </div>
                      <p className="text-[10px] text-github-text-muted mt-1 italic">Vui lòng chọn file .exe chính thức để tool có thể tự động mở game khi cần.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-border-github">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-github-text-bright uppercase">Tự động hóa</h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer normal-case font-normal text-github-text-main">
                            <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                            Tự động mở Game khi bật Tool
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer normal-case font-normal text-github-text-main">
                            <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                            Tự khởi động cùng Windows
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer normal-case font-normal text-github-text-main">
                            <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" />
                            Ẩn Tool xuống khay hệ thống khi đóng
                          </label>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-github-text-bright uppercase">Tối ưu hiệu năng</h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer normal-case font-normal text-github-text-main">
                            <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                            Ưu tiên CPU mức Cao (Real-time)
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer normal-case font-normal text-github-text-main">
                            <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" />
                            Sử dụng GPU Acceleration
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer normal-case font-normal text-github-text-main">
                            <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                            Chế độ Anti-Detect (Random Delay)
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3">
                      <button className="px-6 py-2 border border-border-github text-xs font-bold rounded hover:bg-bg-panel-header transition-colors">
                        MẶC ĐỊNH
                      </button>
                      <button className="px-8 py-2 bg-github-blue-mure text-white text-xs font-bold rounded hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20">
                        LƯU CẤU HÌNH
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'tasks' && (
              <motion.div 
                key="tasks"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`p-6 space-y-6 ${!isLicensed ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {/* Segmented Control */}
                <div className="flex bg-[#0d1117] border border-border-github p-1 rounded-lg w-fit">
                  {[
                    { id: 'zombie', label: 'Diệt Zombie', icon: <Zap size={14} /> },
                    { id: 'loot', label: 'Tự động Nhặt', icon: <Activity size={14} /> },
                    { id: 'raid', label: 'Săn Boss Raid', icon: <ShieldCheck size={14} /> }
                  ].map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setActiveSubTask(task.id)}
                      className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                        activeSubTask === task.id 
                        ? 'bg-bg-panel-header text-github-blue-mure border border-border-github shadow-sm' 
                        : 'text-github-text-muted hover:text-github-text-bright'
                      }`}
                    >
                      {task.icon}
                      {task.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Task Specific Settings */}
                  <section className="gh-card">
                    <div className="gh-panel-header">
                       <span className="text-xs font-bold text-github-text-bright uppercase tracking-wider">
                         Cấu hình: {activeSubTask === 'zombie' ? 'Diệt Zombie' : activeSubTask === 'loot' ? 'Tự động Nhặt' : 'Săn Boss Raid'}
                       </span>
                    </div>
                    <div className="p-6 space-y-4">
                       {activeSubTask === 'zombie' && (
                         <>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Ưu tiên quái (HP thấp)</label>
                              <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Phạm vi quét (Pixels)</label>
                              <input type="number" defaultValue="1200" className="w-24 text-center font-mono" />
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Tự động hồi máu (%)</label>
                              <input type="number" defaultValue="40" className="w-24 text-center font-mono" />
                           </div>
                         </>
                       )}
                       {activeSubTask === 'loot' && (
                         <>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Nhặt đồ huyền thoại</label>
                              <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Lọc rác / Đồ trắng</label>
                              <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Khoảng cách nhặt</label>
                              <input type="number" defaultValue="500" className="w-24 text-center font-mono" />
                           </div>
                         </>
                       )}
                       {activeSubTask === 'raid' && (
                         <>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Né kỹ năng Boss</label>
                              <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" defaultChecked />
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Combo Skill (S-A-D)</label>
                              <input type="text" defaultValue="Q-W-E-R" className="w-24 text-center font-mono" />
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="text-sm normal-case font-normal mb-0">Tự thoát khi chết</label>
                              <input type="checkbox" className="w-4 h-4 bg-bg-main border-border-github rounded" />
                           </div>
                         </>
                       )}
                       <button className="w-full mt-4 bg-github-blue-mure text-white text-xs font-bold py-2 rounded shadow-lg shadow-blue-900/20">
                         KÍCH HOẠT NHIỆM VỤ NÀY
                       </button>
                    </div>
                  </section>

                  {/* Task Help/Summary */}
                  <section className="gh-card border-dashed">
                    <div className="p-6 flex flex-col items-center justify-center h-full text-center space-y-3">
                       <ShieldCheck size={32} className="text-github-blue opacity-40" />
                       <h4 className="text-sm font-bold text-github-text-bright">Hưỡng dẫn vận hành</h4>
                       <p className="text-xs text-github-text-muted leading-relaxed">
                         Mỗi nhiệm vụ có một bộ nhớ riêng biệt. <br />
                         Khi "Kích hoạt", bot sẽ tự động chuyển đổi <br />
                         thuật toán xử lý Pixel tương ứng.
                       </p>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div 
                key="account"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-6 max-w-5xl space-y-8"
              >
                {/* User Stats Summary */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="gh-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-github-blue/10 flex items-center justify-center text-github-blue">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-github-text-muted">Tài khoản</p>
                      <h4 className="text-lg font-bold text-github-text-bright">vuong_pro_99</h4>
                    </div>
                  </div>
                  <div className="gh-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-github-green/10 flex items-center justify-center text-github-green">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-github-text-muted">Cấp bậc</p>
                      <h4 className={`text-lg font-bold ${isLicensed ? 'text-github-green' : 'text-github-text-muted'}`}>
                        {isLicensed ? licenseType : 'FREE USER'}
                      </h4>
                    </div>
                  </div>
                  <div className="gh-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-github-red/10 flex items-center justify-center text-github-red">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-github-text-muted">Thời hạn còn</p>
                      <h4 className="text-lg font-bold text-github-text-bright">{daysRemaining} ngày</h4>
                    </div>
                  </div>
                </div>

                {/* Account Details & Plan Info */}
                <div className="space-y-6">
                  <section className="gh-card">
                    <div className="gh-panel-header">
                      <span className="text-xs font-bold text-github-text-bright uppercase flex items-center gap-2">
                        <CreditCard size={14} /> Quản lý Bản quyền & Gia hạn
                      </span>
                      <button 
                        onClick={() => setShowPricing(true)}
                        className="text-[10px] font-bold text-github-blue hover:underline"
                      >
                        NÂNG CẤP GÓI →
                      </button>
                    </div>
                    <div className="p-8">
                       <div className="max-w-2xl mx-auto space-y-8 text-center">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-github-text-bright italic">LAST Z <span className="text-github-blue">PREMIUM</span></h3>
                            <p className="text-sm text-github-text-muted">Mở khoá toàn bộ sức mạnh AI nhận diện vật phẩm, tự động raid boss và hỗ trợ 24/7.</p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 pt-4">
                             {[
                               { label: 'QUÉT PIXEL AI', active: true },
                               { label: 'AUTO RAID BOSS', active: true },
                               { label: 'TELEGRAM NOTIFY', active: true },
                               { label: 'KHÔNG QUẢNG CÁO', active: true },
                               { label: 'MULTI-DISPLAY', active: isLicensed },
                               { label: 'ANTI-CHEAT BYPASS', active: isLicensed }
                             ].map((feature, i) => (
                               <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-github-text-main py-2 px-3 bg-bg-main rounded border border-border-github">
                                 {feature.active ? <CheckCircle2 size={12} className="text-github-green" /> : <Lock size={12} className="text-github-red" />}
                                 {feature.label}
                               </div>
                             ))}
                          </div>

                          <div className="pt-6">
                             <button onClick={() => setShowPricing(true)} className="px-12 py-3 bg-github-blue-mure hover:bg-blue-600 text-white font-bold rounded-lg shadow-xl shadow-blue-900/40 transition-all active:scale-95">
                               XEM BẢNG GIÁ CHI TIẾT
                             </button>
                          </div>
                       </div>
                    </div>
                  </section>

                  {/* Plan Info Table */}
                  <section className="gh-card">
                     <div className="gh-panel-header">
                        <span className="text-xs font-bold text-github-text-muted uppercase">Chi tiết quyền lợi các gói bản quyền</span>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                           <thead className="bg-bg-panel-header text-github-text-muted border-b border-border-github">
                              <tr>
                                 <th className="px-6 py-3 font-bold uppercase tracking-wider">Tính năng</th>
                                 <th className="px-6 py-3 font-bold uppercase tracking-wider text-center">TRIAL</th>
                                 <th className="px-6 py-3 font-bold uppercase tracking-wider text-center">ELITE</th>
                                 <th className="px-6 py-3 font-bold uppercase tracking-wider text-center">SUPREME</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-border-github">
                              {[
                                 { name: 'Thời gian sử dụng', trial: '3 Ngày', elite: '7 Ngày', supreme: '30 Ngày' },
                                 { name: 'Số máy sử dụng', trial: '1 PC', elite: '1 PC', supreme: '2 PC (Dùng chung)' },
                                 { name: 'Tốc độ Quét', trial: '30 FPS', elite: '60 FPS', supreme: '144 FPS' },
                                 { name: 'Auto Loot AI', trial: 'Có', elite: 'Có', supreme: 'Có' },
                                 { name: 'Raid Boss Support', trial: 'Không', elite: 'Có', supreme: 'Có' },
                                 { name: 'Hỗ trợ kỹ thuật', trial: 'Cơ bản', elite: 'Ưu tiên', supreme: '24/7 VIP' }
                              ].map((row, i) => (
                                 <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-github-text-bright">{row.name}</td>
                                    <td className="px-6 py-4 text-center text-github-text-muted">{row.trial}</td>
                                    <td className="px-6 py-4 text-center text-github-text-muted">{row.elite}</td>
                                    <td className="px-6 py-4 text-center text-github-blue font-bold">{row.supreme}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Bar Footer */}
        <footer className="h-8 bg-bg-panel-header border-t border-border-github px-4 flex items-center justify-between text-[10px] text-github-text-muted font-mono shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-github-green animate-pulse' : 'bg-gray-600'}`}></div> ENGINE: {isRunning ? 'ACTIVE' : 'IDLE'}</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-github-green"></div> GPU ACCEL: ON</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-github-blue"></div> DISP 2: {isLicensed ? 'OK' : 'LOCKED'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>UPTIME: 04:12:33</span>
            <span className="text-github-text-bright">LAST_SCAN: 0ms ago</span>
          </div>
        </footer>
      </main>

      {/* Pricing Modal Overlay */}
      <AnimatePresence>
        {showPricing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPricing(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-bg-sidebar border-4 border-border-github rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(31,111,235,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-border-github bg-bg-panel-header flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-white italic tracking-tighter">CHỌN GÓI BẢN QUYỀN</h2>
                  <p className="text-xs text-github-text-muted mt-1 uppercase tracking-widest font-bold">Nâng cấp để mở khoá toàn bộ tính năng Bots</p>
                </div>
                <button onClick={() => setShowPricing(false)} className="w-10 h-10 rounded-full border border-border-github flex items-center justify-center text-github-text-muted hover:text-white transition-colors">
                  <Square size={16} className="rotate-45" />
                </button>
              </div>

              <div className="p-8 grid grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="gh-card flex flex-col hover:border-github-blue-mure transition-all group">
                  <div className="p-6 border-b border-border-github bg-bg-main">
                    <h4 className="text-xs font-black text-github-text-muted uppercase mb-4">Gói Trải Nghiệm</h4>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-black text-white italic">30.000đ</span>
                      <span className="text-xs text-github-text-muted">/ 3 ngày</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> Đầy đủ tính năng Pro</li>
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> 1 Máy tính duy nhất</li>
                      <li className="flex items-center gap-2 text-xs text-github-text-muted line-through opacity-50"><AlertCircle size={12} /> Hỗ trợ Boss Raid</li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <button 
                      onClick={() => purchasePlan(3, 'TRIAL')}
                      className="w-full py-3 bg-[#30363d] hover:bg-[#444c56] text-white text-xs font-bold rounded-lg transition-all"
                    >
                      CHỌN GÓI
                    </button>
                  </div>
                </div>

                {/* Plan 2 - Featured */}
                <div className="gh-card border-github-blue shadow-[0_0_30px_rgba(88,166,255,0.1)] flex flex-col relative overflow-hidden">
                  <div className="absolute top-3 right-[-30px] bg-github-blue text-black text-[9px] font-black py-1 px-10 rotate-45 uppercase">Best Value</div>
                  <div className="p-6 border-b border-border-github bg-bg-main relative">
                    <h4 className="text-xs font-black text-github-blue uppercase mb-4">Game Thủ Elite</h4>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-black text-white italic">60.000đ</span>
                      <span className="text-xs text-github-text-muted">/ 7 ngày</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> Toàn bộ tính năng Pro</li>
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> Hiệu năng cao 60 FPS</li>
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> Hỗ trợ Boss Raid</li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <button 
                       onClick={() => purchasePlan(7, 'ELITE')}
                       className="w-full py-3 bg-github-blue-mure hover:bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-900/40 transition-all active:scale-95"
                    >
                      CHỌN GÓI
                    </button>
                  </div>
                </div>

                {/* Plan 3 */}
                <div className="gh-card flex flex-col hover:border-github-purple transition-all group">
                  <div className="p-6 border-b border-border-github bg-bg-main">
                    <h4 className="text-xs font-black text-github-text-muted uppercase mb-4">Master Supreme</h4>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-black text-white italic">180.000đ</span>
                      <span className="text-xs text-github-text-muted">/ 30 ngày</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> Toàn bộ tính năng</li>
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> Sử dụng cho 2 máy</li>
                      <li className="flex items-center gap-2 text-xs text-github-text-main"><CheckCircle2 size={12} className="text-github-green" /> Hỗ trợ 24/7 VIP</li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <button 
                      onClick={() => purchasePlan(30, 'SUPREME')}
                      className="w-full py-3 bg-[#30363d] hover:bg-[#444c56] text-white text-xs font-bold rounded-lg transition-all"
                    >
                      CHỌN GÓI
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-bg-main border-t border-border-github flex items-center justify-between text-[10px] text-github-text-muted font-bold px-12">
                 <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-github-green" /> HỆ THỐNG GIAO DỊCH TỰ ĐỘNG KHÔNG LỖI</span>
                 <span className="flex items-center gap-2 hover:text-github-blue cursor-pointer">LIÊN HỆ ADMIN ĐỂ NẠP TIỀN QUA ATM/MOMO <ExternalLink size={14} /></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      className={`nav-link ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

