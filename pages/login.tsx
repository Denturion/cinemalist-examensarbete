import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface LoginType {
	email: string;
	password: string;
}
const LoginPage = () => {
	const methods = useForm<LoginType>({ mode: 'onBlur' });

	const { logIn } = useAuth();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	const onSubmit = async (data: LoginType) => {
		try {
			await logIn(data.email, data.password);
			router.push('/');
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return (
		<div className=' container mx-auto mt-12 border-2 border-gray-400'>
			<h2 className='px-12 mt-8 text-center text-3xl font-semibold text-white'>
				Log In
			</h2>
			<FormProvider {...methods}>
				<form
					action=''
					className='w-80 mx-auto pb-12 px-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='mt-8'>
						<div className='flex items-center justify-between'>
							<label htmlFor='' className='block mb-3 font-sans text-primary'>
								Email
							</label>
						</div>

						<input
							type='email'
							{...register('email', { required: 'Email is required' })}
							className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-primary text-normal py-3 h-12 px-6 text-lg w-[50vw] flex items-center`}
						/>
						{errors.email && (
							<p className='text-danger'>{errors.email.message}</p>
						)}
					</div>
					<div className='mt-8'>
						<div className='flex items-center justify-between'>
							<label htmlFor='' className='block mb-3 font-sans text-primary'>
								Password
							</label>
						</div>

						<input
							type='password'
							{...register('password', { required: 'Password is required' })}
							className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-[50vw] flex items-center`}
						/>
						{errors.password && (
							<p className='text-danger'>{errors.password.message}</p>
						)}
					</div>

					<div className='flex justify-center pt-8'>
						<button
							type='submit'
							className={`h-12 text-center w-2/3 bg-primary border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
						>
							<p className='capitalize text-white font-normal'>submit</p>
						</button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default LoginPage;
