import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LinkTable.css";

export default function LinkTable({ links, onDelete }) {
  const navigate = useNavigate();

  const handleCopy = (fullShortUrl) => {
    navigator.clipboard
      .writeText(fullShortUrl)
      .then(() => toast.success("Short link copied!"))
      .catch(() => toast.error("Failed to copy"));
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    return d.toLocaleString();
  };

  const getShortUrl = (code) => `${window.location.origin}/${code}`;

  return (
    <div className="links-wrapper">
      <table className="links-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Target URL</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            const shortUrl = getShortUrl(link.code);
            return (
              <tr key={link.code}>
                <td
                  className="clickable-code"
                  onClick={() => navigate(`/code/${link.code}`)}
                >
                  {link.code}
                </td>
                <td className="url-cell">
                  <span className="url-text" title={link.targetUrl}>
                    {link.targetUrl}
                  </span>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(shortUrl)}
                  >
                    Copy
                  </button>
                </td>
                <td>{link.clicks}</td>
                <td>{formatDate(link.lastClicked)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(link.code)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="links-cards">
        {links.map((link) => {
          const shortUrl = getShortUrl(link.code);
          return (
            <div className="link-card" key={link.code}>
              <div className="card-row">
                <span className="card-label">Code:</span>
                <span
                  className="card-code"
                  onClick={() => navigate(`/code/${link.code}`)}
                >
                  {link.code}
                </span>
              </div>

              <div className="card-row">
                <span className="card-label">Short:</span>
                <span className="card-value">{shortUrl}</span>
              </div>

              <div className="card-row">
                <span className="card-label">URL:</span>
                <span className="card-value card-url" title={link.targetUrl}>
                  {link.targetUrl}
                </span>
              </div>

              <div className="card-row">
                <span className="card-label">Clicks:</span>
                <span className="card-value">{link.clicks}</span>
              </div>

              <div className="card-row">
                <span className="card-label">Last:</span>
                <span className="card-value">
                  {formatDate(link.lastClicked)}
                </span>
              </div>

              <div className="card-actions">
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(shortUrl)}
                >
                  Copy
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(link.code)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
