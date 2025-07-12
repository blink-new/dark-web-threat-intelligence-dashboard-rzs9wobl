import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Activity, Clock, ExternalLink, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ThreatAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: Date;
  ioc: string[];
  tags: string[];
  status: 'new' | 'investigating' | 'confirmed' | 'resolved';
}

const generateThreatAlert = (): ThreatAlert => {
  const threats = [
    {
      title: 'Malicious Domain Detected',
      description: 'Suspicious domain hosting phishing content targeting financial institutions',
      source: 'DarkWeb Monitor',
      ioc: ['malicious-banking-site.onion', '192.168.1.100'],
      tags: ['phishing', 'banking', 'fraud']
    },
    {
      title: 'New Ransomware Variant',
      description: 'Previously unknown ransomware strain detected in underground forums',
      source: 'Threat Intelligence API',
      ioc: ['SHA256:a1b2c3...', 'payment-portal.tor'],
      tags: ['ransomware', 'malware', 'encryption']
    },
    {
      title: 'Data Breach Credentials',
      description: 'Fresh credential dumps from recent corporate breach being sold',
      source: 'Dark Marketplace',
      ioc: ['compromised-corp.leak', 'seller-id:darkuser123'],
      tags: ['data-breach', 'credentials', 'corporate']
    },
    {
      title: 'APT Group Activity',
      description: 'Known APT group discussing new attack vectors and targets',
      source: 'Forum Monitor',
      ioc: ['attack-forum.onion', 'command-server.tor'],
      tags: ['apt', 'advanced-threat', 'nation-state']
    }
  ];

  const threat = threats[Math.floor(Math.random() * threats.length)];
  const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
  const statuses: ('new' | 'investigating' | 'confirmed' | 'resolved')[] = ['new', 'investigating', 'confirmed'];

  return {
    id: Math.random().toString(36).substr(2, 9),
    ...threat,
    severity: severities[Math.floor(Math.random() * severities.length)],
    timestamp: new Date(Date.now() - Math.random() * 86400000), // Within last 24 hours
    status: statuses[Math.floor(Math.random() * statuses.length)]
  };
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
    case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
    default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-500/20 text-blue-400';
    case 'investigating': return 'bg-yellow-500/20 text-yellow-400';
    case 'confirmed': return 'bg-red-500/20 text-red-400';
    case 'resolved': return 'bg-green-500/20 text-green-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const ThreatFeed: React.FC = () => {
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<ThreatAlert | null>(null);

  useEffect(() => {
    // Initialize with some threats
    const initialThreats = Array.from({ length: 5 }, generateThreatAlert);
    setThreats(initialThreats);

    // Add new threats periodically
    const interval = setInterval(() => {
      setThreats(prev => {
        const newThreat = generateThreatAlert();
        const updated = [newThreat, ...prev].slice(0, 20); // Keep only latest 20
        return updated;
      });
    }, 15000); // New threat every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Feed */}
        <div className="lg:col-span-2">
          <Card className="dark-glass border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Live Threat Feed
                </div>
                <Badge className="bg-green-500/20 text-green-400 animate-pulse">
                  {threats.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {threats.map((threat) => (
                <div
                  key={threat.id}
                  className="p-4 rounded-lg glass-effect border border-gray-700/30 hover:border-blue-500/30 transition-all cursor-pointer group"
                  onClick={() => setSelectedThreat(threat)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                      {threat.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity}
                      </Badge>
                      <Badge className={getStatusColor(threat.status)}>
                        {threat.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{threat.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Source: {threat.source}</span>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(threat.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Threat Details */}
        <div>
          <Card className="dark-glass border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                Threat Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedThreat ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{selectedThreat.title}</h3>
                    <p className="text-gray-300 text-sm">{selectedThreat.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Severity</p>
                      <Badge className={getSeverityColor(selectedThreat.severity)}>
                        {selectedThreat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Status</p>
                      <Badge className={getStatusColor(selectedThreat.status)}>
                        {selectedThreat.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-2">Indicators of Compromise</p>
                    <div className="space-y-1">
                      {selectedThreat.ioc.map((indicator, index) => (
                        <div key={index} className="bg-gray-800/50 p-2 rounded text-xs font-mono text-gray-300">
                          {indicator}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedThreat.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-1">Source</p>
                    <p className="text-white text-sm">{selectedThreat.source}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-1">Detected</p>
                    <p className="text-white text-sm">{selectedThreat.timestamp.toLocaleString()}</p>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Investigate
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a threat from the feed to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThreatFeed;