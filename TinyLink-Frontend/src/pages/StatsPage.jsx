import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "./StatsPage.css";
import { api } from "../api/api";

export default function StatsPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/links/${code}`);
      setData(response.data);
    } catch (error) {
      toast.error("Link not found!");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [code]);

  const handleCopy = () => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short link copied!");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
      await api.delete(`/api/links/${code}`);
      toast.success("Link deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <p>Loading stats...</p>;
  if (!data) return null;

  return (
    <div className="stats-container">
      <h2>Link Statistics</h2>

      <div className="stats-card">
        <div className="row">
          <span className="label">Short Code:</span>
          <span className="value">{data.code}</span>
        </div>

        <div className="row">
          <span className="label">Short URL:</span>
          <span className="value short-url">
            {window.location.origin}/{data.code}
          </span>
          <button className="copy-btn" onClick={handleCopy}>
            Copy
          </button>
        </div>

        <div className="row">
          <span className="label">Target URL:</span>
          <span className="value url" title={data.targetUrl}>
            {data.targetUrl}
          </span>
        </div>

        <div className="row">
          <span className="label">Clicks:</span>
          <span className="value">{data.clicks}</span>
        </div>

        <div className="row">
          <span className="label">Last Clicked:</span>
          <span className="value">
            {data.lastClicked
              ? new Date(data.lastClicked).toLocaleString()
              : "-"}
          </span>
        </div>

        <div className="row">
          <span className="label">Created At:</span>
          <span className="value">
            {new Date(data.createdAt).toLocaleString()}
          </span>
        </div>

        <button className="delete-btn" onClick={handleDelete}>
          Delete Link
        </button>
      </div>
    </div>
  );
}
