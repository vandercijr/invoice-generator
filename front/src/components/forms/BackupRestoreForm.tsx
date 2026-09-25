import { useRef, useState } from "react";
import { exportAllData, importAllData } from "@utils/db";

interface Props {
  onImported: () => void;
}

const BackupRestoreForm = ({ onImported }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    const backup = await exportAllData();
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-generator-backup-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setStatus(null);
    try {
      const backup = JSON.parse(await file.text());
      await importAllData(backup);
      setStatus("Data restored successfully.");
      onImported();
    } catch (err) {
      setError(
        "Failed to restore backup. Make sure the file is a valid backup export."
      );
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-1">Backup your data</h3>
        <p className="text-sm text-gray-500 mb-2">
          Download all your saved settings and invoice data as a JSON file.
          This data lives only in your browser's storage and is permanently
          lost if your browser cache/site data is cleared — keep a copy
          somewhere safe. The file includes your SMTP and Harvest API
          credentials in plain text, so store it securely.
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
        >
          Download backup
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Restore from backup</h3>
        <p className="text-sm text-gray-500 mb-2">
          Restoring will overwrite your currently saved data with the
          contents of the backup file.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          className="text-sm"
        />
        {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default BackupRestoreForm;
