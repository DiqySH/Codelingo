import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminSchema } from "@/schemas";
import { AdminFormInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { FieldError } from "./ui/field";
import { useEffect, useState } from "react";
import { createAdmin } from "@/hooks/database/mongo";
import { useAdminsContext } from "./provider/AdminsProvider";

export const AddAdminForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminFormInputs>({
    resolver: zodResolver(adminSchema),
  });

  const { reFetch, setReFetch } = useAdminsContext();

  const handleAddAdmin = async (data: AdminFormInputs) => {
    setIsOpen(true);
    setIsLoading(true);
    try {
      const { email } = data;
      await createAdmin(import.meta.env.VITE_MONGO_ADMINS, { email });
    } catch (err) {
      console.error(err);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
      setReFetch(!reFetch);
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <Dialog onOpenChange={setIsOpen} open={isLoading ? true : isOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add email</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleAddAdmin)}
          className="flex flex-col gap-2"
        >
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
