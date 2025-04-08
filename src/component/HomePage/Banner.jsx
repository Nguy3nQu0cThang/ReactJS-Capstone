import { useEffect, useState, useRef} from "react";
import { http, TOKEN_CYBERSOFT } from "../../utils/setting";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { Carousel } from "bootstrap";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const carouselRef = useRef(null)
  useEffect(() => {
    const getAPIQuanLyPhimBanner = async () => {
      try {
        const res = await http.get("/api/QuanLyPhim/LayDanhSachBanner");
        setBanners(res.data.content);
        console.log(res.data.content)
      } catch (err) {
        console.log("Error Banner", err);
      }
    };
    getAPIQuanLyPhimBanner();
  }, []);

  useEffect(() => {
    if (banners.length > 0 && carouselRef.current) {
      new Carousel(carouselRef.current, {
        interval: 3000,
        ride: "carousel",
      });
    }
  }, [banners]);
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
      <div className="carousel-inner">
        {banners.map((banner, index) => {
          console.log(banner);
          return (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={banner.maBanner}
              data-bs-interval={index === 0 ? 3000 : 3000}
            >
              <img
                src={banner.hinhAnh}
                className="d-block"
                style={{
                  width: "100%",
                  height:"400px",
                  objectFit: "fill",
                }}
                alt={`bannerr ${banner.maBanner}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;
