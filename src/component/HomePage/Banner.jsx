import { useEffect, useState } from "react";
import { http, TOKEN_CYBERSOFT } from "../../utils/setting";

const Banner = () => {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    const getAPIQuanLyPhimBanner = async () => {
      try {
        const res = await http.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
          
        );
        setBanners(res.data.content)
      } catch (err) {
        console.log("Error Banner", err);
      }
    };
    getAPIQuanLyPhimBanner()
  },[])

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div className={`carousel-item ${index===0 ? 'active' : ''}`} key={index}>
            <img src={banner.hinhAnh} className="d-block w-100" alt="Banner" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
