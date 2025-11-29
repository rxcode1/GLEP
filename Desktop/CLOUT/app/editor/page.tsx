"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CloutGlassesLogo from "@/components/CloutGlassesLogo";
import ImageEditor from "@/components/ImageEditor";
import confetti from "canvas-confetti";

export default function EditorPage() {
  const [image, setImage] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFFFFF', '#000000'],
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b-4 border-white px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <CloutGlassesLogo size={60} />
              </motion.div>
              <span className="text-3xl font-black uppercase tracking-tight">CLOUT GLASSES</span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="/"
              className="px-6 py-3 border-4 border-white font-black uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              HOME
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Editor Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!image ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tight">
                UPLOAD YOUR IMAGE
              </h1>

              {/* Upload Area */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto"
              >
                <UploadArea onImageUpload={handleImageUpload} />
                
                <div className="mt-8 text-2xl font-bold opacity-70">
                  OR
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWebcam(true)}
                  className="mt-8 px-8 py-4 border-4 border-white font-black uppercase text-xl hover:bg-white hover:text-black transition-all duration-300"
                >
                  USE WEBCAM
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <ImageEditor
                imageSrc={image}
                onDownload={handleDownload}
                onReset={() => setImage(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Webcam Modal */}
        <AnimatePresence>
          {showWebcam && (
            <WebcamCapture
              onCapture={(imageData) => {
                setImage(imageData);
                setShowWebcam(false);
              }}
              onClose={() => setShowWebcam(false)}
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

function UploadArea({ onImageUpload }: { onImageUpload: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      whileHover={{ scale: 1.02 }}
      className={`
        border-4 border-dashed border-white p-16 cursor-pointer
        transition-all duration-300
        ${isDragging ? "bg-white text-black" : "hover:bg-white hover:text-black"}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6 flex justify-center"
        >
          <CloutGlassesLogo size={80} />
        </motion.div>
        <p className="text-3xl font-black mb-4 uppercase">
          {isDragging ? "DROP IT" : "DRAG & DROP"}
        </p>
        <p className="text-xl font-bold opacity-70">
          OR CLICK TO UPLOAD
        </p>
      </div>
    </motion.div>
  );
}

function WebcamCapture({
  onCapture,
  onClose,
}: {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        currentStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        alert("Unable to access webcam. Please check permissions.");
      });

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/png");
        onCapture(imageData);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full"
      >
        <div className="border-4 border-white p-4 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-h-[70vh] object-contain border-4 border-white"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-4 mt-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={capturePhoto}
              className="px-8 py-4 bg-white text-black font-black uppercase border-4 border-white hover:bg-black hover:text-white transition-all duration-300"
            >
              CAPTURE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-4 border-4 border-white font-black uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              CANCEL
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

