import React from "react";
import { Link } from "@nextui-org/react";
import { Article } from "@interface/notice";

interface NewCardProps {
  elemento: Article;
}

function NewCard({ elemento }: NewCardProps) {
  return (
    <div className="bg-neutral-900 w-full rounded-lg flex gap-4 overflow-auto border-2 border-neutral-700">
      <img
        src={elemento.urlToImage}
        alt={elemento.title}
        className="w-[350px] object-cover "
      />
      <div className="flex-1 flex flex-col gap-2 p-2 justify-between">
        <div>
          <h2 className="text-lg font-bold">{elemento.title}</h2>
          <p className="text-base">{elemento.description}</p>
          <Link isExternal href={elemento.url} showAnchorIcon>
            Saber mas
          </Link>
        </div>

        <div className="flex justify-between">
          <p className="text-neutral-500">
            <span className="font-semibold">{elemento?.source?.name}</span> -{" "}
            {elemento.author}
          </p>
          <p className="text-neutral-500">
            {elemento.publishedAt.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
