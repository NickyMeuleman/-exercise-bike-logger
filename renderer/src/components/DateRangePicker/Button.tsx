import { useRef } from "react";
import { useButton } from "react-aria";
import { useFocusRing } from "react-aria";
import { mergeProps } from "react-aria";

export function CalendarButton(props: any) {
  let ref: any = useRef();
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`p-2 rounded-full ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-sky-100 active:bg-sky-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-offset-2 ring-sky-600" : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export function FieldButton(props: any) {
  let ref: any = useRef();
  let { buttonProps, isPressed } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`px-2 -ml-px border transition-colors rounded-r-md group-focus-within:border-sky-600 group-focus-within:group-hover:border-sky-600 outline-none ${
        isPressed || props.isPressed
          ? "bg-gray-200 border-gray-400"
          : "bg-gray-50 border-gray-300 group-hover:border-gray-400"
      }`}
    >
      {props.children}
    </button>
  );
}
