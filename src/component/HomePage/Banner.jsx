import { useEffect, useState } from "react";
import { http, TOKEN_CYBERSOFT } from "../../utils/setting";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getAPIQuanLyPhimBanner = async () => {
      try {
        const res = await http.get("/api/QuanLyPhim/LayDanhSachBanner");
        setBanners(res.data.content);
      } catch (err) {
        console.log("Error Banner", err);
      }
    };
    getAPIQuanLyPhimBanner();
  }, []);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={banner.maBanner}
            data-bs-interval={index === 0 ? 5000 : 3000}
          >
            <img
              src={banner.hinhAnh}
              className="d-block w-100"
              alt={`bannerr ${banner.maBanner}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
