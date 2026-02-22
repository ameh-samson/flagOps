import React, { useState, useRef, useEffect, type ReactNode } from "react";

type DropdownMenuChildren =
  | ReactNode
  | ((props: { closeMenu: () => void }) => ReactNode);

type DropdownMenuTrigger =
  | ReactNode
  | ((props: { isOpen: boolean }) => ReactNode);

interface DropdownMenuProps {
  trigger: DropdownMenuTrigger;
  children: DropdownMenuChildren;
  align?: "left" | "right";
  className?: string;
  autoClose?: boolean;
}

const Dropdown: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  align = "right",
  className,
  autoClose = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!autoClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [autoClose]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        {typeof trigger === "function" ? trigger({ isOpen }) : trigger}
      </div>

      <div
        className={`absolute mt-2 ${
          align === "right" ? "right-0" : "left-0"
        } bg-white border border-gray-200 rounded-md shadow-md min-w-40 z-50
        transition duration-200 transform origin-top ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } ${className}`}
      >
        {typeof children === "function" ? children({ closeMenu }) : children}
      </div>
    </div>
  );
};

export default Dropdown;
