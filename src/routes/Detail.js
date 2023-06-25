import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const { movieId } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`
      )
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
    console.log(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={styles.detail_loading}>
          <p>Detail Loading</p>
        </div>
      ) : (
        <div className={styles.detail_wrapper}>
          <img
            src={movie.background_image}
            alt=""
            className={styles.detail_img}
          />
          <div>
            <h1>{movie.title_long}</h1>
          </div>
          <div className={styles.detail_description}>
            <p>{movie.description_full}</p>
            <ul className={styles.deatil_genres}>
              <h4>genres&nbsp;:&nbsp;</h4>
              {movie.genres.map((g) => (
                <li key={g}>{g}&nbsp;</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
