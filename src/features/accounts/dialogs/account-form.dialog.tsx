import FormDialog from "@/components/dialogs/form-dialog";
import RHFTextField from "@/components/forms/rhf-input";
import { AccountFormPayload } from "@/services/accounts/accounts.type";
import { createAccountSchema } from "@/services/accounts/accounts.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalType } from "../controllers/account.controller";

interface AccountFormProps {
  type: ModalType;
  onClose: () => void;
}

export type AccountFormRef = {
  handleChangeAccountId: (id: number | null) => void;
};

const defaultValues = {
  name: "",
  email: "",
};

const AccountFormDialog = forwardRef(
  ({ type, onClose }: AccountFormProps, ref) => {
    const methods = useForm({
      defaultValues,
      resolver: zodResolver(createAccountSchema),
    });

    const [accountId, setAccountId] = useState<number | null>(null);

    useImperativeHandle(ref, () => ({
      handleChangeAccountId: (id: number | null) => {
        setAccountId(id);
      },
    }));

    useEffect(() => {
      if (type === "update" && accountId) {
        methods.reset({ name: `Account ${accountId}` });
      }

      return () => {
        methods.reset(defaultValues);
      };
    }, [type, accountId, methods]);

    const handleSubmit = (data: AccountFormPayload) => {
      if (type === "create") {
        console.log("Creating account with data:", data);
        // Call the create account API here
      } else if (type === "update") {
        console.log("Editing account with ID:", accountId, "and data:", data);
        // Call the edit account API here
      }
    };

    return (
      <FormDialog
        open={!!type}
        onClose={onClose}
        formMethods={methods}
        onSubmit={handleSubmit}
        title={type === "create" ? "Create Account" : "Edit Account"}
      >
        <div className="flex flex-col gap-4 mt-4">
          <RHFTextField
            name="name"
            label="Account Name"
            placeholder="Enter account name"
            required
            autoFocus
          />

          <RHFTextField
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            required
          />
        </div>
      </FormDialog>
    );
  }
);

AccountFormDialog.displayName = "AccountFormDialog";

export default AccountFormDialog;
