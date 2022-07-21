// import ReactTooltip from "react-tooltip";
import styled from "styled-components";

// const Wrapper = styled.div`
//   & > div {
//     font-family: var(--font-primary);
//     color: var(--color-tertiary);
//     font-size: ${28 / 16}rem;
//     background-color: var(--color-secondary);
//     border: 5px solid var(--color-primary);
//     border-bottom: 0;
//     border-top: 0;
//     width: max-content;
//     max-width: 70ch;
//   }
// `;

// function Tooltip({ place }) {
//   return (
//     <Wrapper>
//       <ReactTooltip effect={`solid`} place={place} arrowColor={`#05668D`} />
//     </Wrapper>
//   );
// }

// export default Tooltip;
import { cloneElement, useMemo, useState } from "react";
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from "@floating-ui/react-dom-interactions";
// import { motion, AnimatePresence } from "framer-motion";
import { useTransition, animated } from "react-spring";
import { mergeRefs } from "react-merge-refs";

interface Props {
  label: string;
  placement?: Placement;
  children: JSX.Element;
}

const Wrapper = styled.div`
  height: 0;
  max-width: 0;
  z-index: 4;

  & > div {
    font-family: var(--font-primary);
    color: var(--color-tertiary);
    font-size: ${28 / 16}rem;
    background-color: var(--color-secondary);
    border: 5px solid var(--color-primary);
    border-radius: 8px;
    width: max-content;
    max-width: 70ch;
    padding: 8px;
  }
`;

export default function Tooltip({
  children,
  label,
  placement = "bottom",
}: Props) {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 20 }),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);

  // Preserve the consumer's ref
  const ref = useMemo(
    () => mergeRefs([reference, (children as any).ref]),
    [reference, children]
  );

  const transition = useTransition(open, {
    from: { opacity: 0, transform: "scaleX(-1)" },
    enter: { opacity: 1, transform: "scaleX(1)" },
  });

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <Wrapper>
          {transition((props, isOpen) => (
            <animated.div
              style={{
                ...props,
                ...getFloatingProps({
                  ref: floating,
                  className: "Tooltip",
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                }),
              }}
            >
              {label}
            </animated.div>
          ))}
        </Wrapper>
      )}
      {/* <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            {...getFloatingProps({
              ref: floating,
              className: "Tooltip",
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              },
            })}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}