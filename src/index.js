"use strict";
const PointConnector = ({
  groupSelector = ".point-group",
  pointTypeAttribute = "data-point-type",
  connectorStyle = "solid",
  lineHeight = 3,
  connectorClassName = "connector",
  animationDuration = 0.7,
  animate = true,
  animationEasing = "ease",
  animationType = "width",
  positionType = "absolute",
  zindex = "-1",
  topOffset = document.getElementsByTagName("html")[0].getBoundingClientRect()
    .top * -1,
  leftOffset = document.getElementsByTagName("html")[0].getBoundingClientRect()
    .left * -1,
}) => {
  const calculateAngle = (a, b) => {
    const dy = a.y > b.y ? a.y - b.y : -(b.y - a.y);
    const dx = a.x > b.x ? a.x - b.x : -(b.x - a.x);
    return Math.atan2(dy, dx);
  };
  const drawPointConnectors = (points) => {
    if (points.length === 0) {
      return;
    }
    for (let i = 0; i <= points.length; i++) {
      let currentPoint = points[i];
      let nextPoint = points[i + 1];
      if (!nextPoint) {
        break;
      }

      let currentBoundingRect = currentPoint.getBoundingClientRect();
      let nextBoundingRect = nextPoint.getBoundingClientRect();

      let lines = document.createElement("div");
      lines.className = connectorClassName;

      if (animate) {
        lines.style.width = "0";
        lines.style.transition = `${animationType} ${animationDuration}s ${animationEasing} ${
          animationDuration * i
        }s`;
      }

      lines.style.margin = "0";
      lines.style.padding = "0";
      lines.style.borderTopStyle = connectorStyle;
      lines.style.borderTopStyle = connectorStyle;
      lines.style.borderTopWidth = lineHeight + "px";
      lines.style.borderTopColor = currentPoint.style.backgroundColor;

      if (positionType === "absolute") {
        document.body.appendChild(lines);
        lines.style.zIndex = zindex;
        lines.style.position = "absolute";
        lines.style.left =
          leftOffset +
          window.scrollX +
          currentBoundingRect.x +
          currentBoundingRect.width / 2 +
          "px";
        lines.style.top =
          topOffset +
          window.scrollY +
          currentBoundingRect.y -
          lineHeight / 2 +
          currentBoundingRect.height / 2 +
          "px";
      } else if (positionType === "relative") {
        currentPoint.appendChild(lines);
        lines.style.position = "relative";
        lines.style.marginLeft = `${currentBoundingRect.width / 2 - 1}px`;
        lines.style.marginTop = `${currentBoundingRect.height / 2 - 1}px`;
      } else {
        throw new Error(
          `Please provide a valid position type (e.g. "absolute" or "relative")`
        );
      }

      lines.style.width =
        Math.hypot(
          nextBoundingRect.x - currentBoundingRect.x,
          nextBoundingRect.y - currentBoundingRect.y
        ) + "px";
      lines.style.transformOrigin = "left";
      lines.style.opacity = 1;
      lines.style.transform =
        "rotate(" +
        calculateAngle(nextBoundingRect, currentBoundingRect) +
        "rad)";
    }
  };

  const removeConnectors = () => {
    const connectors = document.querySelectorAll("." + connectorClassName);
    connectors.forEach((connector) => {
      connector.remove();
    });
  };

  const connectPoints = () => {
    const pointGroup = document.querySelectorAll(`${groupSelector}`);
    const pointTypes = new Set();

    document
      .querySelectorAll(`[${pointTypeAttribute}]`)
      .forEach((point) =>
        pointTypes.add(point.getAttribute(pointTypeAttribute))
      );

    pointGroup.forEach((group) =>
      pointTypes.forEach((pointType) =>
        drawPointConnectors(
          group.querySelectorAll(
            `:scope [${pointTypeAttribute}="${pointType}"]`
          )
        )
      )
    );
  };
  const redraw = () => {
    removeConnectors();
    connectPoints();
  };

  const initialize = () => {
    if (!groupSelector || !pointTypeAttribute) {
      throw new Error(
        `Please provide a group selector (e.g. ".group") and the point type attribute (e.g. "data-point-type")`
      );
    }

    if (positionType === "absolute") {
      window.addEventListener("resize", redraw);
    }
    connectPoints();
  };

  return {
    initialize,
    redraw,
  };
};

module.exports = PointConnector;
