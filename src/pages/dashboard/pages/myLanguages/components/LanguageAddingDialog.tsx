import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
};

export default function LanguageAddingDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus className="mr-2 size-4" /> Add New
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add a new language to learn</DialogTitle>
          <DialogDescription>
            "To know one language is to be one person; to know two is to be
            two."
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="mt-10 flex flex-col gap-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                placeholder="e.g. English"
                type="text"
                id="name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 25,
                })}
              />
              {errors.name && (
                <span className="text-xs text-destructive">
                  "Name is required and must be between 2-25 chars."
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description:</Label>
              <Input
                type="text"
                id="description"
                {...register("description", {
                  required: true,
                  minLength: 5,
                  maxLength: 100,
                })}
              />
              {errors.description && (
                <span className="text-xs text-destructive">
                  "Description is required and must be between 5-100 chars."
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse gap-3">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
