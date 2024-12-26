import React from "react";
import styled from "styled-components";

const AddToCartBtn = React.forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <StyledWrapper ref={ref} {...props}>
      <span className="button">
        <span>Add to cart</span>
        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeWidth={0} id="SVGRepo_bgCarrier" />
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            id="SVGRepo_tracerCarrier"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <defs></defs>{" "}
            <g id="cart">
              {" "}
              <circle r="1.91" cy="20.59" cx="10.07" className="cls-1" />{" "}
              <circle r="1.91" cy="20.59" cx="18.66" className="cls-1" />{" "}
              <path
                d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"
                className="cls-1"
              />{" "}
              <polyline
                points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"
                className="cls-1"
              />{" "}
            </g>{" "}
          </g>
        </svg>
      </span>
    </StyledWrapper>
  );
});
AddToCartBtn.displayName = "AddToCartBtn";
const StyledWrapper = styled.button`
  .button {
    height: 60px;
    width: 200px;
    background-color: #132233;
    border: 2px solid rgb(182, 128, 128);
    color: #eee;
    transition: 0.3s;
    font-size: 15px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 20px; */
    overflow: hidden;
  }

  .button span {
    transform: translateX(10px);
    transition: 0.3s;
  }

  .button svg {
    transform: translateX(-300px);
    transition: 0.3s;
    z-index: 3;
    height: 20px;
  }

  .button:hover {
    width: 60px;
  }

  .button:hover svg {
    transform: translateX(-5px);
  }

  .button:hover span {
    transform: translateY(70px);
    font-size: 0.1rem;
  }
`;

export default AddToCartBtn;
