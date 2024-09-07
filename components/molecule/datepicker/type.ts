import { DateRange, Matcher } from "react-day-picker";

export type DatePickerProps = {
    date: Date;
    setDate: (date: Date | undefined) => void;
    disabled? : Matcher;
}