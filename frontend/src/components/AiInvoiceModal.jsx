import React from 'react';
import { aiInvoiceModalStyles } from '../assets/dummyStyles';
import GeminiIcon from './GeminiIcon';
import AnimatedButton from '../assets/GenerateBtn/Gbtn';
import { useState, useEffect } from 'react';


const AiInvoiceModal = ({ open, onClose, onGenerate, initialText = "" }) => {
  const [text, setText] = useState(initialText || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    setText(initialText || "");
    setError("");
    setLoading(false);
  }, [open, initialText]);

  if (!open) return null;
  async function handleGenerateClick() {
    setError("");
    const raw = (text || "").trim();
    if (!raw) {
      setError("Please paste invoice text to generate from AI.");
      return;
    }

    try {
      setLoading(true);
      const mayBePromise = onGenerate && onGenerate(raw);
      if (mayBePromise && typeof mayBePromise.then === "function") {
        await mayBePromise;
      }
    } catch (err) {
      console.error("onGenerate handler failed:", err);
      const msg = err && (err.message || (typeof err === "string" ? err : JSON.stringify(err)));
      setError(msg || "Failed to generate. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={aiInvoiceModalStyles.overlay}>
      <div className={aiInvoiceModalStyles.backdrop} onClick={() => onClose && onClose()}></div>

      <div className={aiInvoiceModalStyles.modal}>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className={aiInvoiceModalStyles.title}><GeminiIcon className="w-6 h-6 group-hover:scale-110 transition-transform flex-none" /> Create Invoice with AI</h3>
            <p className={aiInvoiceModalStyles.description}>
              Paste any text contains invoice details (client, items, qty, prices) and we'll attempt to extract an invoice.
            </p>
          </div>
          <button onClick={() => onClose && onClose()} className={aiInvoiceModalStyles.closeButton} >
            ✕

          </button>
        </div>

        <div className="mt-4">
          <label className={aiInvoiceModalStyles.label}>Paste Invoice Text</label>
          <textarea
            className={aiInvoiceModalStyles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`eg. A person wants a logo design for her organic brand "GreenVibe." Quoted for $120 for 2 logo options and final delivery in PNG and vector format `} rows={8} >
          </textarea>

        </div>

        {error && (<div className={aiInvoiceModalStyles.error} role="alert">
          {String(error)
            .split("\n")
            .map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          {(/quota|exhausted|resource_exhausted/i.test(String(error)) && (
            <div style={{ marginTop: 8, fontSize: 13, color: "#374151" }}>
              Tip: AI is temporarily unavailable (quota). Try again in a few
              minutes, or create the invoice manually.
            </div>
          )) ||
            null}
        </div>)}

        <div className={aiInvoiceModalStyles.actions}>
          <AnimatedButton
            onClick={handleGenerateClick}
            loading={loading}
            disabled={loading}
            label="Generate"

          />


        </div>

      </div>
    </div>

  )
}

export default AiInvoiceModal
