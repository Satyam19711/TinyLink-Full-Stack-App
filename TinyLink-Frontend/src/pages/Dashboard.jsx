import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "./LinkTable";
import { api } from "../api/api";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/links");
      setLinks(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (code) => {
    if (!window.confirm(`Delete link with code "${code}"?`)) return;

    try {
      await api.delete(`/api/links/${code}`);
      toast.success("Link deleted");
      fetchLinks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete link");
    }
  };

  return (
    <div>
      <AddLinkForm onLinkCreated={fetchLinks} />

      <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>All Links</h2>

      {loading ? (
        <p>Loading links...</p>
      ) : links.length === 0 ? (
        <p>No links yet. Create your first short link above!</p>
      ) : (
        <LinkTable links={links} onDelete={handleDelete} />
      )}
    </div>
  );
}
