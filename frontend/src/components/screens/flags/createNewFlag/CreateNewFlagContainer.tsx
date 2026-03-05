import { useForm } from "react-hook-form";
import CreateNewFlagForm from "./CreateNewFlagForm";
import { newFlagSchema, type NewFlagFormData } from "@/schemas/newFlagSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateNewFlagContainer = () => {
  const isLoading = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewFlagFormData>({
    resolver: zodResolver(newFlagSchema),
  });

  const onSubmit = (data: NewFlagFormData) => {
    console.log(data);
  };

  return (
    <CreateNewFlagForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={isLoading}
    />
  );
};

export default CreateNewFlagContainer;
