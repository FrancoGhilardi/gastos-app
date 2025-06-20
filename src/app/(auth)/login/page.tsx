"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  CardDescription,
  CardTitle,
  Input,
  Label,
} from "@shared/ui/atoms";
import { CardContent, CardFooter, CardHeader } from "@shared/ui/molecules";
import { Card } from "@shared/ui/organisms";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.replace("/dashboard");
  //   }
  // }, [status, router]);

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
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-gray-400">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesión..." : "Ingresar"}
            </Button>
            <div className="text-center text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-400 hover:underline"
              >
                Regístrate
              </Link>
            </div>
          </CardFooter>
          {serverError && <p className="text-red-500">{serverError}</p>}
        </form>
      </Card>
    </div>
  );
}
