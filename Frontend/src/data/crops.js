import { useEffect, useRef, useState } from "react";

import {

  ArrowLeft,

  Camera,

  Check,

  ChevronRight,

  CircleAlert,

  Clock3,

  CloudUpload,

  FileImage,

  Leaf,

  LoaderCircle,

  RefreshCw,

  ScanSearch,

  ShieldCheck,

  Sparkles,

  Upload,

  X,

} from "lucide-react";

export default function Diagnose() {

  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [image, setImage] = useState(null);

  const [dragging, setDragging] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);

  const [result, setResult] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [cameraError, setCameraError] = useState("");

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
  };

  const startCamera = async (facingMode = cameraFacing) => {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access is not supported by this browser.");
      setCameraOpen(true);
      return;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOpen(true);
    } catch (error) {
      let message = "We could not access your camera. Please try again.";

      if (error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
        message = "Camera permission was blocked. Allow camera access in your browser and try again.";
      } else if (error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError") {
        message = "No camera was found on this device.";
      } else if (error?.name === "NotReadableError" || error?.name === "TrackStartError") {
        message = "Your camera is already being used by another app.";
      }

      setCameraError(message);
      setCameraOpen(true);
    }
  };

  useEffect(() => {
    if (!cameraOpen || !streamRef.current || !videoRef.current) return;

    videoRef.current.srcObject = streamRef.current;

    videoRef.current
      .play()
      .catch(() => {});
  }, [cameraOpen]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const switchCamera = async () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    await startCamera(nextFacing);
  };

  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video || video.readyState < 2 || !video.videoWidth) {
      setCameraError("Camera is still starting. Please wait a moment and try again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      setCameraError("We could not capture the photo. Please try again.");
      return;
    }

    if (cameraFacing === "user") {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) {
        setCameraError("We could not create the captured image. Please try again.");
        return;
      }

      const file = new File([blob], `cropzora-camera-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      stopCamera();
      handleFile(file);
    }, "image/jpeg", 0.92);
  };

  const handleFile = (file) => {

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("Please select an image file.");

      return;

    }

    const imageUrl = URL.createObjectURL(file);

    setImage({

      file,

      url: imageUrl,

      name: file.name,

    });

    setResult(null);

  };

  const handleInput = (event) => {

    const file = event.target.files?.[0];

    if (file) {

      handleFile(file);

    }

  };

  const removeImage = () => {

    if (image?.url) {

      URL.revokeObjectURL(image.url);

    }

    setImage(null);

    setResult(null);

    if (inputRef.current) {

      inputRef.current.value = "";

    }

  };

  const analyzeImage = () => {

    if (!image) return;

    setAnalyzing(true);

    setResult(null);

    setTimeout(() => {

      setAnalyzing(false);

      setResult({

        crop: "Tomato",

        disease: "Early Blight",

        confidence: 94,

        severity: "Moderate",

      });

    }, 2200);

  };

  const handleDrop = (event) => {

    event.preventDefault();

    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {

      handleFile(file);

    }

  };

  return (

    <div className="diagnose-page">

      {/* =====================================================*

*          PAGE HEADER*

*      ===================================================== */}

      <div className="diagnose-header">

        <div>

          <button className="back-button">

            <ArrowLeft size={16} />

            Dashboard

          </button>

          <div className="diagnose-eyebrow">

            <ScanSearch size={14} />

            AI CROP HEALTH

          </div>

          <h1>

            Detect crop disease

          </h1>

          <p>

            Upload a clear photo of your plant or leaf and

            CropZora AI will help identify possible crop health

            problems.

          </p>

        </div>

        <div className="diagnose-header-badge">

          <Sparkles size={15} />

          <span>

            AI-powered analysis

          </span>

        </div>

      </div>

      {/* =====================================================*

*          MAIN AREA*

*      ===================================================== */}

      <div className="diagnose-layout">

        {/* ===================================================*

*            LEFT — UPLOAD*

*        =================================================== */}

        <section className="diagnose-upload-card">

          <div className="diagnose-card-header">

            <div>

              <span>

                STEP 01

              </span>

              <h2>

                Upload a plant photo

              </h2>

              <p>

                Choose a clear image showing the affected

                leaf, fruit or stem.

              </p>

            </div>

            <div className="step-number">

              01

            </div>

          </div>

          {!image && !analyzing && (

            <div

              className={`upload-zone ${

                dragging ? "dragging" : ""

              }`}

              onDragOver={(event) => {

                event.preventDefault();

                setDragging(true);

              }}

              onDragLeave={() => setDragging(false)}

              onDrop={handleDrop}

              onClick={() => inputRef.current?.click()}

            >

              <div className="upload-icon">

                <CloudUpload size={28} />

              </div>

              <h3>

                Drop your image here

              </h3>

              <p>

                or click to browse from your device

              </p>

              <div className="upload-buttons">

                <button

                  type="button"

                  onClick={(event) => {

                    event.stopPropagation();

                    inputRef.current?.click();

                  }}

                >

                  <Upload size={15} />

                  Choose image

                </button>

                <button

                  type="button"

                  className="camera-button"

                  onClick={(event) => {

                    event.stopPropagation();

                    startCamera();

                  }}

                >

                  <Camera size={15} />

                  Use camera

                </button>

              </div>

              <small>

                JPG, JPEG or PNG · Recommended 5MP+

              </small>

            </div>

          )}

          {image && !analyzing && (

            <div className="image-preview-box">

              <img

                src={image.url}

                alt="Selected crop"

              />

              <div className="preview-overlay">

                <div className="preview-file">

                  <FileImage size={15} />

                  <span>

                    {image.name}

                  </span>

                </div>

                <button

                  onClick={removeImage}

                  aria-label="Remove image"

                >

                  <X size={16} />

                </button>

              </div>

            </div>

          )}

          {analyzing && (

            <div className="analysis-loader">

              <div className="loader-ring">

                <LoaderCircle

                  size={42}

                  strokeWidth={1.7}

                />

                <Leaf size={17} />

              </div>

              <h3>

                Analyzing your plant...

              </h3>

              <p>

                CropZora AI is examining visual symptoms

                in your image.

              </p>

              <div className="analysis-steps">

                <span className="active">

                  <Check size={12} />

                  Image quality checked

                </span>

                <span className="active">

                  <Check size={12} />

                  Plant identified

                </span>

                <span>

                  <LoaderCircle size={12} />

                  Checking disease patterns

                </span>

              </div>

            </div>

          )}

          {image && !analyzing && !result && (

            <button

              className="analyze-button"

              onClick={analyzeImage}

            >

              <ScanSearch size={18} />

              Analyze crop health

              <ChevronRight size={17} />

            </button>

          )}

          {cameraOpen && (

            <div className="camera-modal" role="dialog" aria-modal="true" aria-label="Crop camera">

              <div className="camera-panel">

                <div className="camera-panel-header">

                  <div>

                    <span className="camera-eyebrow">CROP CAMERA</span>

                    <h3>Take a crop photo</h3>

                  </div>

                  <button

                    type="button"

                    className="camera-close"

                    onClick={stopCamera}

                    aria-label="Close camera"

                  >

                    <X size={18} />

                  </button>

                </div>

                <div className="camera-preview">

                  {cameraError ? (

                    <div className="camera-error">

                      <div className="camera-error-icon">

                        <CircleAlert size={22} />

                      </div>

                      <strong>Camera unavailable</strong>

                      <p>{cameraError}</p>

                      <button

                        type="button"

                        className="camera-retry"

                        onClick={() => startCamera(cameraFacing)}

                      >

                        Try again

                      </button>

                    </div>

                  ) : (

                    <>

                      <video

                        ref={videoRef}

                        className={`camera-video ${cameraFacing === "user" ? "camera-video-mirrored" : ""}`}

                        autoPlay

                        muted

                        playsInline

                      />

                      <div className="camera-guide">

                        <span />

                        <p>Keep the affected leaf inside the frame</p>

                      </div>

                    </>

                  )}

                </div>

                {!cameraError && (

                  <div className="camera-controls">

                    <button

                      type="button"

                      className="camera-control-secondary"

                      onClick={switchCamera}

                    >

                      <RefreshCw size={17} />

                      Switch camera

                    </button>

                    <button

                      type="button"

                      className="capture-button"

                      onClick={capturePhoto}

                      aria-label="Capture photo"

                    >

                      <span />

                    </button>

                    <button

                      type="button"

                      className="camera-control-secondary"

                      onClick={stopCamera}

                    >

                      Cancel

                    </button>

                  </div>

                )}

              </div>

            </div>

          )}

          <input

            ref={inputRef}

            type="file"

            accept="image/*"

            hidden

            onChange={handleInput}

          />

        </section>

        {/* ===================================================*

*            RIGHT — TIPS*

*        =================================================== */}

        <aside className="diagnose-tips">

          <div className="tips-heading">

            <div className="tips-icon">

              <Sparkles size={17} />

            </div>

            <div>

              <strong>

                Better photos = better analysis

              </strong>

              <span>

                Follow these simple tips

              </span>

            </div>

          </div>

          <div className="tip-item">

            <span>

              01

            </span>

            <div>

              <strong>

                Show the affected area

              </strong>

              <p>

                Keep the diseased leaf or fruit clearly

                visible in the center.

              </p>

            </div>

          </div>

          <div className="tip-item">

            <span>

              02

            </span>

            <div>

              <strong>

                Use good lighting

              </strong>

              <p>

                Natural daylight usually produces clearer

                results.

              </p>

            </div>

          </div>

          <div className="tip-item">

            <span>

              03

            </span>

            <div>

              <strong>

                Avoid blurry photos

              </strong>

              <p>

                Keep your phone steady while capturing

                the plant.

              </p>

            </div>

          </div>

          <div className="tip-item">

            <span>

              04

            </span>

            <div>

              <strong>

                Include the whole leaf

              </strong>

              <p>

                If possible, capture both healthy and

                affected areas.

              </p>

            </div>

          </div>

          <div className="privacy-note">

            <ShieldCheck size={15} />

            <span>

              Your uploaded image stays within your

              CropZora session in this demo.

            </span>

          </div>

        </aside>

      </div>

      {/* =====================================================*

*          RESULT*

*      ===================================================== */}

      {result && (

        <section className="diagnosis-result-card">

          <div className="result-header">

            <div>

              <div className="result-status-row">

                <span className="result-eyebrow">

                  AI ANALYSIS COMPLETE

                </span>

                <span className="result-status-pill">

                  <Check size={12} />

                  Result ready

                </span>

              </div>

              <h2>

                Crop health result

              </h2>

              <p>

                Here is the preliminary result from the photo you provided.

              </p>

            </div>

            <div className="result-time">

              <Clock3 size={14} />

              Just now

            </div>

          </div>

          <div className="result-summary">

            <div className="result-image">

              <img

                src={image.url}

                alt="Analyzed crop"

              />

              <div>

                <span>{result.crop}</span>

                <strong>Analyzed photo</strong>

              </div>

            </div>

            <div className="result-diagnosis">

              <div className="diagnosis-topline">

                <span className="result-label">POSSIBLE CONDITION</span>

                <span className={`severity-badge severity-${result.severity.toLowerCase()}`}>

                  {result.severity} severity

                </span>

              </div>

              <h3>{result.disease}</h3>

              <p className="diagnosis-description">

                The visible pattern in this image is consistent with the condition shown above.
                Use the guidance below as a starting point and verify serious cases with a local
                agricultural expert.

              </p>

              <div className="confidence-block">

                <div className="confidence-heading">

                  <span>Detection confidence</span>

                  <strong>{result.confidence}%</strong>

                </div>

                <div className="confidence-track">

                  <span style={{ width: `${result.confidence}%` }} />

                </div>

                <div className="confidence-note">

                  <Check size={13} />

                  Strong visual match in this demo result

                </div>

              </div>

            </div>

            <div className="result-crop-card">

              <div className="result-crop-icon">

                <Leaf size={18} />

              </div>

              <span>IDENTIFIED CROP</span>

              <strong>{result.crop}</strong>

              <small>Photo-based identification</small>

            </div>

          </div>

          <div className="result-info-grid">

            <div className="result-info result-info-highlight">

              <div className="info-title">

                <CircleAlert size={16} />

                Common symptoms

              </div>

              <ul>

                <li>Dark circular or irregular spots</li>

                <li>Yellowing around affected areas</li>

                <li>Progressive leaf damage</li>

              </ul>

            </div>

            <div className="result-info result-info-note">

              <div className="info-title">

                <ShieldCheck size={16} />

                What this means

              </div>

              <p>

                Early action can help limit spread. Check nearby leaves regularly and compare
                symptoms before taking treatment decisions.

              </p>

            </div>

          </div>

          <div className="guidance-heading">

            <div>

              <span>CARE GUIDANCE</span>

              <h3>What you can do next</h3>

            </div>

            <p>Simple steps to inspect, manage and prevent further crop damage.</p>

          </div>

          <div className="guidance-grid">

            <div className="guidance-card">

              <div className="guidance-icon green">

                <CircleAlert size={18} />

              </div>

              <div>

                <strong>Inspect nearby leaves</strong>

                <p>

                  Look for similar spots or yellowing on lower and nearby foliage.

                </p>

              </div>

            </div>

            <div className="guidance-card">

              <div className="guidance-icon blue">

                <Leaf size={18} />

              </div>

              <div>

                <strong>Improve crop care</strong>

                <p>

                  Avoid unnecessary leaf wetness and keep the growing area well ventilated.

                </p>

              </div>

            </div>

            <div className="guidance-card">

              <div className="guidance-icon orange">

                <ShieldCheck size={18} />

              </div>

              <div>

                <strong>Monitor and prevent</strong>

                <p>

                  Remove heavily affected material where appropriate and monitor nearby plants.

                </p>

              </div>

            </div>

          </div>

          <div className="result-advisory">

            <div className="result-advisory-icon">

              <ShieldCheck size={16} />

            </div>

            <div>

              <strong>Important</strong>

              <p>

                This is a frontend demo result. AI predictions are advisory and should be confirmed
                before applying any crop treatment or pesticide.

              </p>

            </div>

          </div>

          <div className="result-footer">

            <button

              className="scan-again"

              onClick={removeImage}

            >

              <RefreshCw size={15} />

              Scan another plant

            </button>

            <span>

              <ShieldCheck size={13} />

              Your photo remains in the current CropZora session.

            </span>

          </div>

        </section>
      )}

    </div>

  );

}

/* =========================================================*

*   SMALL ICON*

*========================================================= */

function DropletIcon() {

  return (

    <svg

      width="18"

      height="18"

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="2"

      strokeLinecap="round"

      strokeLinejoin="round"

    >

      <path d="M12 2s7 7.2 7 13a7 7 0 0 1-14 0c0-5.8 7-13 7-13Z" />

      <path d="M9 16c.5 1.4 1.5 2 3 2" />

    </svg>

  );

}
