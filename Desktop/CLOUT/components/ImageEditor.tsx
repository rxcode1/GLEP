"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { fabric } from "fabric";
import CloutGlassesLogo from "@/components/CloutGlassesLogo";

interface ImageEditorProps {
  imageSrc: string;
  onDownload: () => void;
  onReset: () => void;
}

export default function ImageEditor({ imageSrc, onDownload, onReset }: ImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [glassesAdded, setGlassesAdded] = useState(false);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [faceModel, setFaceModel] = useState<any>(null);
  const [baseImageObj, setBaseImageObj] = useState<fabric.Image | null>(null);
  const [imageScale, setImageScale] = useState<number>(1);

  // Face detection disabled due to CORS issues with CDN models
  // Users can manually place glasses using the "ADD GLASSES" button
  useEffect(() => {
    // Face detection disabled - manual placement only
    setFaceModel(null);
  }, []);

  useEffect(() => {
    let canvas: fabric.Canvas | null = null;
    let isMounted = true;

    // Dynamically import fabric to avoid SSR issues
    import("fabric").then((fabricModule) => {
      if (!isMounted || !canvasRef.current) return;

      setFabricLoaded(true);
      const fabric = fabricModule.fabric;

      canvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: "#000000",
        preserveObjectStacking: true,
        renderOnAddRemove: true,
      });
      
      // Set initial canvas size to ensure it's visible
      canvas.setWidth(800);
      canvas.setHeight(600);
      canvas.renderAll();

      // Load the uploaded image with error handling
      console.log('Loading image from:', imageSrc);
      
      try {
        fabric.Image.fromURL(
          imageSrc,
          async (img) => {
            if (!isMounted || !canvas) {
              console.log('Canvas not ready or unmounted');
              return;
            }
            
            if (!img) {
              console.error('Image object is null');
              return;
            }
            
            try {
              // Get original image dimensions
              const originalWidth = img.width || 800;
              const originalHeight = img.height || 600;
              
              console.log('Image loaded successfully:', { originalWidth, originalHeight });
              
              if (!originalWidth || !originalHeight || originalWidth === 0 || originalHeight === 0) {
                console.error('Invalid image dimensions');
                return;
              }
        
        // Get actual container dimensions after it's rendered
        const getContainerDimensions = () => {
          // Get the canvas container (the div with border)
          const container = canvasRef.current?.parentElement?.parentElement;
          if (!container) {
            // Fallback to viewport-based calculation
            const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
            const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
            // Account for sidebar (~350px) and padding
            return {
              width: Math.max(400, vw - 400),
              height: Math.max(400, vh - 250)
            };
          }
          
          // Get actual container size
          const containerRect = container.getBoundingClientRect();
          const padding = 32; // 16px padding on each side (p-4 = 16px)
          const border = 8; // 4px border on each side (border-4 = 4px)
          
          const availableWidth = containerRect.width - padding - border;
          const availableHeight = containerRect.height - padding - border;
          
          console.log('Container dimensions:', {
            containerWidth: containerRect.width,
            containerHeight: containerRect.height,
            availableWidth,
            availableHeight
          });
          
          return {
            width: Math.max(400, availableWidth),
            height: Math.max(400, availableHeight)
          };
        };
        
        // Wait a bit for layout to settle, then get dimensions
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Get container dimensions multiple times to ensure accuracy
        let containerDims = getContainerDimensions();
        // Try again if dimensions seem off
        if (containerDims.width > 2000 || containerDims.height > 2000) {
          await new Promise(resolve => setTimeout(resolve, 100));
          containerDims = getContainerDimensions();
        }
        
        const { width: maxCanvasWidth, height: maxCanvasHeight } = containerDims;
        
        // Calculate scale to fit container - allow scaling up for small images
        const scaleX = maxCanvasWidth / originalWidth;
        const scaleY = maxCanvasHeight / originalHeight;
        const scale = Math.min(scaleX, scaleY); // Allow scaling up AND down
        
        // Calculate final dimensions to fill the container
        let finalWidth = Math.floor(originalWidth * scale);
        let finalHeight = Math.floor(originalHeight * scale);
        
        // Ensure canvas fills the container (use container size, not image size)
        finalWidth = maxCanvasWidth;
        finalHeight = maxCanvasHeight;
        
        // Set canvas size to fill container
        canvas.setWidth(finalWidth);
        canvas.setHeight(finalHeight);
        
        // Scale image to fit canvas (maintain aspect ratio)
        img.scale(scale);
        
        // Center the image in the canvas
        const imgScaledWidth = originalWidth * scale;
        const imgScaledHeight = originalHeight * scale;
        const centerX = (finalWidth - imgScaledWidth) / 2;
        const centerY = (finalHeight - imgScaledHeight) / 2;
        
        img.set({
          left: centerX,
          top: centerY,
          originX: 'left',
          originY: 'top',
        });
        
        // Lock the base image so it can't be moved
        img.set({
          selectable: false,
          evented: false,
          hasControls: false,
          hasBorders: true, // Show border around image
          borderColor: 'white',
          borderScaleFactor: 2,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
        });
        
        // Add image to canvas
        canvas.add(img);
        canvas.sendToBack(img);
        
        // Force canvas dimensions again after adding image
        canvas.setDimensions({ 
          width: finalWidth, 
          height: finalHeight 
        });
        
        // Force immediate render
        canvas.renderAll();
        
        // Double-check render after a brief delay
        setTimeout(() => {
          if (canvas && isMounted) {
            canvas.renderAll();
            console.log('Canvas re-rendered, image should be visible');
          }
        }, 100);

        // Store image reference and scale
        setBaseImageObj(img);
        setImageScale(scale);
        
        // Force canvas element to respect container bounds with CSS
        if (canvasRef.current) {
          canvasRef.current.setAttribute('width', finalWidth.toString());
          canvasRef.current.setAttribute('height', finalHeight.toString());
          canvasRef.current.style.width = `${finalWidth}px`;
          canvasRef.current.style.height = `${finalHeight}px`;
          canvasRef.current.style.maxWidth = '100%';
          canvasRef.current.style.maxHeight = '100%';
          canvasRef.current.style.boxSizing = 'border-box';
        }
            } catch (error) {
              console.error('Error processing image:', error);
            }
          },
          {
            crossOrigin: 'anonymous'
          }
        );
      } catch (error) {
        console.error('Error loading image:', error);
        console.error('Failed to load image from:', imageSrc);
      }

      setFabricCanvas(canvas);
    });

    return () => {
      isMounted = false;
      if (canvas) {
        canvas.dispose();
      }
      setFabricCanvas(null);
      setGlassesAdded(false);
      setBaseImageObj(null);
    };
  }, [imageSrc]);

  // Auto-detect faces when both model and image are ready
  // DISABLED: Face detection models have CORS issues, using manual placement instead
  // useEffect(() => {
  //   if (faceModel && fabricCanvas && baseImageObj && !glassesAdded && !isDetecting) {
  //     detectAndAddGlasses(fabricCanvas, baseImageObj, imageScale);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [faceModel, fabricCanvas, baseImageObj]);

  const detectAndAddGlasses = async (
    canvas: fabric.Canvas,
    baseImage: fabric.Image,
    imageScale: number
  ) => {
    if (!faceModel || !fabricLoaded) return;

    setIsDetecting(true);
    const fabricModule = await import("fabric");
    const fabric = fabricModule.fabric;

    try {
      // Get original image dimensions
      const originalWidth = baseImage.width || 800;
      const originalHeight = baseImage.height || 600;
      
      // Create a temporary canvas for face detection (use original image size)
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = originalWidth;
      tempCanvas.height = originalHeight;
      const tempCtx = tempCanvas.getContext("2d");
      
      if (!tempCtx) return;

      // Draw the image to temp canvas at original size
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
          resolve(null);
        };
        img.onerror = reject;
      });

      // Detect faces using face-api.js
      const detectionOptions = new faceModel.TinyFaceDetectorOptions({
        inputSize: 512,
        scoreThreshold: 0.5,
      });
      
      const detections = await faceModel
        .detectAllFaces(tempCanvas, detectionOptions)
        .withFaceLandmarks();

      console.log(`Detected ${detections.length} face(s)`);

      if (detections.length === 0) {
        // No faces detected, place glasses in center
        console.log("No faces detected, placing glasses in center");
        await addGlassesToCanvas(canvas, null, imageScale);
        setIsDetecting(false);
        return;
      }

      // Add glasses for each detected face
      for (const detection of detections) {
        const landmarks = detection.landmarks;
        
        if (!landmarks) {
          console.warn("Face detected but no landmarks found");
          // Fallback to bounding box
          const box = detection.detection.box;
          if (box) {
            const leftEyeX = box.x + box.width * 0.25;
            const leftEyeY = box.y + box.height * 0.4;
            const rightEyeX = box.x + box.width * 0.75;
            const rightEyeY = box.y + box.height * 0.4;
            
            const eyeDistance = Math.sqrt(
              Math.pow(rightEyeX - leftEyeX, 2) + Math.pow(rightEyeY - leftEyeY, 2)
            );
            const glassesX = (leftEyeX + rightEyeX) / 2;
            const glassesY = (leftEyeY + rightEyeY) / 2 - eyeDistance * 0.1;
            const glassesScale = (eyeDistance * 0.2) / 200;
            
            console.log(`Using bounding box fallback (no landmarks) - Eye distance: ${eyeDistance.toFixed(2)}px, Scale: ${glassesScale.toFixed(3)}`);
            
            await addGlassesToCanvas(canvas, {
              x: glassesX * imageScale,
              y: glassesY * imageScale,
              scale: glassesScale,
            }, imageScale);
          }
          continue;
        }
        
        // face-api.js landmarks: left eye (36-41), right eye (42-47)
        // Get eye positions from landmarks
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        
        if (!leftEye || !rightEye || leftEye.length === 0 || rightEye.length === 0) {
          // Fallback to bounding box
          const box = detection.detection.box;
          if (box) {
            const leftEyeX = box.x + box.width * 0.25;
            const leftEyeY = box.y + box.height * 0.4;
            const rightEyeX = box.x + box.width * 0.75;
            const rightEyeY = box.y + box.height * 0.4;
            
            const eyeDistance = Math.sqrt(
              Math.pow(rightEyeX - leftEyeX, 2) + Math.pow(rightEyeY - leftEyeY, 2)
            );
            const glassesX = (leftEyeX + rightEyeX) / 2;
            const glassesY = (leftEyeY + rightEyeY) / 2 - eyeDistance * 0.1;
            const glassesScale = (eyeDistance * 0.2) / 200;
            
            console.log(`Using bounding box fallback - Eye distance: ${eyeDistance.toFixed(2)}px, Scale: ${glassesScale.toFixed(3)}`);
            
            await addGlassesToCanvas(canvas, {
              x: glassesX * imageScale,
              y: glassesY * imageScale,
              scale: glassesScale,
            }, imageScale);
          }
          continue;
        }
        
        // Calculate eye center positions
        const leftEyeCenter = leftEye.reduce(
          (acc: { x: number; y: number }, point: { x: number; y: number }) => ({ 
            x: acc.x + point.x, 
            y: acc.y + point.y 
          }),
          { x: 0, y: 0 }
        );
        leftEyeCenter.x /= leftEye.length;
        leftEyeCenter.y /= leftEye.length;
        
        const rightEyeCenter = rightEye.reduce(
          (acc: { x: number; y: number }, point: { x: number; y: number }) => ({ 
            x: acc.x + point.x, 
            y: acc.y + point.y 
          }),
          { x: 0, y: 0 }
        );
        rightEyeCenter.x /= rightEye.length;
        rightEyeCenter.y /= rightEye.length;
        
        // Calculate distance between eyes
        const eyeDistance = Math.sqrt(
          Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) + 
          Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
        );
        
        // Position glasses centered between eyes, slightly above
        const glassesX = (leftEyeCenter.x + rightEyeCenter.x) / 2;
        const glassesY = (leftEyeCenter.y + rightEyeCenter.y) / 2 - eyeDistance * 0.1;
        
        // Scale glasses based on eye distance
        // Assuming glasses image is ~200px wide, scale to match eye distance
        // Use 0.2x eye distance for glasses width (much smaller, better fitted)
        const glassesScale = (eyeDistance * 0.2) / 200;
        
        console.log(`Eye distance: ${eyeDistance.toFixed(2)}px`);
        console.log(`Positioning glasses at (${glassesX.toFixed(2)}, ${glassesY.toFixed(2)}) with scale ${glassesScale.toFixed(3)}`);
        
        // Map coordinates to scaled canvas (don't double-apply imageScale to position)
        await addGlassesToCanvas(canvas, {
          x: glassesX * imageScale,
          y: glassesY * imageScale,
          scale: glassesScale, // Don't multiply by imageScale again - glasses scale is relative to original image
        }, imageScale);
      }

      setIsDetecting(false);
    } catch (error) {
      console.error("Error detecting faces:", error);
      console.error("Error details:", error);
      // Fallback to center placement
      await addGlassesToCanvas(canvas, null, imageScale);
      setIsDetecting(false);
    }
  };

  const addGlassesToCanvas = async (
    canvas: fabric.Canvas,
    position: { x: number; y: number; scale: number } | null,
    imageScale: number
  ) => {
    const fabricModule = await import("fabric");
    const fabric = fabricModule.fabric;

    // Load glasses image from public folder
    fabric.Image.fromURL("/glasses.png", (glassesImg) => {
      if (!canvas) return;
      
      const imgWidth = glassesImg.width || 200;
      const imgHeight = glassesImg.height || 120;
      
      console.log(`Glasses image dimensions: ${imgWidth}x${imgHeight}`);
      
      let left: number;
      let top: number;
      let scale: number;
      
      if (position) {
        // Use detected position
        // Position is already in canvas coordinates, scale is relative to original glasses size
        left = position.x - (imgWidth * position.scale) / 2;
        top = position.y - (imgHeight * position.scale) / 2;
        scale = position.scale;
        console.log(`Final glasses position: left=${left.toFixed(2)}, top=${top.toFixed(2)}, scale=${scale.toFixed(3)}`);
      } else {
        // Center placement (fallback) - make smaller by default
        const centerX = (canvas.width || 800) / 2;
        const centerY = (canvas.height || 600) / 2;
        left = centerX - imgWidth / 2;
        top = centerY - imgHeight / 2;
        // Make default glasses much smaller - scale to 0.3 of original size
        scale = 0.3 * imageScale;
      }
      
      glassesImg.set({
        left,
        top,
        scaleX: scale,
        scaleY: scale,
        hasControls: true,
        hasBorders: true,
        lockRotation: false,
        borderColor: "white",
        cornerColor: "white",
        cornerSize: 10,
        transparentCorners: false,
        selectable: true,
      });

      canvas.add(glassesImg);
      canvas.setActiveObject(glassesImg);
      canvas.renderAll();
      setGlassesAdded(true);
    }, {
      crossOrigin: "anonymous"
    });
  };

  const addGlasses = async () => {
    if (!fabricCanvas || !fabricLoaded) return;

    // If face model is available, use it; otherwise use manual placement
    if (faceModel && fabricCanvas && baseImageObj) {
      await detectAndAddGlasses(fabricCanvas, baseImageObj, imageScale);
    } else {
      // Manual placement fallback
      const fabricModule = await import("fabric");
      const fabric = fabricModule.fabric;

      fabric.Image.fromURL("/glasses.png", (glassesImg) => {
        if (!fabricCanvas) return;
        
        const centerX = (fabricCanvas.width || 800) / 2;
        const centerY = (fabricCanvas.height || 600) / 2;
        const imgWidth = glassesImg.width || 200;
        const imgHeight = glassesImg.height || 120;
        
        // Make glasses much smaller by default - 0.3 scale
        glassesImg.set({
          left: centerX - (imgWidth * 0.3) / 2,
          top: centerY - (imgHeight * 0.3) / 2,
          scaleX: 0.3,
          scaleY: 0.3,
          hasControls: true,
          hasBorders: true,
          lockRotation: false,
          borderColor: "white",
          cornerColor: "white",
          cornerSize: 10,
          transparentCorners: false,
          selectable: true,
        });

        fabricCanvas.add(glassesImg);
        fabricCanvas.setActiveObject(glassesImg);
        fabricCanvas.renderAll();
        setGlassesAdded(true);
      }, {
        crossOrigin: "anonymous"
      });
    }
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.download = "clout-glasses-meme.png";
    link.href = dataURL;
    link.click();

    onDownload();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-5xl md:text-7xl font-black text-center uppercase tracking-tight">
        EDIT YOUR MEME
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Canvas */}
        <div 
          className="flex-1 border-4 border-white p-4 bg-black relative flex items-center justify-center" 
          style={{ 
            minHeight: '500px', 
            height: '70vh',
            maxHeight: 'calc(100vh - 200px)',
            maxWidth: '100%',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {isDetecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <CloutGlassesLogo size={60} />
                </motion.div>
                <p className="text-2xl font-black uppercase">DETECTING FACES...</p>
              </div>
            </div>
          )}
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              overflow: 'hidden'
            }}
          >
            <canvas
              ref={canvasRef}
              className="border-4 border-white"
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addGlasses}
            disabled={glassesAdded || isDetecting}
            className="w-full px-6 py-4 bg-white text-black font-black uppercase border-4 border-white hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDetecting ? "DETECTING FACES..." : glassesAdded ? "GLASSES ADDED" : "ADD GLASSES"}
          </motion.button>
          
          {faceModel && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                if (fabricCanvas && baseImageObj) {
                  await detectAndAddGlasses(fabricCanvas, baseImageObj, imageScale);
                }
              }}
              disabled={glassesAdded || isDetecting || !faceModel}
              className="w-full px-6 py-4 border-4 border-white font-black uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDetecting ? "DETECTING..." : "DETECT FACES"}
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={!glassesAdded}
            className="w-full px-6 py-4 bg-white text-black font-black uppercase border-4 border-white hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            DOWNLOAD
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="w-full px-6 py-4 border-4 border-white font-black uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            START OVER
          </motion.button>

          <div className="border-4 border-white p-4 mt-8">
            <p className="text-lg font-bold mb-2 uppercase">INSTRUCTIONS:</p>
            <ul className="text-sm space-y-2 opacity-80">
              <li>• Glasses auto-detect faces on upload</li>
              <li>• Click &quot;ADD GLASSES&quot; to manually add</li>
              <li>• Drag to adjust position</li>
              <li>• Use corner handles to resize</li>
              <li>• Rotate with top handle</li>
              <li>• Click &quot;DOWNLOAD&quot; when done</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

