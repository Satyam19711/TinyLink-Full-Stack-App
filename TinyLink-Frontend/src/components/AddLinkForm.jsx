import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./AddLinkForm.css";
import { api } from "../api/api";

export default function AddLinkForm({ onLinkCreated }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!targetUrl.trim()) {
      toast.error("Target URL is required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/links", {
        targetUrl,
        code: customCode || undefined,
      });

      toast.success("Link created successfully!");

      setTargetUrl("");
      setCustomCode("");

      if (onLinkCreated) onLinkCreated();
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Code already exists! Try another one.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Short Link</h2>

      <input
        type="text"
        placeholder="Enter Target URL"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Custom Code (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        className="input-field"
      />

      <button className="create-btn" onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create Link"}
      </button>
    </div>
  );
}
