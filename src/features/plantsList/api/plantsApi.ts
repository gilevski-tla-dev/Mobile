import {
  deleteData,
  fetchData,
  postData,
  updateData,
} from "@/shared/utils/api";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const fetchPlants = async ({ pageParam = 1 }) => {
  const limit = 10;
  const response = await fetchData(
    `/products?page=${pageParam}&limit=${limit}`,
    true
  );
  return response;
};

// Хук для получения растений
export const usePlants = () => {
  return useInfiniteQuery({
    queryKey: ["plants"],
    queryFn: fetchPlants,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined; // Остановить загрузку
      }
      return allPages.length + 1;
    },
  });
};

const createPlant = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const response = await postData(
    "products",
    { name, description },
    undefined,
    true
  );
  return response;
};

// Хук для создания карточки
export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlant,
    onSuccess: () => {
      // После успешного создания карточки инвалидируем кэш, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};

// Функция для удаления карточки
const deletePlant = async (plantId: string) => {
  const response = await deleteData(`products/${plantId}`, true); // Используем второй экземпляр
  return response;
};

// Хук для удаления карточки
export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlant,
    onSuccess: () => {
      // После успешного удаления инвалидируем кэш, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};

// Функция для обновления карточки
const updatePlant = async ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => {
  const response = await updateData(`products/${id}`, { description }, true); // Используем второй экземпляр
  return response;
};

// Хук для обновления карточки
export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlant,
    onSuccess: () => {
      // После успешного обновления инвалидируем кэш, чтобы обновить данные
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};
