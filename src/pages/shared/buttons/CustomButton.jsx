import React from 'react';
import styled from 'styled-components';

// এখানে props হিসেবে text, onClick, type ইত্যাদি নেওয়া হচ্ছে
const CustomButton = ({ text, onClick, type = "button", className }) => {
  return (
    <StyledWrapper >
      <button type={type} onClick={onClick} className={`button ${className}`}>
        <span className="button-content">{text}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    overflow: hidden;
    height: 3rem;
    padding: 0 2rem;
    border-radius: 1.5rem;
    // background: #3d3a4e;
  background: oklch(62% 0.20 10);
    background-size: 400%;
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
  }

  .button:hover::before {
    transform: scaleX(1);
  }

  .button-content {
    position: relative;
    z-index: 1;
    font-weight: 600;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      82.3deg,
      rgba(150, 93, 233, 1) 10.8%,
      rgba(99, 88, 238, 1) 94.3%
    );
    transition: all 0.475s;
  }
`;

export default CustomButton;