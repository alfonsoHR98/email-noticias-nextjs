"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function Home() {
  const data = useSession();
  console.log(data);

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="w-full flex items-center justify-between bg-neutral-900 px-4 py-4">
        <div className="flex gap-2 text-xl">
          <h1 className="font-extrabold">Niuko</h1>
          <span>Noticias</span>
        </div>

        <div className="w-1/2 flex justify-center items-center gap-2">
          <Input
            className="dark"
            label="Buscar"
            placeholder="Escribe palabras clave..."
            endContent={<span>🔍</span>}
          />
          <Button
            isIconOnly
            color="default"
            variant="flat"
            className="dark"
          >
            ⚙️
          </Button>
        </div>

        <Popover showArrow placement="bottom" className="dark">
          <PopoverTrigger>
            <User
              as="button"
              name="Zoe Lang"
              description="Product Designer"
              className="transition-transform"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <Button
              endContent={<span>🚪</span>}
              color="danger"
              variant="light"
            >Cerrar Sesión</Button>
          </PopoverContent>
        </Popover>
      </nav>

      <main className="w-full h-full flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </main>
    </div>
  );
}
