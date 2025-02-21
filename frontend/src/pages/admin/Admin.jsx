import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";
import {
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/features/adminSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);

  const [editData, setEditData] = useState(null); // Redaktə üçün seçilmiş istifadəçi

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchUsers());
    }
  }, [user, navigate, dispatch]);

  const handleEdit = (user) => {
    setEditData(user); // Redaktə olunacaq istifadəçini seç
  };

  const handleSave = () => {
    if (editData) {
      dispatch(updateUser({ userId: editData._id, updatedData: editData }));
      setEditData(null); // Formu bağla
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      {loading && <p>Yüklənir...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Rolu</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(u)}>
                  Edit
                </button>
                {u.role !== "admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u._id)}
                  >
                    Sil
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <label>Ad:</label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <label>Email:</label>
          <input
            type="email"
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
          />
          <label>Rolu:</label>
          <select
            value={editData.role}
            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="save-btn" onClick={handleSave}>
            Yadda saxla
          </button>
          <button className="cancel-btn" onClick={() => setEditData(null)}>
            Ləğv et
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
