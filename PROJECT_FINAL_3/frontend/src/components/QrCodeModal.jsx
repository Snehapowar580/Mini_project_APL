import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeModal = ({ qrData = 'https://example.com', onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 w-80 relative animate-fadeIn">
                {/* Close (×) button in top right */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
                    aria-label="Close QR modal"
                >
                    ×
                </button>

                <p className="text-lg font-semibold mt-2">Scan QR to Pay</p>
                <QRCode value={qrData} size={200} />

                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                    aria-label="Close QR modal"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default QRCodeModal;
