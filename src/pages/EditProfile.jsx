// src/pages/EditProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileAction,
  updateProfileAction,
} from "../redux/reducer/userReducer";

const EditProfile = () => {
  const { taiKhoan } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.userReducer);

  const [formValues, setFormValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  useEffect(() => {
    dispatch(getProfileAction(taiKhoan));
  }, [taiKhoan]);

  useEffect(() => {
    if (profile) {
      setFormValues({
        taiKhoan: profile.taiKhoan,
        matKhau: profile.matKhau,
        email: profile.email,
        soDt: profile.soDT,
        maNhom: profile.maNhom,
        maLoaiNguoiDung: profile.maLoaiNguoiDung,
        hoTen: profile.hoTen,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfileAction(formValues));
    await dispatch(getProfileAction(taiKhoan));
    navigate(`/profile/${taiKhoan}`);
  };

  return (
    <div className="container mx-auto max-w-md mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Chỉnh sửa thông tin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Họ tên</label>
          <input
            type="text"
            name="hoTen"
            value={formValues.hoTen}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Số ĐT</label>
          <input
            type="text"
            name="soDt"
            value={formValues.soDt}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Mật khẩu</label>
          <input
            type="password"
            name="matKhau"
            value={formValues.matKhau}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
