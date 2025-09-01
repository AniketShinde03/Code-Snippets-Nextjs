// src/app/snippets/[id]/edit/page.tsx
import EditSnippetForm from "@/components/EditSnippetForm";
import { prisma } from "@/lib/prisma";

const EditPageSnippet = async ({ params }: { params: { id: string } }) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {id}
  });

  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  return <EditSnippetForm snippet={snippet} />;
};

export default EditPageSnippet;
