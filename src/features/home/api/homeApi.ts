import { fetchData } from "@/shared/utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchCards = async () => {
  return await fetchData("cards");
};

export const useCards = () => {
  return useQuery({
    queryKey: ["cards"], // Массив с ключом запроса
    queryFn: fetchCards, // Функция для получения данных
  });
};
