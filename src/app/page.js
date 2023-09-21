"use client";

import { useRouter } from "next/navigation";
import { BASE_URL } from "../../constants/constants";

export default function Home() {
  const { push } = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-between items-center gap-8">
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
        <div
          onClick={() => push("/role-base-api-access")}
          className="bg-zinc-200 px-4 py-2 rounded-md text-2xl font-medium cursor-pointer hover:bg-zinc-300 transition-all"
        >
          Role-base API access
        </div>
        <a href={`${BASE_URL}googleLogin/login`}>
          <div className="bg-blue-500 px-4 py-2 rounded-md text-2xl text-white font-medium cursor-pointer hover:bg-blue-600 transition-all">
            Sign in with Google
          </div>
        </a>
        <a href={`${BASE_URL}githubLogin/login`}>
          <div className="bg-black px-4 py-2 rounded-md text-2xl text-white font-medium cursor-pointer hover:bg-gray-900 transition-all">
            Sign in with Github
          </div>
        </a>
      </div>
    </main>
  );
}
