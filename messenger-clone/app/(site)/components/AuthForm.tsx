'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/input";
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      // Axios Register
    }

    if (variant === 'LOGIN') {
      // NextAuth SignIn
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social Sign In
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input id="name"  label="Name" errors={errors} register={register} />
          )}

        <Input id="email" type="email"  label="Email address" errors={errors} register={register} />

        <Input id="password" type="password" label="Password" errors={errors} register={register} />

        <div>
          <Button disabled={isLoading} fullWidth type="submit" onClick={() => {}}>
            {variant === "LOGIN" ? "Sign in": "Register"}
          </Button>
        </div>
        </form>

        <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" />
              {/* 49min */}
              <div />

            </div>
        </div>
      </div>

    </div>
  )
}

export default AuthForm