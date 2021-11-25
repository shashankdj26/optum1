import React, { Component } from "react";

class ListContainer extends Component {
    componentDidMount() {
        if (this.props.addAnalytics) {
            this.props.addAnalytics(true);
        }
    }

    componentWillUnmount() {
        if (this.props.addAnalytics) {
            this.props.addAnalytics(false);
        }
    }

    render() {
        const {data} = this.props

        return (
            <>
                <div className="ListContainerParent">
                    <div className="ListContainer">
                        <div className="ListContainerHeader bottom-border">
                            <div>Team Building</div>
                            <div className="listCloseButton" onClick={(e) => this.props.hideOverlayMenu(e)}></div>
                        </div>
                        <div className="ListContainerBody whiteBG">
                            {
                                Object.keys(data).map(teamKey => (
                                    <div key={teamKey} className="listItem">
                                        <div className="listemItem-body blackText">
                                            <h3>
                                                {data[teamKey].name}
                                            </h3>
                                            <div>
                                                {data[teamKey].description}
                                            </div>
                                        </div>
                                        <div className="listemItem-button" onClick={(e) => this.props.handleTeamOptionSelection(e, data[teamKey])}>
                                            { data[teamKey].button ? data[teamKey].button :'Connect'}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ListContainer;
