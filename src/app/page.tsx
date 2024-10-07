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
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { div } from "framer-motion/client";

export default function Home() {
  const data = useSession();
  console.log(data);
  const [isSelected, setIsSelected] = React.useState(true);
  const [config, setConfig] = React.useState({
    from: "",
    to: "",
    languaje: "",
    order: "",
  });

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="w-full flex items-center justify-between bg-neutral-900 px-4 py-4 shadow-lg">
        <div className="flex gap-2 text-xl">
          <h1 className="font-extrabold">Niuko</h1>
          <span>Noticias</span>
        </div>

        <div className="w-1/2 flex justify-center items-center gap-2">
          <Tooltip
            showArrow
            placement="bottom"
            color="default"
            className="dark w-[300px] "
            content={
              <div className="flex flex-col gap-2">
                <div>
                  <h4 className="text-lg font-bold">Todo</h4>
                  <p className="text-neutral-400">
                    Busque entre millones de artículos de más de 150.000 fuentes
                    de noticias y blogs grandes y pequeños. Este punto final se
                    adapta al descubrimiento y análisis de artículos.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Titulares</h4>
                  <p className="text-neutral-400">
                    Este punto final proporciona titulares en vivo y de última
                    hora para un país, categoría específica en un país, fuente
                    única o fuentes múltiples. También puedes buscar con
                    palabras clave. Los artículos se ordenan por la fecha más
                    temprana de publicación. Este punto final es ideal para
                    recuperar titulares para usarlos con tickers de noticias o
                    similares.
                  </p>
                </div>
              </div>
            }
          >
            <Switch
              isSelected={isSelected}
              onValueChange={setIsSelected}
              className="dark"
              color="default"
            ></Switch>
          </Tooltip>
          <Input
            className="dark"
            label={isSelected ? "Todo" : "Titulares"}
            placeholder="Escribe palabras clave..."
            endContent={<span>🔍</span>}
          />
          <Button isIconOnly color="default" variant="flat" className="dark">
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
            <Button endContent={<span>🚪</span>} color="danger" variant="light">
              Cerrar Sesión
            </Button>
          </PopoverContent>
        </Popover>
      </nav>

      <main className="w-full h-full flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </main>
    </div>
  );
}
