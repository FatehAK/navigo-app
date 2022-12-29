import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { cx } from '@linaria/core';
import { CSSTransition } from 'react-transition-group';
import { openBtn, closeBtnWrapper, closeBtn, sidebarContentContainer, sidebarContent, routeInfo } from './Sidebar.styles';

const Sidebar = forwardRef((_, ref) => {
  const [isOpen, setOpen] = useState(false);
  const animatedRef = useRef(null);
  const contentRef = useRef(null);

  const openSidebar = useCallback(() => {
    setOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setOpen(false);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open() {
        openSidebar();
      },
      close() {
        closeSidebar();
      },
      getContentRef() {
        return contentRef;
      },
    }),
    [openSidebar, closeSidebar]
  );

  return (
    <div>
      <button
        type="button"
        className={cx(openBtn, 'animate__animated', 'animate__slideInLeft', 'animate__faster')}
        title="Directions"
        onClick={openSidebar}
      >
        <i className="fas fa-directions" />
      </button>
      <CSSTransition
        nodeRef={animatedRef}
        in={isOpen}
        classNames={{
          enter: 'd-block',
          enterActive: 'animate__animated animate__slideInLeft animate__faster',
          exit: 'd-block',
          exitActive: 'animate__animated animate__slideOutLeft animate__faster',
        }}
        addEndListener={done => animatedRef.current.addEventListener('transitionend', done, false)}
      >
        <div ref={animatedRef} className={sidebarContentContainer}>
          <div className={closeBtnWrapper}>
            <button type="button" className={closeBtn} onClick={closeSidebar}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div ref={contentRef} className={sidebarContent}>
            <p className={routeInfo}>Select route to display directions</p>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
});

export default Sidebar;
