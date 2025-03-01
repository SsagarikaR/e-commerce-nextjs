"use client"
import React, { useState } from 'react';
import { signinUserAction } from '@/actions/signinAction';
import { unAuthorizedPostRequest} from '@/services/reqServices/unAuthorizedRequest';
import { redirect } from 'next/navigation'
import Input from './Input';

function SignInForm() {
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
      }>({
        email: '',
        password: '',
      });
    
      const [errors, setErrors] = useState<{
        email: string;
        password: string;
      }>({
        email: '',
        password: '',
      });
    
      const [successMsg, setSuccessMsg] = useState('');
    
      const inputField = [
        { id: 'email', field: 'Email', type: 'text' },
        { id: 'password', field: 'Password', type: 'password' },
      ];
    


      // Handle form submission
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const result = await signinUserAction(form);
    
        // Handle validation errors
        if (result.errors) {
          setErrors({
            email: result.errors.email ? result.errors.email.join(' ') : '',
            password: result.errors.password ? result.errors.password.join(' ') : '',
          });
          setSuccessMsg('');
        } else if (result.success) {
          const response=await unAuthorizedPostRequest('auth/signin', formData);
          // console.log(response);
          if(response){
            setSuccessMsg(result.success);
            setErrors({ email: '', password: '' });
            redirect("/home")
          }
         
          
        }
      };
    


      // Handle input changes and validate immediately
      const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    
        const form = new FormData();
        form.set('email', formData.email);
        form.set('password', formData.password);
        form.set(name, value); 
    
        const result = await signinUserAction(form);
      //  console.log(result)
        if (result.errors) {
    
          setErrors({
            email: result.errors.email ? result.errors.email.join(' ') : '',
            password: result.errors.password ? result.errors.password.join(' ') : '',
          });
        } else {
          setErrors({ email: '', password: '' }); 
        }
      };
      
  return (
    <form className="w-full" onSubmit={handleSubmit}>
    <div className="w-full">
      {inputField.map((input) => {
        return (
          <Input
            key={input.id}
            field={input.field}
            id={input.id}
            type={input.type}
            value={formData[input.id as keyof typeof formData]}
            onChange={handleChange} 
            error={errors[input.id as keyof typeof errors]} 
          />
        );
      })}
      <button
        type="submit"
        className="w-full h-[48px] bg-blue-400 rounded-lg shadow-md text-white font-semibold text-lg  cursor-pointer"
      >
        {`Sign IN`}
      </button>
      {successMsg && <p className="text-green-500 mt-4">{successMsg}</p>}
    </div>
  </form>
  )
}

export default SignInForm
