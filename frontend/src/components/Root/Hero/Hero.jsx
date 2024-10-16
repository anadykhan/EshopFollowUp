import { Link } from "react-router-dom";
import styles from "../../../styles/style";

const Hero = () => {
  return (
    <div
      className={`realtive min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection For <br /> Home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[400] text-[#000000ba]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
          cumque ex dolores vero explicabo fuga <br /> repudiandae veniam
          tempora nam quas eligendi praesentium, eveniet omnis libero a placeat
          reiciendis obcaecati excepturi!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-Poppins text-[18px]">
                Show Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Hero;
