import { css } from '@linaria/core';
import { breakpoints } from 'theme/breakpoints';
import heroImage from 'assets/images/hero.png';
import arrowSvg from 'assets/images/arrow.svg';

export const landingPage = css`
  height: 100vh;
  background-image: url(${heroImage});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right;
  background-size: contain;
`;

export const headerWrapper = css`
  display: flex;
  justify-content: center;
`;

export const header = css`
  padding: 8px 35px;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.1rem;
  background-color: #3d3b50;
  border-bottom-right-radius: 55px;
  border-bottom-left-radius: 55px;
  box-shadow: 10px 5px 20px rgb(0 0 0 / 19%), 0 1px 5px rgb(0 0 0 / 23%);

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1.9rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.6rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

export const heroContent = css`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 55px;

  @media (max-width: ${breakpoints.desktop}) {
    margin-top: 65px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 60px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 40px;
    margin-left: 20px;
  }
`;

export const heroContentMain = css`
  max-width: 500px;
  font-family: Pacifico, cursive;
  font-size: 3.6rem;
  font-weight: 700;
  color: var(--secondary-color);
  letter-spacing: 0.2rem;

  & > i {
    margin-left: 12px;
    color: var(--primary-color);
  }

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 3.4rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 300px;
    font-size: 2.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.4rem;
  }
`;

export const heroContentSub = css`
  margin-top: 20px;
  margin-left: 50px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 10px;
    margin-left: 30px;
  }
`;

export const heroContentSubImg = css`
  width: 40px;
  height: 40px;
  background: url(${arrowSvg});
`;

export const heroContentSubInfo = css`
  position: relative;
  top: -10px;
  margin-left: 60px;
  padding: 10px;
  font-family: Lato, sans-serif;
  font-size: 1.12rem;
  font-weight: bold;
  font-stretch: expanded;
  color: #fff;
  letter-spacing: 0.16rem;
  background-color: var(--secondary-color);
  background-image: linear-gradient(to top, #333146, #36344a, #39374d, #3c3a51, #3f3d55);
  border-radius: 5px;
  box-shadow: 10px 5px 20px rgb(0 0 0 / 19%), 0 1px 5px rgb(0 0 0 / 23%);

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1.15rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 9px;
    font-size: 0.76rem;
  }
`;

export const addressWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 640px;
  margin-top: 100px;
  padding: 0 44px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 50px;
    padding: 0 20px;
  }
`;

export const addressInput = css`
  flex: 1 1 0;
  height: 36px;
  padding-right: 15px;
  padding-left: 15px;
  font-size: 0.96rem;
  color: var(--secondary-color);
  background: #fff;
  border: none;
  border-radius: 10px 0 0 10px;
  outline: none;
  box-shadow: 15px 5px 20px rgb(0 0 0 / 19%), 20px 15px 20px rgb(0 0 0 / 15%);
`;

export const locationBtn = css`
  cursor: pointer;
  height: 36px;
  padding-right: 16px;
  font-size: 1.24rem;
  color: var(--primary-color);
  background-color: #fff;
  border: 0;
  transition: color 0.3s;

  &:hover {
    color: var(--secondary-color);
  }

  &:focus {
    outline: none;
  }
`;

export const geocodeBtn = css`
  cursor: pointer;
  height: 36px;
  padding-right: 12px;
  padding-left: 12px;
  font-size: 0.96rem;
  color: #fff;
  background: var(--primary-color);
  border: 0;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  transition: background 0.3s;

  &:hover {
    background: var(--secondary-color);
  }

  &:focus {
    outline: none;
  }
`;

export const footer = css`
  position: fixed;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: 100;

  & > i {
    margin: 0 5px;
    color: #f53f64;
  }

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 6px;
    font-size: 0.86rem;
  }
`;
