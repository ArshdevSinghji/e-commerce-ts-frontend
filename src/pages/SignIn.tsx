import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { SignInSchema, type TSignInFormSchema } from '../services/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useAppSelector } from '../redux/hooks'
import style from '../styles/Auth.module.css'

const SignIn = () => {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user)

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<TSignInFormSchema>({
        resolver: zodResolver(SignInSchema)
    })

    const registerUser = async (data : TSignInFormSchema) => {
        await new Promise((resolve, reject) => {
          if(user?.username === data.username && 
              user?.email === data.email && 
              user?.password === data.password
          ) {
            resolve(true)
          }
          reject(new Error("credentials don't match!"))
        })

        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

  return (
    <div className={style.authContainer}>
            <form onSubmit={handleSubmit(async (data) => {
              try {
                await toast.promise(
                  registerUser(data),
                  {
                    pending: "Signing...",
                    success: "Successfully signed in!",
                    error: "Credentials Don't Match!"
                  }
                );
                reset();
                navigate("/home");
              } catch (e) {
                console.error(e);
                toast.error("Credentials don't match!");
              }
            })}>
            <p>put in your credentials</p>

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

            <input
                disabled = {isSubmitting}
                type="submit" value="sign in"/>

            <p>don't have an account? <Link to={"/signup"}>sign up</Link></p>
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

export default SignIn
