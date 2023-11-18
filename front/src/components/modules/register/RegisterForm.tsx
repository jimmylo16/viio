import {
  RegisterFormSchema,
  registerSchema,
} from "@/components/schemas/register.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosCall } from "@/infraestructure/axios";
import { BackendError } from "@/interfaces/common";
import { AxiosError } from "axios";
import { RegisterResponse } from "@/interfaces/backendResponses";
import { useGlobalState } from "@/hooks/useGlobalContext";

export const RegisterForm = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { setIsLogged, setView } = useGlobalState();

  const onSubmit = async (values: RegisterFormSchema) => {
    try {
      await axiosCall<RegisterResponse>({
        method: "post",
        endpoint: "/auth/register",
        body: values,
      });

      setIsLogged(true);
      setView("");
      window.location.reload();
    } catch (error: unknown) {
      const errorData = (error as AxiosError<BackendError>).response?.data;
      form.setError("root", { type: "value", message: errorData?.message });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-1/2 justify-center "
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 text-blue-700">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="fullName"
                  className="rounded-2xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 text-blue-700">Email</FormLabel>
              <FormControl>
                <Input placeholder="email" className="rounded-2xl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 text-blue-700">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  className="rounded-2xl"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!form.formState.isValid && <>{form.formState.errors.root?.message}</>}
        <div className="flex flex-col justify-center items-center mt-4">
          <Button type="submit" className="bg-blue-400 rounded-full w-1/2">
            {form.formState.isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
