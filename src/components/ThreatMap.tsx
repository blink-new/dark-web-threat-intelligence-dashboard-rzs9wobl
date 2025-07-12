import React, { useState, useEffect } from 'react';
import { Globe, AlertTriangle, Shield, Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ThreatLocation {
  id: string;
  country: string;
  city: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  threatCount: number;
  lat: number;
  lng: number;
  lastActivity: string;
}

const threatLocations: ThreatLocation[] = [
  { id: '1', country: 'Russia', city: 'Moscow', threatLevel: 'critical', threatCount: 45, lat: 55.7558, lng: 37.6176, lastActivity: '2 min ago' },
  { id: '2', country: 'China', city: 'Beijing', threatLevel: 'high', threatCount: 32, lat: 39.9042, lng: 116.4074, lastActivity: '5 min ago' },
  { id: '3', country: 'North Korea', city: 'Pyongyang', threatLevel: 'high', threatCount: 28, lat: 39.0392, lng: 125.7625, lastActivity: '8 min ago' },
  { id: '4', country: 'Iran', city: 'Tehran', threatLevel: 'medium', threatCount: 19, lat: 35.6892, lng: 51.3890, lastActivity: '12 min ago' },
  { id: '5', country: 'Brazil', city: 'São Paulo', threatLevel: 'medium', threatCount: 15, lat: -23.5505, lng: -46.6333, lastActivity: '15 min ago' },
  { id: '6', country: 'Nigeria', city: 'Lagos', threatLevel: 'low', threatCount: 8, lat: 6.5244, lng: 3.3792, lastActivity: '20 min ago' },
];

const getThreatColor = (level: string) => {
  switch (level) {
    case 'critical': return 'text-red-400 bg-red-500/20';
    case 'high': return 'text-orange-400 bg-orange-500/20';
    case 'medium': return 'text-yellow-400 bg-yellow-500/20';
    case 'low': return 'text-green-400 bg-green-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
};

const ThreatMap: React.FC = () => {
  const [activeThreats, setActiveThreats] = useState(threatLocations);
  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThreats(prev => prev.map(threat => ({
        ...threat,
        threatCount: threat.threatCount + Math.floor(Math.random() * 3),
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="dark-glass border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-400" />
            Global Threat Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* World Map Visualization */}
          <div className="relative bg-gradient-to-br from-gray-900 to-blue-900/30 rounded-lg h-96 mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-20" />
            
            {/* Threat Points */}
            {activeThreats.map((threat) => {
              const x = ((threat.lng + 180) / 360) * 100;
              const y = ((90 - threat.lat) / 180) * 100;
              
              return (
                <div
                  key={threat.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setSelectedThreat(threat)}
                >
                  <div className={`w-4 h-4 rounded-full ${getThreatColor(threat.threatLevel)} animate-pulse`}>
                    <div className={`absolute inset-0 rounded-full ${getThreatColor(threat.threatLevel)} animate-ping`} />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {threat.city}, {threat.country}
                      <br />
                      {threat.threatCount} threats
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Animated scanning lines */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/50 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/50 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* Threat Details */}
          {selectedThreat && (
            <Card className="dark-glass border-blue-500/30 mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{selectedThreat.city}, {selectedThreat.country}</h3>
                  <Badge className={getThreatColor(selectedThreat.threatLevel)}>
                    {selectedThreat.threatLevel.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Active Threats</p>
                    <p className="text-white font-semibold">{selectedThreat.threatCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Activity</p>
                    <p className="text-white">{selectedThreat.lastActivity}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Coordinates</p>
                    <p className="text-white font-mono text-xs">{selectedThreat.lat.toFixed(2)}, {selectedThreat.lng.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Threat Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{activeThreats.filter(t => t.threatLevel === 'critical').length}</div>
              <div className="text-sm text-gray-400">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{activeThreats.filter(t => t.threatLevel === 'high').length}</div>
              <div className="text-sm text-gray-400">High</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{activeThreats.filter(t => t.threatLevel === 'medium').length}</div>
              <div className="text-sm text-gray-400">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{activeThreats.filter(t => t.threatLevel === 'low').length}</div>
              <div className="text-sm text-gray-400">Low</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatMap;