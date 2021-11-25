import React, { Component } from "react";
import { UserContext } from "../../auth/providers";
import { isMobileOnly } from 'react-device-detect'

const ArrowType =
{
    leftArrow: "leftArrow",
    rightArrow: "rightArrow"
}

const FrameOrigin =
{
    left: -1,
    halfLeft: -0.5,
    center: 0,
    halfRight: 0.5,
    right: 1
}

export default class Arrows extends Component {
    state =
        {
            frameOrigin: FrameOrigin.center,
        }

    componentDidMount() {
        window.addEventListener('resize', this.recenterCamera);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.recenterCamera);
    }


    handleArrowClickMobile = (arrowType, event) => {
        event.preventDefault();
        let currentMargin = parseInt((this.props.mainContainer.currentStyle || window.getComputedStyle(this.props.mainContainer)).marginLeft.split('p')[0]);
        let temp = (this.props.mainContainer.clientWidth - this.props.mediaContainer.clientWidth) / 2;
        if (arrowType === ArrowType.leftArrow) {
            this.props.updateParent({
                marginLeft: `${currentMargin + Math.abs(temp / 2)}px`,
                transition: '0.25s',
            })

            if ( Math.abs(Math.abs(temp)-(currentMargin + Math.abs(temp / 2))) < 5) {
                this.setState({
                    frameOrigin: FrameOrigin.left
                })
            }else{
                this.setState({
                    frameOrigin: FrameOrigin.center
                })
            }

        } else if (arrowType === ArrowType.rightArrow) {
            this.props.updateParent({
                marginLeft: `${currentMargin + (temp / 2)}px`,
                transition: '0.25s',
            })
            if ( Math.abs((temp)-(currentMargin + (temp / 2) )) < 5) {
                this.setState({
                    frameOrigin: FrameOrigin.right
                })
            }else{
                this.setState({
                    frameOrigin: FrameOrigin.center
                })
            }
        }
    }

    handleArrowClick = (arrowType, event) => {
        if (isMobileOnly || this.props.mainContainer.clientWidth < 991) {
            this.handleArrowClickMobile(arrowType, event)
            return;
        }
        event.preventDefault();
        if (arrowType === ArrowType.leftArrow) {
            switch (this.state.frameOrigin) {
                case FrameOrigin.center:
                    this.moveCameraToSide(FrameOrigin.left)
                    break;
                case FrameOrigin.right:
                    this.recenterCamera();
                    break;
                default:
            }
        } else if (arrowType === ArrowType.rightArrow) {
            switch (this.state.frameOrigin) {
                case FrameOrigin.center:
                    this.moveCameraToSide(FrameOrigin.right);
                    break;
                case FrameOrigin.left:
                    this.recenterCamera();
                    break;
                default:
            }
        }
    }

    moveCameraToSide = (targetOriginPosition) => {
        let temp = (this.props.mainContainer.clientWidth - this.props.mediaContainer.clientWidth) / 2
        if (this.props.mainContainer.clientWidth < this.props.mediaContainer.clientWidth) {
            this.props.updateParent({
                marginLeft: `${targetOriginPosition === FrameOrigin.left ? Math.abs(temp) : temp}px`,
                transition: '0.25s',
            })
            this.setState({
                frameOrigin: targetOriginPosition
            })
        }
    }

    recenterCamera = () => {
        this.props.updateParent({
            marginLeft: `0`,
            transition: '0.25s'
        })
        this.setState({
            frameOrigin: FrameOrigin.center
        })
    }

    render() {
        return (
            <>
                {
                    this.state.frameOrigin !== FrameOrigin.left &&
                    <svg id="leftArrow" className="more-arrows" onClick={(event) => { this.handleArrowClick(ArrowType.leftArrow, event); }}
                    // style={{ "transform": `scale(${isMobileOnly ? '0.6,0.6':'1.2,1.2'}) rotate(90deg)`, "top": "45%", "left": `${isMobileOnly?'0%':'1%'}` }}
                    >
                        <polygon className="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 " />
                        <polygon className="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 " />
                        <polygon className="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 " />
                    </svg>
                }
                {
                    this.state.frameOrigin !== FrameOrigin.right &&
                    <svg id="rightArrow" className="more-arrows" onClick={(event) => { this.handleArrowClick(ArrowType.rightArrow, event); }}
                    // style={{ "transform": `scale(${isMobileOnly ? '0.6,0.6':'1.2,1.2'}) rotate(270deg)`, "top": "45%", "right": `${isMobileOnly?'1%':'7%'}`}}
                    >
                        <polygon className="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 " />
                        <polygon className="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 " />
                        <polygon className="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 " />
                    </svg>
                }
            </>
        );
    }

}

Arrows.contextType = UserContext;
