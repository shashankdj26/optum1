import { object } from "prop-types";
import React, { Component } from "react";
import { UserContext } from "../auth/providers";
import { getLeaderboard, getUserRank, getUserScore, removeLeaderboardListener } from "../firebase/firebase";
import './Leaderboard.css';

//#region InlineStyles
const HeaderBackground = {
    background: 'url(/assets/images/leaderboard-bg.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain'
}
const LogoLeft = {
    background: 'url(/assets/images/R1Logo.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
}
const LogoRight = {
    background: 'url(/assets/images/koaLogo.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
}
const closeButton = {
    background: 'url(/assets/images/close.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
}

const starStyle = {
    background: 'url(/assets/images/leaderStart.png)',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
}
//#endregion 

class Leaderboard extends Component {

    state = {
        list: null,
        rank: 0,
        score: 0,
    }

    componentDidMount = async () => {
        getLeaderboard(this.updateList);
        const score = await getUserScore(this.context)
        this.setState({
            score: score
        })
    }

    componentWillUnmount() {
        removeLeaderboardListener();
    }

    updateList = (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        // console.log(data)
        this.checkIfUserisInList(data);
        this.setState({
            list: data
        })
    }

    checkIfUserisInList = async (list) => {
        var found = false;
        list.forEach((element, index) => {
            if (element.email === this.context.email) {
                found = true;
                this.setState({
                    rank: index + 1
                })
            }
        });
        if (found === false) {
            try {
                const rank = await getUserRank(this.context)
                this.setState({ rank })
            } catch (error) {
                console.log(error)
            }
        }
    }

    renderList = () => {
        if (!this.state.list) {
            return null;
        }
        let result = [];
        let list = this.state.list
        Object.keys(list).forEach((id, index) => {
            result.push(
                <tr className={`leadeboard-tableData ${this.context.email === list[id].email ? 'leadeboard-tableData-active' : ''}`}>
                    <td>{index + 1}</td>
                    <td>{list[id].name}</td>
                    <td>{list[id].score}</td>
                </tr>
            );
        })
        return result;
    }

    render() {
        return (
            <>
                <div className="leaderboardContainer-parent" style={HeaderBackground}>
                    <div className="leaderboardHeader" >
                        <div className="logo-left" style={LogoLeft}></div>
                        <div className="leaderboard-closeButton" style={closeButton} onClick={(e) => this.props.close(e)}></div>
                        <div className="logo-right" style={LogoRight}></div>
                    </div>
                    <div className="leaderboardBody">

                        <div className="leaderboardBody-title" >LEADERBOARD</div>
                        <div className="leaderboardBody-dataContainer">
                            <div className="leaderboardBody-userblock" >
                                <div>
                                    <span className="title">Your<br></br> Rank</span>
                                    <span className="value">{this.state.rank}</span>
                                </div>

                                <div>
                                    <span className="title" >Your<br></br> Points</span>
                                    <span className="value" >{this.state.score}</span>
                                    <span className="scoreStar" style={starStyle}>
                                        {/* star */}
                                    </span>
                                </div>
                            </div>
                            <table>
                                <tr className="leadeboard-tableheader">
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Points</th>
                                </tr>
                                {/* </table>
                            <div className="tableDataContainer">
                                <table> */}
                                {
                                    this.renderList()
                                }

                                {/* <tr className="leadeboard-tableData">
                                        <td>1</td>
                                        <td>S</td>
                                        <td>900</td>
                                    </tr> */}
                            </table>
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </>
        );
    }
}
Leaderboard.contextType = UserContext;
export default Leaderboard;
