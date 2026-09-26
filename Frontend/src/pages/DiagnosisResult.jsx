import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Leaf,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import "../pages_styles/DiagnosisResult.css";

const defaultResult = {
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

const fallbackImage =
  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=90";

export default function DiagnosisResult({
  image,
  result = defaultResult,
  onBack,
  onScanAgain,
}) {
  const diagnosis = {
    ...defaultResult,
    ...(result || {}),
  };

  const imageUrl = image?.url || image || fallbackImage;

  const confidence =
    Number(diagnosis.confidence) >= 0
      ? Number(diagnosis.confidence)
      : 0;

  const confidenceValue = Math.min(100, Math.max(0, confidence));

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  const handleScanAgain = () => {
    if (typeof onScanAgain === "function") {
      onScanAgain();
    }
  };

  return (
    <div className="diagnosis-result-page">
      <div className="diagnosis-result-header">
        <div>
          <button
            type="button"
            className="diagnosis-back-button"
            onClick={handleBack}
          >
            <ArrowLeft size={16} />
            Back to Disease Detection
          </button>

          <div className="diagnosis-result-eyebrow">
            <ScanSearch size={14} />
            AI CROP HEALTH
          </div>

          <h1>Diagnosis result</h1>

          <p>
            CropZora AI has completed the analysis of your uploaded
            crop image.
          </p>
        </div>

        <div className="diagnosis-ai-badge">
          <Sparkles size={15} />
          <span>AI analysis complete</span>
        </div>
      </div>

      <section className="diagnosis-result-card">
        <div className="diagnosis-result-card-header">
          <div>
            <span>ANALYSIS SUMMARY</span>
            <h2>Crop health result</h2>
          </div>

          <div className="diagnosis-result-time">
            <Clock3 size={14} />
            Just now
          </div>
        </div>

        <div className="diagnosis-result-grid">
          <div className="diagnosis-result-image">
            <img
              src={imageUrl}
              alt={`${diagnosis.crop} diagnosis`}
            />

            <div className="diagnosis-image-overlay">
              <div>
                <span>{diagnosis.crop}</span>
                <small>Uploaded crop image</small>
              </div>

              <span className="diagnosis-image-badge">
                <ScanSearch size={12} />
                AI SCAN
              </span>
            </div>
          </div>

          <div className="diagnosis-result-main">
            <span className="diagnosis-condition-label">
              POSSIBLE CONDITION
            </span>

            <h3>{diagnosis.disease}</h3>

            <div className="diagnosis-confidence">
              <div
                className="diagnosis-confidence-circle"
                style={{
                  "--confidence": `${confidenceValue * 3.6}deg`,
                }}
              >
                <div>
                  <strong>{confidenceValue}%</strong>
                  <span>confidence</span>
                </div>
              </div>

              <div className="diagnosis-confidence-copy">
                <strong>High-confidence match</strong>

                <p>
                  The visual pattern detected in the uploaded
                  image is consistent with this condition.
                </p>
              </div>
            </div>

            <div className="diagnosis-severity">
              <span>Severity</span>

              <strong>{diagnosis.severity}</strong>
            </div>
          </div>

          <div className="diagnosis-info-card">
            <div className="diagnosis-info-title">
              <CircleAlert size={17} />
              <span>Common symptoms</span>
            </div>

            <ul>
              {diagnosis.symptoms.map((symptom, index) => (
                <li key={`${symptom}-${index}`}>
                  <Check size={13} />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="diagnosis-guidance-grid">
          <div className="diagnosis-guidance-card">
            <div className="diagnosis-guidance-icon treatment">
              <Stethoscope size={19} />
            </div>

            <div>
              <span className="diagnosis-guidance-label">
                RECOMMENDED ACTION
              </span>

              <h3>Treatment</h3>

              <ul>
                {diagnosis.treatment.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <Check size={13} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="diagnosis-guidance-card">
            <div className="diagnosis-guidance-icon prevention">
              <ShieldCheck size={19} />
            </div>

            <div>
              <span className="diagnosis-guidance-label">
                KEEP YOUR CROP HEALTHY
              </span>

              <h3>Prevention</h3>

              <ul>
                {diagnosis.prevention.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <Check size={13} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="diagnosis-result-footer">
          <div className="diagnosis-result-note">
            <ShieldCheck size={15} />

            <span>
              This result is an AI-assisted indication and should
              be verified with a qualified agriculture expert
              before applying treatment.
            </span>
          </div>

          <button
            type="button"
            className="diagnosis-scan-again"
            onClick={handleScanAgain}
          >
            <RefreshCw size={15} />
            Scan another crop
            <ChevronRight size={14} />
          </button>
        </div>
      </section>

      <div className="diagnosis-result-bottom">
        <div>
          <span className="diagnosis-bottom-icon">
            <Leaf size={14} />
          </span>

          <strong>CropZora</strong>
          <span>Smart crop health assistance</span>
        </div>

        <span>AI-powered · Farmer-first</span>
      </div>
    </div>
  );
}