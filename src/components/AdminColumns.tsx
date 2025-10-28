/* eslint-disable react-hooks/rules-of-hooks */
import { ArrowUpDown, Trash } from "lucide-react";
import { AdminData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { useState } from "react";
import { deleteAdmin } from "@/hooks/database/mongo";
import { useAdminsContext } from "./AdminsProvider";

export const columns: ColumnDef<AdminData>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase ml-3">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "Action",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const admin = row.original;
      const { reFetch, setReFetch } = useAdminsContext();
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const handleDelete = async () => {
        setIsLoading(true);
        try {
          await deleteAdmin(import.meta.env.VITE_MONGO_ADMINS, admin._id);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
          setIsOpen(false);
          setReFetch(!reFetch);
        }
      };

      return (
        <Dialog open={isLoading ? true : isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>
              <Trash className="w-3.5! h-3.5!" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This email will permanently deleted
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading} onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
