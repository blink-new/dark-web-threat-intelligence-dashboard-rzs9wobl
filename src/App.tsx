import { useState, useEffect } from 'react';
import { Server, Settings, BarChart3, Users, Wrench, Activity, Shield, Terminal, Search, AlertTriangle, Zap, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Progress } from './components/ui/progress';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  count?: number;
  status?: 'active' | 'warning' | 'error';
};

const menuItems: MenuItem[] = [
  { id: 'servers', label: 'Servers', icon: Server, count: 12, status: 'active' },
  { id: 'configs', label: 'Configs', icon: Wrench, count: 8, status: 'warning' },
  { id: 'settings', label: 'Settings', icon: Settings, count: 5 },
  { id: 'statics', label: 'Statistics', icon: BarChart3, count: 24, status: 'active' },
  { id: 'users', label: 'Users', icon: Users, count: 1247, status: 'active' },
];

const statsCards = [
  { title: 'Active Servers', value: '12', change: '+2', status: 'up', icon: Server },
  { title: 'Threat Detections', value: '847', change: '+156', status: 'up', icon: Shield },
  { title: 'System Health', value: '98.2%', change: '+0.3%', status: 'up', icon: Activity },
  { title: 'Active Sessions', value: '1,247', change: '+89', status: 'up', icon: Terminal },
];

