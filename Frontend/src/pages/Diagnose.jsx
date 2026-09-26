import { useRef, useState } from "react";
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

import "../pages_styles/Diagnose.css";

const defaultDiagnosis = {
  crop: "Tomato",
  disease: "Early Blight",
  confidence: 94,
  severity: "Moderate",
  symptoms: [
    "Dark circular or irregular spots on leaves",
    "Yellowing around affected areas",
    "Progressive leaf damage",
  ],
  treatment: [
    "Remove heavily affected leaves from the plant.",
    "Avoid watering the foliage directly.",
    "Use an appropriate fungicide according to the product label.",
  ],
  prevention: [
    "Maintain good spacing between plants.",
    "Keep the crop area clean and remove infected debris.",
    "Monitor lower leaves regularly for early symptoms.",
  ],
};

export default function Diagnose({ onBack }) {
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type?.startsWith("image/")) {
      window.alert("Please select a JPG, JPEG, PNG or other image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const preview = typeof reader.result === "string" ? reader.result : "";

      if (!preview) {
        window.alert("Unable to preview this image. Please choose another file.");
        return;
      }

      setImage({
        file,
        url: preview,
        name: file.name || "crop-image",
        size: file.size || 0,
        type: file.type || "image/*",
      });

      setImageError(false);
      setAnalyzing(false);
      setResult(null);
    };

    reader.onerror = () => {
      window.alert("Unable to read this image. Please try another file.");
      setImage(null);
    };

    reader.readAsDataURL(file);
  };

  const handleInput = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    // Allows selecting the same file again.
    event.target.value = "";
  };

  const removeImage = () => {
    setImage(null);
    setImageError(false);
    setAnalyzing(false);
    setResult(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const analyzeImage = () => {
    if (!image?.url || imageError) return;

    setAnalyzing(true);
    setResult(null);

    window.setTimeout(() => {
      setAnalyzing(false);
      setResult(defaultDiagnosis);
    }, 1800);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleBack = () => {
    if (typeof onBack === "function") {
        onBack();
    }
  };

  return (
    <div className="diagnose-page">
      <div className="diagnose-header">
        <div>
          <button type="button" className="back-button" onClick={handleBack}>
            <ArrowLeft size={16} />
            Dashboard
          </button>

          <div className="diagnose-eyebrow">
            <ScanSearch size={14} />
            AI CROP HEALTH
          </div>

          <h1>Detect crop disease</h1>

          <p>
            Upload a clear photo of your plant or leaf and CropZora will help
            identify possible crop health problems.
          </p>
        </div>

        <div className="diagnose-header-badge">
          <Sparkles size={15} />
          <span>AI-powered analysis</span>
        </div>
      </div>

      <div className="diagnose-layout">
        <section className="diagnose-upload-card">
          <div className="diagnose-card-header">
            <div>
              <span>STEP 01</span>
              <h2>{result ? "Analysis complete" : "Upload a plant photo"}</h2>
              <p>
                {result
                  ? "Review the AI-assisted crop health result below."
                  : "Choose a clear image showing the affected leaf, fruit or stem."}
              </p>
            </div>

            <div className="step-number">{result ? "02" : "01"}</div>
          </div>

          {!image && !analyzing && !result && (
            <div
              className={`upload-zone ${dragging ? "dragging" : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setDragging(false);
              }}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  inputRef.current?.click();
                }
              }}
            >
              <div className="upload-icon">
                <CloudUpload size={28} />
              </div>

              <h3>Drop your image here</h3>

              <p>or click to browse from your device</p>

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
                    window.alert(
                      "Camera capture will be connected in the next step."
                    );
                  }}
                >
                  <Camera size={15} />
                  Use camera
                </button>
              </div>

              <small>JPG, JPEG or PNG · Recommended 5MP+</small>
            </div>
          )}

          {image && !analyzing && (
            <>
              <div className="image-preview-box">
                {!imageError ? (
                  <img
                    src={image.url}
                    alt="Selected crop"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="image-preview-error">
                    <CircleAlert size={28} />
                    <strong>Image preview failed</strong>
                    <span>Please select the image again.</span>
                  </div>
                )}

                <div className="preview-overlay">
                  <div className="preview-file">
                    <FileImage size={15} />
                    <span>{image.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={removeImage}
                    aria-label="Remove image"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {!result && (
                <button
                  type="button"
                  className="analyze-button"
                  onClick={analyzeImage}
                  disabled={imageError}
                >
                  <ScanSearch size={18} />
                  Analyze crop health
                  <ChevronRight size={17} />
                </button>
              )}
            </>
          )}

          {analyzing && (
            <div className="analysis-loader">
              <div className="loader-ring">
                <LoaderCircle size={42} strokeWidth={1.7} />
                <Leaf size={17} />
              </div>

              <h3>Analyzing your plant...</h3>

              <p>
                CropZora AI is examining visual symptoms in your uploaded image.
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

          {result && (
            <div className="result-complete-state">
              <div>
                <span className="result-complete-badge">
                  <Check size={13} />
                  AI ANALYSIS COMPLETE
                </span>

                <h3>{result.disease}</h3>

                <p>
                  Detected on <strong>{result.crop}</strong> with{" "}
                  <strong>{result.confidence}% confidence</strong>.
                </p>
              </div>

              <div className="result-complete-actions">
                <button
                  type="button"
                  className="scan-again"
                  onClick={removeImage}
                >
                  <RefreshCw size={15} />
                  Scan another plant
                </button>
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

        <aside className="diagnose-tips">
          <div className="tips-heading">
            <div className="tips-icon">
              <Sparkles size={17} />
            </div>

            <div>
              <strong>Better photos = better analysis</strong>
              <span>Follow these simple tips</span>
            </div>
          </div>

          <div className="tip-item">
            <span>01</span>
            <div>
              <strong>Show the affected area</strong>
              <p>
                Keep the diseased leaf, fruit or stem clearly visible in the
                center.
              </p>
            </div>
          </div>

          <div className="tip-item">
            <span>02</span>
            <div>
              <strong>Use good lighting</strong>
              <p>Natural daylight usually produces clearer crop symptoms.</p>
            </div>
          </div>

          <div className="tip-item">
            <span>03</span>
            <div>
              <strong>Avoid blurry photos</strong>
              <p>Keep your phone steady and let the affected area fill the frame.</p>
            </div>
          </div>

          <div className="tip-item">
            <span>04</span>
            <div>
              <strong>Include the whole leaf</strong>
              <p>
                When possible, capture both healthy and affected areas.
              </p>
            </div>
          </div>

          <div className="privacy-note">
            <ShieldCheck size={15} />
            <span>
              Your uploaded image stays within your CropZora session in this
              demo.
            </span>
          </div>
        </aside>
      </div>

      {result && (
        <section className="diagnosis-result-card">
          <div className="result-header">
            <div>
              <span className="result-eyebrow">AI ANALYSIS COMPLETE</span>
              <h2>Crop health result</h2>
              <p>
                CropZora found a possible health issue in your uploaded image.
              </p>
            </div>

            <div className="result-time">
              <Clock3 size={14} />
              Just now
            </div>
          </div>

          <div className="result-grid">
            <div className="result-image">
              {!imageError ? (
                <img src={image.url} alt="Analyzed crop" />
              ) : (
                <div className="image-fallback">
                  <CircleAlert size={25} />
                  Preview unavailable
                </div>
              )}

              <div>
                <span>{result.crop}</span>
                <strong>AI analyzed</strong>
              </div>
            </div>

            <div className="result-main">
              <span className="result-label">POSSIBLE CONDITION</span>

              <h3>{result.disease}</h3>

              <div className="confidence-row">
                <div className="confidence-circle">
                  <strong>{result.confidence}%</strong>
                  <span>confidence</span>
                </div>

                <div>
                  <strong className="confidence-title">
                    High-confidence match
                  </strong>
                  <p>
                    The visual pattern detected in the uploaded image is
                    consistent with this condition.
                  </p>
                </div>
              </div>

              <div className="severity">
                <span>Severity</span>
                <strong>{result.severity}</strong>
              </div>
            </div>

            <div className="result-info">
              <div className="info-title">
                <CircleAlert size={16} />
                Common symptoms
              </div>

              <ul>
                {result.symptoms.map((item) => (
                  <li key={item}>
                    <Check size={13} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="guidance-grid">
            <div className="guidance-card">
              <div className="guidance-icon green">
                <Leaf size={18} />
              </div>

              <div>
                <strong>Treatment</strong>
                <ul>
                  {result.treatment.map((item) => (
                    <li key={item}>
                      <Check size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="guidance-card">
              <div className="guidance-icon blue">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Prevention</strong>
                <ul>
                  {result.prevention.map((item) => (
                    <li key={item}>
                      <Check size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="guidance-card">
              <div className="guidance-icon orange">
                <CircleAlert size={18} />
              </div>

              <div>
                <strong>Important note</strong>
                <p>
                  AI results are advisory. Confirm important treatment
                  decisions with a qualified agricultural expert.
                </p>
              </div>
            </div>
          </div>

          <div className="result-footer">
            <span>
              <ShieldCheck size={13} />
              This demo uses a sample diagnosis. The real AI/ML model can be
              connected later.
            </span>

            <button type="button" className="scan-again" onClick={removeImage}>
              <RefreshCw size={15} />
              Scan another plant
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
