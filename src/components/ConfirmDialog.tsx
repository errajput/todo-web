import Button from "@/ui/Button";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center sm:items-center sm:justify-center backdrop-blur-sm z-50">
      {/* Desktop Centered / Mobile Bottom Sheet */}
      <div
        className="bg-white w-full sm:w-auto rounded-t-xl sm:rounded-lg shadow-lg p-4 sm:p-6 
                    absolute bottom-0 sm:static"
      >
        <p className="mb-4 text-center text-sm sm:text-base">{message}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button
            label="Yes"
            onClick={onConfirm}
            className="md:!h-10 md:!w-30 bg-red-500 text-white hover:bg-red-600"
          />

          <Button
            label="No"
            onClick={onCancel}
            className="md:!h-10 md:!w-30 bg-gray-300 text-gray-800 hover:bg-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
