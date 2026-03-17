import React from 'react';

const SessionHistory = ({ sessions, onClose, onExportCSV }) => {
  const exportToCSV = () => {
    const headers = ['Date', 'WPM', 'Accuracy', 'CPM', 'Time (s)', 'Errors', 'Avg Latency (ms)'];
    const csvContent = [
      headers.join(','),
      ...sessions.slice(0, 10).map(session => [
        new Date(session.timestamp).toLocaleDateString(),
        session.wpm,
        session.accuracy,
        session.cpm,
        Math.round(session.timeInSeconds),
        session.errors,
        session.averageLatency
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typing-sessions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Session History</h2>
          <div className="flex space-x-2">
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close history"
            >
              ✕
            </button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No sessions recorded yet. Start typing to see your progress!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3">Date</th>
                  <th className="text-left py-2 px-3">WPM</th>
                  <th className="text-left py-2 px-3">Accuracy</th>
                  <th className="text-left py-2 px-3">CPM</th>
                  <th className="text-left py-2 px-3">Time</th>
                  <th className="text-left py-2 px-3">Errors</th>
                  <th className="text-left py-2 px-3">Latency</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(0, 10).map((session, index) => (
                  <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3 font-semibold text-blue-600">{session.wpm}</td>
                    <td className="py-2 px-3 text-green-600">{session.accuracy}%</td>
                    <td className="py-2 px-3">{session.cpm}</td>
                    <td className="py-2 px-3">{Math.round(session.timeInSeconds)}s</td>
                    <td className="py-2 px-3 text-red-600">{session.errors}</td>
                    <td className="py-2 px-3">{session.averageLatency}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;