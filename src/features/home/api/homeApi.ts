import { fetchData, deleteData, postData, updateData } from "@/shared/utils/api";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

// Функция для получения карточек
const fetchCards = async ({ pageParam = 1 }) => {
  const limit = 10;
  const response = await fetchData(
    `cards?page=${pageParam}&limit=${limit}`,
    true
  );
  return response;
};

// Хук для получения карточек
export const useCards = () => {
  return useInfiniteQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined; // Остановить загрузку
      }
      return allPages.length + 1;
    },
  });
};

// Функция для удаления карточки
const deleteCard = async (cardId: string) => {
  const response = await deleteData(`cards/${cardId}`, true); // Используем второй экземпляр
  return response;
};

// Хук для удаления карточки
export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      // После успешного удаления инвалидируем кэш, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};

const createCard = async (name: string) => {
  const response = await postData("cards", { name }, undefined, true); // Используем второй экземпляр
  return response;
};

// Хук для создания карточки
export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      // После успешного создания карточки инвалидируем кэш, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};

// Функция для обновления карточки
const updateCard = async ({ id, name }: { id: string; name: string }) => {
  const response = await updateData(`cards/${id}`, { name }, true); // Используем второй экземпляр
  return response;
};

// Хук для обновления карточки
export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      // После успешного обновления инвалидируем кэш, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
