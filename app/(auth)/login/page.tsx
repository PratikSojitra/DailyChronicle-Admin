"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInputs, loginSchema } from '@/lib/types/auth'
import { useLogin } from '@/lib/hooks/useAuthMutations'

const Login = () => {
    const { mutate: login, isPending } = useLogin();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: LoginInputs) => {
        login(data);
    }

    return (
        <div className="flex h-[calc(100vh-59px)] items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg border-muted/50 transition-all hover:border-primary/20">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">Admin Login</CardTitle>
                    <CardDescription className="text-muted-foreground/80">
                        Enter your credentials to access the admin dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                                placeholder="admin@dailychronicle.com"
                                className={errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""}
                            />
                            {errors.email && (
                                <p className="text-destructive text-xs font-medium mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                className={errors.password ? "border-destructive focus-visible:ring-destructive/20" : ""}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-destructive text-xs font-medium mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full font-semibold transition-all shadow-sm active:scale-[0.98]"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader size={18} label="Signing In..." className="flex-row gap-2 text-white" />
                            ) : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login