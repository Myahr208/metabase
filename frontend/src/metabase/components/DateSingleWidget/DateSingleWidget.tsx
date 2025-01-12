// eslint-disable-next-line no-restricted-imports -- deprecated usage
import moment from "moment-timezone";
import { DateAllOptionsWidget } from "metabase/components/DateAllOptionsWidget";

interface DateSingleWidgetProps {
  setValue: (value: string | null) => void;
  value?: string;
  onClose: () => void;
}

export const DateSingleWidget = ({
  value,
  ...props
}: DateSingleWidgetProps) => {
  const initialValue = value == null ? moment().format("YYYY-MM-DD") : value;

  return (
    <DateAllOptionsWidget
      {...props}
      value={value}
      initialValue={initialValue}
      disableOperatorSelection
    />
  );
};