// Real-time threat data for enhanced effects
const threatLevels = [
  { level: 'Critical', count: 3, color: 'text-red-400', bgColor: 'bg-red-500/20', icon: AlertTriangle },
  { level: 'High', count: 12, color: 'text-orange-400', bgColor: 'bg-orange-500/20', icon: Zap },
  { level: 'Medium', count: 28, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', icon: Globe },
  { level: 'Low', count: 45, color: 'text-green-400', bgColor: 'bg-green-500/20', icon: Lock },
];

function App() {
  const [activeMenu, setActiveMenu] = useState('servers');
  const [liveStats, setLiveStats] = useState({
    threats: 847,
    blocked: 89,
    processed: 2.3
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        threats: prev.threats + Math.floor(Math.random() * 3),
        blocked: prev.blocked + Math.floor(Math.random() * 2),
        processed: +(prev.processed + Math.random() * 0.1).toFixed(1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeMenu) {
      case 'servers':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Server Management</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-200">
                <Server className="w-4 h-4 mr-2" />
                Add Server
              </Button>
            </div>
            
            {/* Enhanced stats cards with animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => (
                <Card key={index} className="dark-glass border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 group hover:ambient-glow hover:scale-105">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors animate-pulse" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-green-400 flex items-center">
                      ↗ {stat.change} from last hour
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced server status with progress bars */}
            <Card className="dark-glass border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Server Status</CardTitle>
                <CardDescription className="text-gray-400">Monitor your infrastructure in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'TI-SERVER-01', ip: '192.168.1.100', status: 'online', cpu: 23, memory: 45 },
                    { name: 'TI-SERVER-02', ip: '192.168.1.101', status: 'online', cpu: 67, memory: 78 },
                    { name: 'TI-SERVER-03', ip: '192.168.1.102', status: 'warning', cpu: 89, memory: 92 },
                    { name: 'TI-SERVER-04', ip: '192.168.1.103', status: 'offline', cpu: 0, memory: 0 },
                  ].map((server, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg glass-effect border border-gray-700/30 hover:border-blue-500/30 transition-all group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          server.status === 'online' ? 'bg-green-400 shadow-lg shadow-green-400/50' : 
                          server.status === 'warning' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 
                          'bg-red-400 shadow-lg shadow-red-400/50'
                        }`} />
                        <div>
                          <p className="font-medium text-white">{server.name}</p>
                          <p className="text-sm text-gray-400">{server.ip}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="space-y-2 min-w-[120px]">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">CPU</span>
                            <span className="text-xs text-gray-300">{server.cpu}%</span>
                          </div>
                          <Progress value={server.cpu} className="h-1" />
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">Memory</span>
                            <span className="text-xs text-gray-300">{server.memory}%</span>
                          </div>
                          <Progress value={server.memory} className="h-1" />
                        </div>
                        <Badge variant={server.status === 'online' ? 'default' : server.status === 'warning' ? 'secondary' : 'destructive'}>
                          {server.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'configs':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white">Configuration Management</h2>
            <Card className="dark-glass border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">System Configurations</CardTitle>
                <CardDescription className="text-gray-400">Manage system settings and parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Threat Detection Rules', value: 'Active', status: 'active' },
                    { name: 'Data Retention Policy', value: '90 days', status: 'active' },
                    { name: 'Backup Schedule', value: 'Daily at 2:00 AM', status: 'warning' },
                    { name: 'API Rate Limiting', value: '1000 req/min', status: 'active' },
                  ].map((config, index) => (
                    <div key={index} className="p-4 rounded-lg glass-effect border border-gray-700/30 hover:border-blue-500/30 transition-all group">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">{config.name}</h3>
                        <Badge variant={config.status === 'active' ? 'default' : 'secondary'}>
                          {config.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mt-1">{config.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white">System Settings</h2>
            <Card className="dark-glass border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">System Name</label>
                  <Input className="bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 transition-colors" defaultValue="Dark Web Threat Intelligence" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Admin Email</label>
                  <Input className="bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 transition-colors" defaultValue="admin@dwti.security" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Alert Threshold</label>
                  <Input className="bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 transition-colors" defaultValue="High" />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'statics':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white">Threat Intelligence Statistics</h2>
            
            {/* Live threat level indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {threatLevels.map((threat, index) => (
                <Card key={index} className={`dark-glass border-gray-700/50 ${threat.bgColor} hover:scale-105 transition-all duration-300`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${threat.color}`}>{threat.level} Threats</p>
                        <p className={`text-2xl font-bold ${threat.color}`}>{threat.count}</p>
                      </div>
                      <threat.icon className={`w-8 h-8 ${threat.color} animate-pulse`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced stats with live updates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="dark-glass border-gray-700/50 ambient-glow hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-blue-400">Today's Detections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white animate-pulse">{liveStats.threats}</div>
                  <p className="text-green-400">+23% from yesterday</p>
                </CardContent>
              </Card>
              <Card className="dark-glass border-gray-700/50 ambient-glow hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-purple-400">Blocked Threats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white animate-pulse">{liveStats.blocked}</div>
                  <p className="text-green-400">+12% from yesterday</p>
                </CardContent>
              </Card>
              <Card className="dark-glass border-gray-700/50 ambient-glow hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-400">Data Processed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white animate-pulse">{liveStats.processed}TB</div>
                  <p className="text-blue-400">Processed today</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">User Management</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-200">
                <Users className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
            <Card className="dark-glass border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Active Users</CardTitle>
                <CardDescription className="text-gray-400">Manage system users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'John Smith', email: 'john@dwti.security', role: 'Admin', status: 'online' },
                    { name: 'Sarah Connor', email: 'sarah@dwti.security', role: 'Analyst', status: 'online' },
                    { name: 'Mike Johnson', email: 'mike@dwti.security', role: 'Operator', status: 'offline' },
                    { name: 'Emma Davis', email: 'emma@dwti.security', role: 'Analyst', status: 'away' },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg glass-effect border border-gray-700/30 hover:border-blue-500/30 transition-all group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          user.status === 'online' ? 'bg-green-400 shadow-lg shadow-green-400/50' : 
                          user.status === 'away' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 
                          'bg-gray-400'
                        }`} />
                        <div>
                          <p className="font-medium text-white group-hover:text-blue-300 transition-colors">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">{user.role}</Badge>
                        <Badge variant={user.status === 'online' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-64 min-h-screen dark-glass border-r border-gray-700/50 cyber-border">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">DWTI</h1>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 transition-colors"
              />
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400 ambient-glow scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50 border border-transparent hover:scale-105'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400 animate-pulse' : 'text-gray-400 group-hover:text-white'}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.count && (
                      <Badge 
                        variant={isActive ? 'default' : 'secondary'} 
                        className={`text-xs ${isActive ? 'bg-blue-500/20 text-blue-400 animate-pulse' : 'bg-gray-700 text-gray-300'}`}
                      >
                        {item.count}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Dark Web Threat Intelligence</h1>
                  <p className="text-gray-400">Comprehensive threat monitoring and analysis platform</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-500/30 animate-pulse">
                    System Online
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">Last Update</p>
                    <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;