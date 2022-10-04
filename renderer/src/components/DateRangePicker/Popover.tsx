import { useRef } from "react";
import { FocusScope } from "react-aria";
import { useDialog } from "react-aria";
import { useOverlay, useModal, DismissButton } from "react-aria";
import { mergeProps } from "react-aria";

export function Popover(props: any) {
  const ref: any = useRef();
  const { popoverRef = ref, isOpen, onClose, children, ...otherProps } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    popoverRef
  );

  const { modalProps } = useModal();
  const { dialogProps } = useDialog(otherProps, popoverRef);

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope contain restoreFocus>
      <div
        {...mergeProps(overlayProps, modalProps, dialogProps)}
        ref={popoverRef}
        className="absolute top-full z-10 mt-2 rounded-md border border-gray-300 bg-white p-8 shadow-lg"
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}
