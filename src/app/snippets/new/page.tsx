import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
// Server Action
async function createSnippet(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title || !code) throw new Error("Title and code are required");

  const snippet =await prisma.snippet.create({
    data: { title, code },
  });

  console.log(snippet);

  redirect("/");
}

const CreateSnippetPage = () => {
  return (
    <form action={createSnippet} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" id="title" required />
      </div>
      <div>
        <Label htmlFor="code">Code</Label>
        <Textarea name="code" id="code" required />
      </div>
      <Button type="submit" className="my-4">
        New
      </Button>
    </form>
  );
};

export default CreateSnippetPage;
