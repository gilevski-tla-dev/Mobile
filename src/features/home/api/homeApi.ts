import { fetchData } from "@/shared/utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchCards = async ({ pageParam = 1 }) => {
  const limit = 10;
  const response = await fetchData(`cards?page=${pageParam}&limit=${limit}`);
  return response; 
};

export const useCards = () => {
  return useInfiniteQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Если количество карточек меньше 10, значит, это последняя страница
      if (lastPage.length < 10) {
        return undefined; // Остановить загрузку
      }
      // Иначе загрузить следующую страницу
      return allPages.length + 1;
    },
  });
};
