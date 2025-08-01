import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import userService from "@/services/userService"
import { setUser } from "@/reducers/userReducer"
import { setNotification } from "@/reducers/notificationReducer"
import keyManager from "@/utils/keyManager"
import { User } from "@/types"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { ModeToggle } from "./mode-toggle"


const SignUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 3 characters."
  }),
  email: z.string().email({ 
    message: "Invalid email format" 
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  }),
  passwordConf: z.string()
}).refine((data) => data.password === data.passwordConf, {
  message: "Passwords do not match!",
  path: ["passwordConf"]
});

const LoginSchema = z.object({
  username: z.string(),
  password: z.string()
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRedux = useSelector(({ user }: { user: User }): User => user);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    console.log("user logged in: ", userRedux);
  }, [userRedux])

  const signupForm = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConf: ""
    }
  })

  const loginForm = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const handleSignUp = async (userData: z.infer<typeof SignUpSchema>) => {
    const response: object = await userService.signUp(userData);
    if ('username' in response) {
      await (userService.login(userData.password, userData.username));
    }
    if ('error' in response) {
      dispatch(setNotification({
        type: 'destructive',
        title: 'Error',
        description: response.error as string
      }));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    }
  }

  const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    const response = await userService.login(data.password, data.username);
    if ('user' in response && 'id' in response) {
      const userToLogin: User = { user: response.user as string, id: response.id as number };

      dispatch(setUser(userToLogin));
      keyManager.setMasterKey(response.masterKey as CryptoKey);

      navigate('/');

      dispatch(setNotification({
        type: 'default',
        title: 'Success',
        description: `Logged in as ${response.user}`
      }));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    } else if ('error' in response) {
      dispatch(setNotification({
        type: 'destructive',
        title: 'Error',
        description: response.error
      }));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
      <div id="user-screen">
        <h1 id="splash">inland.</h1>
        <hr />
        {isSignUp === true && (
          <section className="login-or-signup-form">
            <p className="form-title">Sign up</p>
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignUp)} className="w-2/3 space-y-6">
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input minLength={3} placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email"  placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" minLength={8} placeholder="Password, min 8 characters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="passwordConf"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" minLength={8} placeholder="Password confirmation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Sign up</Button>
              </form>
            </Form>
            <br />
            <p className="form-footer">or if you already have an account, <a className="footer-link" onClick={() => setIsSignUp(false)}><u>login</u></a>.</p>
          </section>
        )}
        {isSignUp === false && (
          <section className="login-or-signup-form">
            <p className="form-title">Login</p>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="w-2/3 space-y-6">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input minLength={3} placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" minLength={8} placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Login</Button>
              </form>
            </Form>
            <p className="form-footer">or if you do not have an account, <a className="footer-link" onClick={() => setIsSignUp(true)}><u>create one now</u></a>.</p>
          </section>
        )}
      </div>
      <section style={{ padding: "15px", position: "absolute", right: "0px" }}>
        <ModeToggle />
      </section>
      </div>
    </>
  )
}

export default Login;
