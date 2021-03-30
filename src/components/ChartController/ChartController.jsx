import React from 'react';

const ChartController = (props) => {
  // группа из точек вертикальных линий и полигонов
  // при на ведении на график всплывает подсказка
  if (props.points.hasOwnProperty('pointsOfgrafik')) {
    let circle = props.points.dots.map(element => {
      return <circle className="dots" key={element[0] + element[1]} cx={element[0]} cy={element[1]} r="4" strokeWidth="1" />
    })
    let verticalLines = props.points.verticalLines.map(element => {
      return <polyline className="verticalLines" key={element} points={element} />
    })
    let verticalPolygon = props.points.verticalPolygon.map((element, index) => {
      return <polygon className="verticalPolygon" key={element} points={element} />
    })
    let promptPolygon = props.points.promptPolygon.map((element, index) => {
      return (<>
        <polygon className="promptPolygon" key={element} points={element} />
        <text className="textPrompt" x={props.points.dots[index][0] + 4} y={props.points.dots[index][1] - 10} >
          {props.points.textPrompt.axisY[index]
          }</text>
      </>
      )
    })

    return (
      <div className = 'container'>
        <svg className="chartController" width="700" height="375px" style={{ marginLeft: "30px" }}>
          <polyline className="grafik" points={props.points.pointsOfgrafik} fill="none" stroke="black" />
          
          {props.points.zeroAxis !== 'none' ?
          <polyline className="zeroAxis" points={props.points.zeroAxis} fill="none" stroke="black" />
          :
          <></>
          }
          
          {circle.map((element, index) => {
            return (
              <g key={index} className="group">
                {verticalPolygon[index]}
                {verticalLines[index]}
                {promptPolygon[index]}
                {circle[index]}
              </g>
            )
          })
          }

          <path d={props.points.descriptionLines.pointsOfAxisY} fill="none" stroke="black" />
          {props.points.descriptionLines.pointsOfLegendY.map((element, index) => {
            return (
              <g key={index}>
                <text className="textAxis" x={element[0]} y={element[1]} >
                  {props.points.descriptionLines.legendY[index]}
                </text>
              </g>
            )
          })
          }

          <path d={props.points.descriptionLines.pointsOfAxisX} fill="none" stroke="black" />
          {props.points.descriptionLines.pointsOfLegendX.map((element, index) => {
            return (
              <g key={index}>
                <text className="textAxis" x={element[0]} y={element[1]} >
                  {props.points.descriptionLines.legendX[index]}
                </text>
              </g>
            )
          })
          }
          <line />
        </svg>
      </div>
    );
  } else {
    return <div></div>
  }
}
export default (ChartController)