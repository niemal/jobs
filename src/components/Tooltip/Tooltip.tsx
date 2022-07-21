import styled from "styled-components";
import { cloneElement, useMemo, useState } from "react";
import {
  Placement,
  offset,
  // flip,
  autoPlacement,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from "@floating-ui/react-dom-interactions";
import { useTransition, animated } from "react-spring";
import { mergeRefs } from "react-merge-refs";
import { QUERIES } from "../constants";

interface Props {
  label: string;
  placement?: Placement;
  origin: "index" | "search";
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
    text-align: center;
    max-width: 350px;
    padding: 8px;
    margin-top: ${(p) => (p.origin === "index" ? "-24px" : "0px")};
    margin-left: ${(p) => (p.origin === "index" ? "-32px" : "24px")};
    filter: drop-shadow(1px 2px 3px var(--color-gray-800));
  }

  @media ${QUERIES.tabletAndSmaller} {
    & > div {
      margin-top: ${(p) => (p.origin === "index" ? "-24px" : "-220px")};
      margin-left: ${(p) => (p.origin === "index" ? "-32px" : "-290px")};
    }
  }
`;

export default function Tooltip({
  children,
  label,
  placement = "top",
  origin = "index",
}: Props) {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    // strategy: "fixed",
    onOpenChange: setOpen,
    middleware: [offset(16), autoPlacement(), shift({ padding: 8 })],
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
        <Wrapper
          origin={origin}
          style={{
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
          {transition((props, isOpen) => (
            <animated.div
              style={{
                ...props,
              }}
            >
              {label}
            </animated.div>
          ))}
        </Wrapper>
      )}
    </>
  );
}
