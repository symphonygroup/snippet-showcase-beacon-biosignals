import { Box } from "@chakra-ui/react";

import { Button, ButtonProps } from "./Button";

export type ActionButtonGroupProps = {
  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;
};

export const ActionButtonGroup = ({
  primaryAction,
  secondaryAction,
}: ActionButtonGroupProps) => {
  return primaryAction || secondaryAction ? (
    <Box display="flex" gap={3} p={4} pt={0} marginTop={-1}>
      {secondaryAction ? (
        <Button width="50%" variant="outline" {...secondaryAction}>
          {secondaryAction.value}
        </Button>
      ) : null}
      {primaryAction ? (
        <Button width="50%" colorScheme="primary" {...primaryAction}>
          {primaryAction.value}
        </Button>
      ) : null}
    </Box>
  ) : null;
};
