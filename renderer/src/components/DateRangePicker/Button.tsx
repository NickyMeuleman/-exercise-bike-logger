import { useRef } from "react";
import { useButton } from "react-aria";
import { useFocusRing } from "react-aria";
import { mergeProps } from "react-aria";

export function CalendarButton(props: any) {
  const ref: any = useRef();
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`rounded-full p-2 ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-sky-100 active:bg-sky-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-sky-600 ring-offset-2" : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export function FieldButton(props: any) {
  const ref: any = useRef();
  const { buttonProps, isPressed } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`-ml-px rounded-r-md border px-2 outline-none transition-colors group-focus-within:border-sky-600 group-focus-within:group-hover:border-sky-600 ${
        isPressed || props.isPressed
          ? "border-gray-400 bg-gray-200"
          : "border-gray-300 bg-gray-50 group-hover:border-gray-400"
      }`}
    >
      {props.children}
    </button>
  );
}
