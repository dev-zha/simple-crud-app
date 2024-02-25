import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { VTLoginSchema, loginSchema } from '@/validation/auth';
import { login as loginToServer } from '@/services/network/auth';
import { useAuth } from '@/hooks/useAuth';
import { AuthUser } from '@/types';

export default function LoginPage() {
  const { login: appLogin } = useAuth();
  // Hook Form
  const form = useForm<VTLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [alert, setAlert] = useState(false);

  async function onSubmit(values: VTLoginSchema) {
    const response = await loginToServer(values).catch((e) => e);

    if (!response.error) {
      setAlert(false);
      const user = response.data as AuthUser;
      appLogin(user, '/');
    } else {
      setAlert(true);
    }
  }

  return (
    <div className="w-full max-w-lg p-4 mx-auto">
      {alert && (
        <Alert className="mb-4" variant="destructive">
          <AlertTitle>Login Error!</AlertTitle>
          <AlertDescription>
            Some Error occure in login. Try Again
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your account to use our app</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit">
                Login
              </Button>
              <Button className="w-full" variant="ghost" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
