/**
 *
 * @param {{message: string, onConfirm: () => void, onCancel: ()=> void}}
 */
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center sm:items-center sm:justify-center backdrop-blur-sm z-50">
    {/* Desktop Centered / Mobile Bottom Sheet */}
    <div
      className="bg-white w-full sm:w-auto rounded-t-xl sm:rounded-lg shadow-lg p-4 sm:p-6 
                    absolute bottom-0 sm:static"
    >
      <p className="mb-4 text-center text-sm sm:text-base">{message}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button
          onClick={onConfirm}
          className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          No
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
