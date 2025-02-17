import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "../../redux/features/userSlice";
import "./Profile.scss";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  console.log("Redux Store User:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => console.log("User data:", res.data))
      .catch((err) => console.log("Error fetching user:", err));
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setUser(null));
        navigate("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("Logout failed");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      alert("Şifrə ən az 6 simvol olmalıdır!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Şifrələr uyğun gəlmir!");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/resetpassword",
        { password: newPassword },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("Şifrə uğurla yeniləndi!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert("Şifrə yenilənmədi");
      }
    } catch (error) {
      alert("Şifrə yenilənmədi");
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) {
      alert("Please select a profile picture to upload.");
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

      console.log("Updated User Data:", res.data); // ✅ Backend cavabını yoxla

      if (res.status === 200) {
        alert("Profile picture updated successfully!");
        dispatch(
          setUser({
            id: res.data.user._id, // 🔥 `_id`-i `id` kimi göndər
            name: res.data.user.name,
            surname: res.data.user.surname,
            email: res.data.user.email,
            profilePicture: res.data.user.image, // 🔥 `image` sahəsini profilePicture kimi qeyd et
            isVerified: res.data.user.isVerified,
          })
        );
      } else {
        alert("Profile picture update failed.");
      }
    } catch (error) {
      alert("Profile picture update failed.");
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await fetch(
      "http://localhost:5000/auth/uploadProfilePicture",
      {
        method: "POST",
        body: formData,
        credentials: "include", // 🎯 Cookie göndərmək üçün vacibdir
      }
    );

    const data = await response.json();
    console.log(data);
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

            {/* Profil Şəkili Göstərilir */}
            {user.profilePicture && (
              <div className="profile-picture">
                <img src={user.profilePicture} alt="Profil Şəkli" />
              </div>
            )}

            <div>
              <label htmlFor="profilePicture">Profil Şəkli:</label>
              <input
                type="file"
                id="profilePicture"
                onChange={handleProfilePictureChange}
              />
              <button onClick={handleProfilePictureUpload}>Yüklə</button>
            </div>
          </>
        ) : (
          <p>Məlumat tapılmadı.</p>
        )}
      </div>

      <div className="reset-password">
        <h2>Şifrə Yenilə</h2>
        <input
          type="password"
          placeholder="Yeni şifrə"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yeni şifrəni təsdiqlə"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Şifrəni Yenilə</button>
      </div>

      <div className="document-history">
        <h2>Dokument Keçmişi</h2>
        <ul>
          <li>Fayl 1 - 12.02.2025</li>
          <li>Fayl 2 - 10.02.2025</li>
          <li>Fayl 3 - 08.02.2025</li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Çıxış
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
