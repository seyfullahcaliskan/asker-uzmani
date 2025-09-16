export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-[900px] max-h-[90vh] overflow-y-auto relative">
        {/* Kapat butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          ✖
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
