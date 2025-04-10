import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMovieDetailActionThunk } from "../../redux/reducer/movieReducer";

const DetailMovie = () => {
  const param = useParams();
  const { movieDetails } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();
  console.log(param);

  const getMovieByMaPhim = async () => {
    dispatch(getMovieDetailActionThunk(param.maPhim));
  };
  useEffect(() => {
    getMovieByMaPhim();
  }, [param.maPhim]);
  return (
    <div className="container my-5 ">
      <div className="row align-items-start">
        <div className="col-md-4 mb-4">
          <img
            src={movieDetails.hinhAnh}
            alt={movieDetails.tenPhim}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-8">
          <h2 className="mb-3">{movieDetails.tenPhim}</h2>
          <p>
            <strong>Mô tả:</strong> {movieDetails.moTa}
          </p>
          <p>
            <strong>Ngày khởi chiếu:</strong>{" "}
            {new Date(movieDetails.ngayKhoiChieu).toLocaleDateString()}
          </p>
          <p>
            <strong>Đánh giá:</strong> {movieDetails.danhGia}/10
          </p>

          {movieDetails.trailer && (
            <div className="mt-4">
              <h5>Trailer</h5>
              <div className="ratio ratio-16x9">
                <iframe
                  src={movieDetails.trailer.replace("watch?v=", "embed/")}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
