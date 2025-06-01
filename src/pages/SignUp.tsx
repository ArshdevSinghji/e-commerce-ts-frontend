import { useForm } from 'react-hook-form'
import style from '../styles/Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpSchema, type TSignUpFormSchema } from '../services/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useAppDispatch } from '../redux/hooks'
import { setUser } from '../redux/auth/authSlice'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch =useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<TSignUpFormSchema>({
        resolver: zodResolver(SignUpSchema)
    })

    const registerUser = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

  return (
    <div className={style.authContainer}>
        <form onSubmit={handleSubmit( async (data) => {
            await toast.promise(
                registerUser(),
                {
                    pending: "Registering...",
                    success: "Registration successful!",
                    error: "Registration failed!"
                }
            );
            console.log(data)
            dispatch(setUser({
                username: data.username,
                email: data.email,
                password: data.password,
            }))
            reset()
            navigate("/signin")
        })}>
            <p>create a new account</p>

            <div>
                {errors.username && 
                    (<p className={style.error}>{errors.username.message}</p>)}
                <input 
                    {
                        ...register("username")
                    }
                    type = 'text' placeholder='username' aria-label='username'/>
            </div>
        
            <div>
                {errors.email &&
                    (<p className={style.error}>{errors.email.message}</p>)}
                <input 
                    {
                        ...register("email")
                    }
                    type = 'email' placeholder='emailID' aria-label='emailID'/>
            </div>        
            
            <div>
                {errors.password &&
                    (<p className={style.error}>{errors.password.message}</p>)}
                <input 
                    {
                        ...register("password")
                    }
                    type = 'password' placeholder='password' aria-label='password'/>
            </div>

            <div>
                {errors.confirmPassword &&
                    (<p className={style.error}>{errors.confirmPassword.message}</p>)}
                <input 
                    {
                        ...register("confirmPassword")
                    }
                    type = "password" placeholder='confirm password' aria-label='confirm password'/>
            </div>

            <input
                disabled = {isSubmitting}
                type="submit" value="register"/>

            <p>already have an account? <Link to={"/signin"}>sign in</Link></p>
        </form>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce} />
    </div>
  )
}

export default SignUp
