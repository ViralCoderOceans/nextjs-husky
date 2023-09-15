"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-between items-center gap-x-8">
        <div
          onClick={() => push("/crud")}
          className="bg-zinc-200 px-4 py-2 rounded-md text-2xl font-medium cursor-pointer hover:bg-zinc-300 transition-all"
        >
          User - CRUD
        </div>
        <div
          onClick={() => push("/upload-images")}
          className="bg-zinc-200 px-4 py-2 rounded-md text-2xl font-medium cursor-pointer hover:bg-zinc-300 transition-all"
        >
          File - Upload/Download
        </div>
        <div
          onClick={() => push("/graph-ql")}
          className="bg-zinc-200 px-4 py-2 rounded-md text-2xl font-medium cursor-pointer hover:bg-zinc-300 transition-all"
        >
          GraphQL
        </div>
        <div
          onClick={() => push("/graphql-to-rest-api")}
          className="bg-zinc-200 px-4 py-2 rounded-md text-2xl font-medium cursor-pointer hover:bg-zinc-300 transition-all"
        >
          GraphQL To Rest API
        </div>
      </div>
    </main>
  );
}
