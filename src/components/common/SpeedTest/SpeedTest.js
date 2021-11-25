import { InternetStatus } from '../../../const/fixed/Types';
import './SpeedTest.css'
const UIRoot = '/3dAssets/UI/internet/';
const SpeedIndicatorLinks = {
    slow: UIRoot + 'low.png',
    moderate: UIRoot + 'moderate.png',
    fast: UIRoot + 'fast.png',
}

const SpeedTest = (props) => {
    const { currentStatus } = props;
    // console.log(currentStatus)
    return (
        <>
            <div className="SpeedTestContainer">
                {
                    currentStatus === InternetStatus.slow &&
                    <img src={SpeedIndicatorLinks.slow} alt="speed"></img>
                }
                {
                    currentStatus === InternetStatus.moderate &&
                    <img src={SpeedIndicatorLinks.moderate} alt="speed"></img>
                }
                {
                    currentStatus === InternetStatus.fast &&
                    <img src={SpeedIndicatorLinks.fast} alt="speed"></img>
                }
            </div>
        </>);
}

export default SpeedTest;