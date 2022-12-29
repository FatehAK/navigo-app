import { css } from '@linaria/core';

export const openBtn = css`
  cursor: pointer;
  position: fixed;
  z-index: 5;
  top: 47%;
  padding: 12px 9px;
  color: #fff;
  background: var(--secondary-color);
  border: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 5px 11px -2px rgb(0 0 0 / 18%), 0 4px 12px -7px rgb(0 0 0 / 15%);
  transition: background 0.3s;

  & > i {
    padding: 0 5px 0 0;
    font-size: 1rem;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: #4b4964;
  }
`;

export const sidebarContentContainer = css`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  overflow: hidden;
  display: none;
  width: 100%;
  max-width: 300px;
  height: 100vh;
  padding: 20px 0;
  background: #fff;
  box-shadow: 0 5px 11px -2px rgb(0 0 0 / 18%), 0 4px 12px -7px rgb(0 0 0 / 15%);
`;

export const sidebarContent = css`
  overflow: auto;
  height: calc(100vh - 70px);
  margin-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
  font-size: 0.85rem;
  letter-spacing: 0.3px;
`;

export const closeBtnWrapper = css`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

export const closeBtn = css`
  cursor: pointer;
  padding: 0 10px;
  background: none;
  border: none;
  transition: color 0.3s;

  &:focus {
    outline: none;
  }

  & > i {
    font-size: 1.4rem;
    color: #e92d53;
  }

  & > i:hover {
    color: #fa4f72;
  }
`;

export const routeInfo = css`
  text-align: center;
`;
