import { ImageString } from "../../../const/assets/ImageString";
import { AnalyticsLocations } from "../../../const/fixed/Types";
import { menuItemsId, menuItemsIndex } from "../../../const/Menu/MenuConst";
import { analytics } from "../../firebase/firebase";
import "./liveCount.css";

const LiveCount = (props) => {
  const { data, location } = props;
    // console.log(data, "///////////////////////////////////////");
  return (
    <>
      <div className="liveCountContainer">
        <img src={ImageString.LiveCount} alt="liveCount"></img>
        <div>
          {/* {data.online} */}
          {location === menuItemsId.Lobby && data[AnalyticsLocations.Lobby]}
          {location === menuItemsId.Networking &&
            data[AnalyticsLocations.Networking]}
          {location === menuItemsId.bdr && data[AnalyticsLocations.DBR]}
          {location === menuItemsId.Audi && data[AnalyticsLocations.Audi]}
          {location === menuItemsId.rescen && data[AnalyticsLocations.Rencen]}
          {location === menuItemsId.exibooth &&
            data[AnalyticsLocations.ExiBooth]}
        </div>
      </div>
    </>
  );
};

export default LiveCount;
