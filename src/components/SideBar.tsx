"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  Avatar,
  User,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Switch,
  Tooltip,
  Select,
  SelectItem,
  DateRangePicker,
} from "@nextui-org/react";
import {
  languaje,
  countryOptions,
  categoryOptions,
  sortByOptions,
} from "@interface/config";
import { DateValue, parseDate } from "@internationalized/date";
import {useNotice} from "@context/NoticeContext";

export default function SideBar() {
  const {getNotices} = useNotice();
  const data = useSession();
  const [isSelected, setIsSelected] = React.useState(true);

  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  // Función para convertir una fecha de JavaScript a un DateValue
  const formatToDateValue = (date: Date): DateValue => {
    return parseDate(formatDate(date)); // Usa parseDate para crear un DateValue desde el string de la fecha
  };

  const formatDate = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [config, setConfig] = React.useState({
    selected: isSelected,
    q: "",
    from: formatDate(oneWeekAgo),
    to: formatDate(today),
    language: "es",
    sortBy: "publishedAt",
    country: "mx",
    category: "general",
  });

  const onSubmit = async () => {
    try {
      await getNotices(config);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between bg-neutral-900 px-4 py-4 shadow-xl">
      <div className="flex flex-col items-center">
        <h1 className="font-extrabold text-2xl">Niuko</h1>
        <span className="text-base text-neutral-500">Noticias</span>
      </div>

      <div className="w-1/2 flex justify-center items-center gap-2">
        <Tooltip
          showArrow
          placement="bottom"
          color="default"
          className="w-[300px] "
          content={
            <div className="flex flex-col gap-2">
              <div>
                <h4 className="text-lg font-bold">Todo</h4>
                <p className="text-neutral-400">
                  Busque entre millones de artículos de más de 150.000 fuentes
                  de noticias y blogs grandes y pequeños.
                  <br />
                  Este punto final se adapta al descubrimiento y análisis de
                  artículos.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold">Titulares</h4>
                <p className="text-neutral-400">
                  Este punto final proporciona titulares en vivo y de última
                  hora para un país, categoría específica en un país, fuente
                  única o fuentes múltiples. También puedes buscar con palabras
                  clave.
                  <br />
                  Los artículos se ordenan por la fecha más temprana de
                  publicación. Este punto final es ideal para recuperar
                  titulares para usarlos con tickers de noticias o similares.
                </p>
              </div>
            </div>
          }
        >
          <Switch
            isSelected={isSelected}
            onValueChange={setIsSelected}
            color="default"
          ></Switch>
        </Tooltip>
        <Popover className="w-[350px]">
          <PopoverTrigger>
            <Button isIconOnly color="default" variant="flat" className="dark">
              ⚙️
            </Button>
          </PopoverTrigger>
          <PopoverContent className="py-3">
            <div className="w-full flex flex-col gap-3">
              {/* sortBy */}
              <Select
                isDisabled={!isSelected}
                label="Ordenar Por"
                color="default"
                selectedKeys={[config.sortBy]}
                onSelectionChange={(value) =>
                  setConfig({
                    ...config,
                    sortBy: Array.from(value)[0] as string,
                  })
                }
              >
                {sortByOptions.map((sort) => (
                  <SelectItem key={sort.code}>{sort.name}</SelectItem>
                ))}
              </Select>
              {/* category */}
              <Select
                isDisabled={isSelected}
                label="Categoría"
                color="default"
                selectedKeys={[config.category]}
                onSelectionChange={(value) =>
                  setConfig({
                    ...config,
                    category: Array.from(value)[0] as string,
                  })
                }
              >
                {categoryOptions.map((category) => (
                  <SelectItem key={category.code}>{category.name}</SelectItem>
                ))}
              </Select>
              {/* languaje */}
              <Select
                isDisabled={!isSelected}
                label="Idioma"
                color="default"
                selectedKeys={[config.language]}
                onSelectionChange={(value) =>
                  setConfig({
                    ...config,
                    language: Array.from(value)[0] as string,
                  })
                }
              >
                {languaje.map((lang) => (
                  <SelectItem key={lang.code}>{lang.name}</SelectItem>
                ))}
              </Select>
              {/* date */}
              <DateRangePicker
                isDisabled={!isSelected}
                label="Rango de Fechas"
                color="default"
                value={{
                  start: formatToDateValue(new Date(config.from)), // Convierte a DateValue
                  end: formatToDateValue(new Date(config.to)), // Convierte a DateValue
                }}
                onChange={(value: { start: DateValue; end: DateValue }) => {
                  if (value.start && value.end) {
                    setConfig({
                      ...config,
                      from: formatDate(new Date(value.start.toString())), // Convierte a string nuevamente para el estado
                      to: formatDate(new Date(value.end.toString())),
                    });
                  }
                }}
              />
              {/* country */}
              <Select
                isDisabled={isSelected}
                label="País"
                color="default"
                selectedKeys={[config.country]}
                onSelectionChange={(value) =>
                  setConfig({
                    ...config,
                    country: Array.from(value)[0] as string,
                  })
                }
              >
                {countryOptions.map((country) => (
                  <SelectItem
                    key={country.code}
                    startContent={
                      <Avatar
                        alt={country.name}
                        className="w-6 h-6"
                        src={country.image}
                      />
                    }
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </PopoverContent>
        </Popover>
        <Input
          className=""
          label={isSelected ? "Todo" : "Titulares"}
          placeholder="Escribe palabras clave..."
          endContent={<span>🔍</span>}
          isClearable
          value={config.q}
          onValueChange={(value) => setConfig({ ...config, q: value })}
        />
        <Button isIconOnly onClick={() => onSubmit()}>
          <span>🔍</span>
        </Button>
      </div>

      <Popover showArrow placement="bottom">
        <PopoverTrigger>
          <User
            as="button"
            name={data.data?.user?.name}
            description={data.data?.user?.email}
            className="transition-transform"
            avatarProps={{
              src: data.data?.user?.image || "",
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-full py-2">
          <Button endContent={<span>🚪</span>} variant="light">
            Cerrar Sesión
          </Button>
        </PopoverContent>
      </Popover>
    </nav>
  );
}