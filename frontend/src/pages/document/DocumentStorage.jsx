import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./DocumentStorage.scss";
import {
  fetchDocuments,
  uploadDocument,
} from "../../redux/features/documentSlice";

const DocumentStorage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { documents, loading, error } = useSelector((state) => state.documents);

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchDocuments());
    }
  }, [user, navigate, dispatch]);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadDocument(file));
      setFile(null);
    }
  };

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-document">
      <h2>Document Storage</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file}>
        Upload Document
      </button>

      {/* 🔵 Sənəd siyahısı */}
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <a
              href={`http://localhost:5000/${doc.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentStorage;
