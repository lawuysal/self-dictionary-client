import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PropertyEditingDialog({
  property,
}: {
  property: { name: string; value: string };
}) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Note Property</DialogTitle>
          <DialogDescription>
            Change the property name and value
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
