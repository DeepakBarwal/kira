"use client";
import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getUsers } from "@/app/actions/users";
import { User } from "@prisma/client";
import { createTicket } from "@/app/actions/board";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface CreateTicketFields {
  title: string;
  assignee: string;
  description: string;
  points: number;
}

const schema = z.object({
  title: z.string().min(5),
  assignee: z.string(),
  description: z.string().optional(),
  points: z.number().optional(),
});

const NavCreate = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const path = usePathname();
  const boardId = path.split("/")[2];
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateTicketFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      points: 0,
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRes = await getUsers();
      setUsers(usersRes);
    };
    fetchUsers();
  }, []);

  const handleOpen = () => setOpen(!open);

  const onSubmit: SubmitHandler<CreateTicketFields> = async (data) => {
    await createTicket({
      title: data.title,
      description: data.description,
      boardId,
      storyPoints: data.points,
      assignedTo: data.assignee,
      reportedBy: session?.user.id,
    });
    setOpen(false);
  };

  return (
    <>
      <button
        className="button-create text-black p-2 border rounded font-semibold border-none"
        onClick={handleOpen}
      >
        Create
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder="Create Ticket"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        dismiss={{ enabled: false }}
      >
        <DialogHeader
          placeholder="Create Ticket"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create a Ticket
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody
            placeholder="Create Ticket"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h4"
              color="blue-gray"
              placeholder="Enter Ticket Title"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Enter Ticket Title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Enter Ticket Title"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  {...field}
                />
              )}
            />
            <Typography
              variant="h6"
              placeholder="Enter Ticket Description"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="mt-3 text-red-600"
            >
              {errors.title?.message}
            </Typography>

            <Typography
              variant="h4"
              color="blue-gray"
              placeholder="Assignee"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="mt-3 mb-1.5"
            >
              Assignee
            </Typography>
            <Controller
              name="assignee"
              control={control}
              render={({ field }) => (
                <Select
                  label="Select Assignee"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  {...field}
                >
                  {users.map((user: User, index: number) => {
                    return (
                      <Option value={user.id} key={index}>
                        <div className="flex items-center gap-x-2">
                          {user.name}
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              )}
            />
            <Typography
              variant="h6"
              placeholder="Enter Ticket Description"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="mt-3 text-red-600"
            >
              {errors.assignee?.message}
            </Typography>

            <Typography
              variant="h4"
              color="blue-gray"
              placeholder="Enter Ticket Description"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="mt-3"
            >
              Enter Ticket Description
            </Typography>
            <input
              id="description"
              name="description"
              style={{ display: "none" }}
            />
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
              onInit={(_evt, editor) => (editorRef.current = editor)}
              onEditorChange={(newValue, editor) =>
                setValue("description", newValue)
              }
              initialValue=""
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "codesample",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | styles | bold italic underline strikethrough codesample | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <Typography
              variant="h6"
              placeholder="Enter Ticket Description"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="mt-3 text-red-600"
            >
              {errors.description?.message}
            </Typography>

            <Typography
              variant="h4"
              color="blue-gray"
              placeholder="Story Points"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="mt-3"
            >
              Story Points
            </Typography>
            <Input
              type="number"
              placeholder="Story Points"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              {...register("points", { valueAsNumber: true })}
            />
            <Typography
              variant="h6"
              placeholder="Enter Ticket Description"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="mt-3 text-red-600"
            >
              {errors.points?.message}
            </Typography>
          </DialogBody>
          <DialogFooter
            placeholder="Create Ticket"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
              placeholder="Create Ticket"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              variant="gradient"
              color="green"
              // onClick={handleOpen}
              placeholder="Create Ticket"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export { NavCreate };
