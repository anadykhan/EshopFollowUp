import styles from "../../styles/style";
import CountDown from "./CountDown";

const EventCard = () => {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2 mb-12`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          Iphone 14 Max pro max 8/256gb
        </h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
          numquam eius laudantium iure non pariatur cum earum, voluptatem
          provident quaerat quis obcaecati ea quod at dolores, ipsam,
          perspiciatis enim! Voluptatum.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[50px] text-[10px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-orange-400">
            120 sold
          </span>
        </div>
        <CountDown></CountDown>
      </div>
    </div>
  );
};
export default EventCard;
