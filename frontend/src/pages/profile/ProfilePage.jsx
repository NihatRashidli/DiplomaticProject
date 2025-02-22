import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "../../redux/features/userSlice";
import "./Profile.scss";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/documents", {
          withCredentials: true,
        });
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };

    fetchDocuments();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      alert("Çıxış zamanı xəta baş verdi.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("az-AZ", options);
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) {
      alert("Profil şəkli seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("image", profilePicture);

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/uploadProfilePicture",
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Profil şəkli yeniləndi!");
        dispatch(setUser({ ...user, profilePicture: res.data.user.image }));
        window.location.reload();
      }
    } catch (error) {
      alert("Profil şəkli yenilənmədi.");
    }
  };

  return (
    <div className="profile-container">
      <h1>Profil</h1>
      <div className="user-info">
        <h2>İstifadəçi Məlumatları</h2>
        {user ? (
          <>
            <p>
              <strong>Ad:</strong> {user.name}
            </p>
            <p>
              <strong>Soyad:</strong> {user.surname}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <div className="profile-picture">
              <img
                src={`http://localhost:5000/${user.image}`}
                alt="Profil Şəkli"
              />
            </div>

            <div>
              <label htmlFor="profilePicture">Profil Şəkli:</label>
              <input
                type="file"
                id="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
              <button className="upload-btn" onClick={handleProfilePictureUpload}>Yüklə</button>
            </div>
          </>
        ) : (
          <p>Məlumat tapılmadı.</p>
        )}
      </div>

      <div className="document-history">
        <h2>Dokumentasiya Keçmişi</h2>
        {documents.length > 0 ? (
          <ul>
            {documents.map((doc) => (
              <li key={doc._id}>
                <a
                  href={`http://localhost:5000/${doc.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.name} - {formatDate(doc.createdAt)}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Hələ heç bir sənəd əlavə edilməyib.</p>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Çıxış
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
