import React, {
  useState,
  useEffect,
  useRef,
  cloneElement,
  Children,
} from "react";
import { createPortal } from "react-dom";
import "./Tooltip.css";

function withSharedState(Component) {
  return ({ children, ...props }) => {
    const [anchorEl, setAnchorEl] = useState();

    children = Children.map(children, (child) =>
      cloneElement(child, {
        onMouseEnter: (evt) => setAnchorEl(evt.currentTarget),
        onMouseLeave: () => setAnchorEl(),
      })
    );

    return (
      <React.Fragment>
        {children}

        {Boolean(anchorEl) && (
          <Component anchorEl={anchorEl} setAnchorEl={setAnchorEl} {...props} />
        )}
      </React.Fragment>
    );
  };
}

function Tooltip({ anchorEl, title }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef();

  useEffect(() => {
    setPosition({
      top: getTopPosition(),
      left: getLeftPosition(),
    });
  }, []);

  const getLeftPosition = () => {
    if (ref.current) {
      const { left, width } = anchorEl.getBoundingClientRect();

      return left - ref.current.offsetWidth / 2 + width / 2;
    }
  };

  const getTopPosition = () => {
    const { bottom } = anchorEl.getBoundingClientRect();
    return bottom + 12;
  };

  return createPortal(
    <div
      className="tooltip"
      style={{
        left: getLeftPosition(),
        top: getTopPosition(),
      }}
      ref={ref}
    >
      {title}
    </div>,
    document.getElementById("root")
  );
}

export default withSharedState(Tooltip);
