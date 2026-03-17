import React from 'react';

const Settings = ({ settings, onSettingsChange, onClose, onExport, onImport }) => {
  const handleImportFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          onImport(data);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keyboard Layout
            </label>
            <select
              value={settings.keyboardLayout}
              onChange={(e) => onSettingsChange({ ...settings, keyboardLayout: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="qwerty">QWERTY</option>
              <option value="dvorak">Dvorak</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <select
              value={settings.fontSize}
              onChange={(e) => onSettingsChange({ ...settings, fontSize: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => onSettingsChange({ ...settings, soundEnabled: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Sound Effects</span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => onSettingsChange({ ...settings, highContrast: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">High Contrast Mode</span>
            </label>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Data Management</h3>
            <div className="space-y-2">
              <button
                onClick={onExport}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm"
              >
                Export Data (JSON)
              </button>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                  id="import-file"
                />
                <label
                  htmlFor="import-file"
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors cursor-pointer text-sm block text-center"
                >
                  Import Data (JSON)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;