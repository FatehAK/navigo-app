import { css } from '@linaria/core';
import { breakpoints } from 'theme/breakpoints';

export const searchPage = css`
  height: 100vh;
`;

export const mapContainer = css`
  height: 100vh;
`;

export const searchContainer = css`
  position: fixed;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px 100px;

  @media (max-width: ${breakpoints.desktop}) {
    padding-right: 80px;
    padding-left: 80px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 60px;
    padding-left: 60px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
  }
`;

export const goBackBtn = css`
  height: 36px;
  padding: 6px 12px;
  color: #fff;
  text-decoration: none;
  background: var(--primary-color);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  transition: background 0.3s;

  &:hover {
    background: var(--secondary-color);
  }
`;

export const searchInputStyle = css`
  flex: 1 1 0;
  height: 36px;
  padding: 0 15px;
  font-size: 0.9rem;
  color: var(--secondary-color);
  border: none;
  border-radius: 0;
  outline: none;
  box-shadow: 10px 5px 20px rgb(0 0 0 / 19%), 0 0 0 rgb(0 0 0 / 23%);
`;

export const searchBtn = css`
  cursor: pointer;
  height: 36px;
  padding: 0 12px;
  font-size: 0.9rem;
  color: var(--secondary-color);
  background: #fff;
  border: 0;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }

  &:focus {
    outline: none;
  }
`;
