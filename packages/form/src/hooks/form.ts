import { createFormHook } from '@tanstack/react-form';

import {
  Select,
  SubscribeButton,
  TextArea,
  TextField,
} from '@workspace/form/components/form-components';
import { fieldContext, formContext } from '@workspace/form/hooks/form-context';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
