"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerAction } from "@server/modules/user/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const schema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  birthDate: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await registerAction(data);

      if (!result.success) {
        if (result.errors) console.error("Validation errors:", result.errors);
        if (result.message) setServerError(result.message);
        return;
      }

      const loginResult = await signIn("credentials", {
        redirect: false,
        email: result.email,
        password: result.password,
      });

      if (loginResult?.error) {
        setServerError("Error al iniciar sesión automáticamente");
        return;
      }

      setSuccess(true);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error en onSubmit:", error);
      setServerError("Error inesperado. Revisa la consola.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>

      {success ? (
        <p className="text-green-600">
          Cuenta creada con éxito. Ahora puedes iniciar sesión.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...register("name")} placeholder="Nombre" className="input" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("lastName")}
            placeholder="Apellido"
            className="input"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}

          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="input"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
            className="input"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirmar contraseña"
            className="input"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <input type="date" {...register("birthDate")} className="input" />
          {errors.birthDate && (
            <p className="text-red-500">{errors.birthDate.message}</p>
          )}

          {serverError && <p className="text-red-500">{serverError}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Registrarse
          </button>
        </form>
      )}
    </div>
  );
}
