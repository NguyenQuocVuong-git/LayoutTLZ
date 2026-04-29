import { useState, useEffect, useRef } from 'react';
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
  User
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
    if (isRunning) {
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
  }, [isRunning]);

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
    if (!isRunning) {
      addLog('SYS', 'User requested Start command', 'success');
    } else {
      addLog('SYS', 'Service shutdown initiated', 'warn');
    }
    setIsRunning(!isRunning);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
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
            label="Hiệu suất" 
            active={activeTab === 'performance'} 
            onClick={() => setActiveTab('performance')} 
          />
        </nav>

        <div className="p-4">
          <div className="bg-bg-main rounded-lg p-3 border border-border-github">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-github-text-muted mb-2">
              <span>Trạng thái</span>
              <span className="text-github-green animate-pulse italic">• Online</span>
            </div>
            <div className="text-xs text-github-text-main font-mono">Hết hạn: <span className="text-github-red">30 ngày</span></div>
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
                {activeTab === 'dashboard' ? 'Nhiệm vụ' : 
                 activeTab === 'settings' ? 'Cấu hình' : 'Hiệu năng'}
              </div>
              <div className="text-lg font-medium text-github-text-bright">
                {activeTab === 'dashboard' ? 'ZOMBIE WORLD ESCAPE' : 
                 activeTab === 'settings' ? 'HỆ THỐNG & ĐƯỜNG DẪN' : 'GIÁM SÁT TÀI NGUYÊN'}
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
            {activeTab === 'settings' && (
              <button className="px-4 py-2 bg-github-blue-mure hover:bg-blue-600 text-white text-xs font-bold rounded flex items-center gap-2 transition-all active:scale-95">
                <Play size={14} fill="currentColor" /> MỞ GAME NHANH
              </button>
            )}
            <button 
              onClick={toggleBot}
              className={`px-6 py-2.5 font-bold rounded-md flex items-center gap-2 border border-transparent shadow-lg active:scale-95 transition-all
                ${isRunning 
                  ? 'bg-github-red hover:bg-red-600 text-white shadow-red-900/20' 
                  : 'bg-github-green hover:bg-green-600 text-white shadow-green-900/20'
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
                <div className="grid grid-cols-2 gap-6">
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
                className="p-6 max-w-4xl space-y-6"
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

            {activeTab === 'performance' && (
              <motion.div 
                key="performance"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-6"
              >
                <div className="gh-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
                   <Activity size={48} className="text-github-text-muted opacity-20" />
                   <h3 className="text-lg font-bold text-github-text-muted">Tính năng đang phát triển</h3>
                   <p className="text-sm text-github-text-muted max-w-sm">Màn hình giám sát hiệu năng CPU/RAM và tốc độ quét Pixel thời gian thực sẽ được cập nhật trong phiên bản 1.0.5.</p>
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
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-github-blue"></div> DISP 2: OK</span>
          </div>
          <div className="flex items-center gap-4">
            <span>UPTIME: 04:12:33</span>
            <span className="text-github-text-bright">LAST_SCAN: 0ms ago</span>
          </div>
        </footer>
      </main>

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

