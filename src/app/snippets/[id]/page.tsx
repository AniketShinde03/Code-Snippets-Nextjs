import React from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as actions from "@/actions"
const SnippetDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  if (!snippet) return <h1>Snippet not found</h1>;

  const deleteSnippetAction =actions.deleteSnippet.bind(null, id);
  return (
    <div className="flex flex-col gap-5"> 
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">{snippet.title}</h1>
        <div className="flex items-center gap-2">
          <Link href={`/snippets/${snippet.id}/edit`}><Button>Edit</Button></Link>
          <Button onClick={deleteSnippetAction} variant={"destructive"}>Delete</Button>
        </div>
      </div>
      <pre className="p-3 bg-gray-200 roumded border-gray-200">
        <code>
          {snippet.code}
        </code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
