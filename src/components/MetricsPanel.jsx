import React from 'react';

const MetricsPanel = ({ wpm, accuracy, cpm, streak, latencies, isDarkMode = false }) => {
  const averageLatency = latencies.length > 0 
    ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
    : 0;

  const renderMiniChart = () => {
    if (latencies.length < 2) return null;
    
    const maxLatency = Math.max(...latencies);
    const minLatency = Math.min(...latencies);
    const range = maxLatency - minLatency || 1;
    
    return (
      <div className="mt-2">
        <div className={`text-xs mb-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Reaction Time</div>
        <div className="flex items-end space-x-0.5 h-8">
          {latencies.slice(-20).map((latency, index) => {
            const height = ((latency - minLatency) / range) * 100;
            const color = latency > 300 ? 'bg-red-400' : latency > 200 ? 'bg-yellow-400' : 'bg-green-400';
            return (
              <div
                key={index}
                className={`w-1 ${color} rounded-t`}
                style={{ height: `${Math.max(height, 10)}%` }}
                title={`${latency}ms`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-lg border p-4 space-y-4 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`font-semibold ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>Live Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{wpm}</div>
          <div className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>WPM</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
          <div className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Accuracy</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">{cpm}</div>
          <div className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>CPM</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-orange-600">{streak}</div>
          <div className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Streak</div>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-center">
          <div className={`text-lg font-semibold ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>{averageLatency}ms</div>
          <div className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Avg Latency</div>
        </div>
        {renderMiniChart()}
      </div>

      <div className={`border-t pt-3 ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className={`text-xs mb-2 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Progress Ring</div>
        <div className="relative w-16 h-16 mx-auto">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className={isDarkMode ? 'text-gray-600' : 'text-gray-200'}
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - accuracy / 100)}`}
              className="text-blue-500 transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;