"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  //   useEffect(() => {
  //     if (status === "authenticated") {
  //       router.replace("/dashboard");
  //     }
  //   }, [status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setServerError("Email o contraseña incorrectos");
      return;
    }

    router.replace("/dashboard");
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="input"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password")}
          className="input"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {serverError && <p className="text-red-500">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-4">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-blue-600 underline"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}
