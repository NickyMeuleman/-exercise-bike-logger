// this folder is based on https://codesandbox.io/s/reverent-faraday-5nwk87
// well, "based on", it's a straight copy when I write this comment. Thanks Devon!
import { useRef } from "react";
import { useDateRangePickerState } from "@react-stately/datepicker";
import { useDateRangePicker, OverlayContainer } from "react-aria";
import { FieldButton } from "./Button";
import { RangeCalendar } from "./RangeCalendar";
import { DateField } from "./DateField";
import { Popover } from "./Popover";
import {
  BackspaceIcon,
  CalendarIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";

export function DateRangePicker(props: any) {
  const state = useDateRangePickerState(props);
  const ref: any = useRef();
  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col gap-0.5 text-left font-mono">
      <span {...labelProps} className="font-sans text-sm text-slate-100">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="group flex">
        <div className="relative flex rounded-l-md border border-gray-300 bg-white p-1 pr-10 transition-colors group-focus-within:border-sky-600 group-hover:border-gray-400 group-focus-within:group-hover:border-sky-600">
          <DateField {...startFieldProps} />
          <span aria-hidden="true" className="px-2 text-slate-600">
            tot
          </span>
          <DateField {...endFieldProps} />
          {state.validationState === "invalid" ? (
            <ExclamationIcon className="absolute right-1 h-6 w-6 text-red-500" />
          ) : (
            (state.value.start || state.value.end) && (
              <BackspaceIcon
                className="absolute right-1 h-6 w-6 text-slate-400"
                onClick={() => {
                  props.clear();
                }}
              />
            )
          )}
        </div>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <CalendarIcon className="h-5 w-5 text-gray-700 group-focus-within:text-sky-700" />
        </FieldButton>
      </div>
      {state.isOpen && (
        <Popover
          {...dialogProps}
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
        >
          <RangeCalendar {...calendarProps} />
        </Popover>
      )}
    </div>
  );
}
