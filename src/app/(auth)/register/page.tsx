"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerAction } from "@server/modules/user/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card } from "@shared/ui/organisms";
import { CardContent, CardFooter, CardHeader } from "@shared/ui/molecules";
import {
  Button,
  CardDescription,
  CardTitle,
  Input,
  Label,
} from "@shared/ui/atoms";
import { Calendar, LockKeyhole, Mail, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@shared/lib/utils";

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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

      router.push("/dashboard");
    } catch (error) {
      console.error("Error en onSubmit:", error);
      setServerError("Error inesperado. Revisa la consola.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
          <CardDescription>Ingresa tus datos para registrarte</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Nombre"
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    {...register("name")}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  placeholder="Apellido"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  {...register("lastName")}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de nacimiento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground " />
                <Input
                  id="birthDate"
                  type="date"
                  autoComplete="bday"
                  className={cn(
                    "pl-10 bg-gray-700 border-gray-600 text-white",
                    "[appearance:textfield] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-inner-spin-button]:appearance-none"
                  )}
                  {...register("birthDate")}
                  required
                />
                {errors.birthDate && (
                  <p className="text-red-500">{errors.birthDate.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="bg-gray-700 border-gray-600 text-white"
                {...register("confirmPassword")}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            {serverError && <p className="text-red-500">{serverError}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-white hover:bg-amber-50 text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
            <div className="text-center text-sm text-white">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-white hover:underline font-bold"
              >
                Iniciar sesión
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
