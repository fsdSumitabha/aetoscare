"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type NavDisclosureProps = {
  label: string;
  /** id of the panel element rendered in `children` (for aria-controls). */
  panelId: string;
  /** The section's own link, rendered beside the toggle button. */
  trigger: ReactNode;
  /** Chevron for the toggle button (server-rendered). */
  icon: ReactNode;
  /** The dropdown panel; server-rendered, so its links are always in the HTML. */
  children: ReactNode;
};

const CLOSE_DELAY_MS = 120;

/**
 * Small client island for a desktop nav dropdown. Opens on mouse hover or via
 * the chevron toggle (aria-expanded); closes on Esc (WCAG 1.4.13), when focus
 * or the pointer leaves, and after any link inside is clicked. While closed the
 * panel is visibility:hidden, so keyboard users never tab through it.
 */
export function NavDisclosure({ label, panelId, trigger, icon, children }: NavDisclosureProps) {
  const [open, setOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  /** Set when hover opened the panel, so the first click on the toggle keeps it open. */
  const openedByHover = useRef(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      if (itemRef.current?.contains(document.activeElement)) buttonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function showOnHover() {
    clearTimeout(closeTimer.current);
    if (!open) openedByHover.current = true;
    setOpen(true);
  }

  function hideSoon() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      openedByHover.current = false;
      setOpen(false);
    }, CLOSE_DELAY_MS);
  }

  function toggle() {
    if (openedByHover.current) {
      openedByHover.current = false;
      setOpen(true);
      return;
    }
    setOpen((value) => !value);
  }

  return (
    <li
      ref={itemRef}
      data-open={open ? "" : undefined}
      className="group/item relative flex h-11 items-center rounded-full text-care-900/75 transition-colors duration-200 hover:bg-care-900/5 hover:text-care-950 data-open:bg-care-900/5 data-open:text-care-950"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") showOnHover();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") hideSoon();
      }}
      onBlur={(event) => {
        if (!itemRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onClick={(event) => {
        if ((event.target as Element).closest("a")) setOpen(false);
      }}
    >
      {trigger}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${label} menu`}
        onClick={toggle}
        className="grid h-11 w-8 place-items-center rounded-full pr-1.5"
      >
        {icon}
      </button>
      {children}
    </li>
  );
}
