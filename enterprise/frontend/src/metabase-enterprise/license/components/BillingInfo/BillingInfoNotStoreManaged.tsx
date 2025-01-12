import { t } from "ttag";
import { Text, Anchor } from "metabase/ui";
import { SectionHeader } from "metabase/admin/settings/components/SettingsLicense";

export const BillingInfoNotStoreManaged = () => {
  return (
    <>
      <SectionHeader>{t`Billing`}</SectionHeader>
      <Text color="text-medium">
        {t`To manage your billing preferences, please email `}
        <Anchor href="mailto:billing@metabase.com">billing@metabase.com</Anchor>
      </Text>
    </>
  );
};
