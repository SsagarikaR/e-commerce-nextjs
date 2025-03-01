"use client"
import Input from './Input';
import {unAuthorizedPostRequest } from '@/services/reqServices/unAuthorizedRequest';
import { useState } from 'react';
import { signupUserAction } from '@/actions/signupAction';
import { redirect } from 'next/navigation';

function SignUpForm() {
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        contact:string;
        full_name:string;
      }>({
        email: '',
        password: '',
        contact:'',
        full_name:''
      });
    
      const [errors, setErrors] = useState<{
        email: string;
        password: string;
        contact:string;
        full_name:string;
      }>({
        email: '',
        password: '',
        contact:'',
        full_name:''
      });
    
      const [successMsg, setSuccessMsg] = useState('');
    

      // Handle form submission
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const result = await signupUserAction(form);
    
        // Handle validation errors
        if (result.errors) {
          setErrors({
            email: result.errors.email ? result.errors.email.join(' ') : '',
            password: result.errors.password ? result.errors.password.join(' ') : '',
           contact: result.errors.contact ? result.errors.contact.join(' ') : '',
            full_name: result.errors.full_name? result.errors.full_name.join(' ') : '',
          });
          setSuccessMsg('');
        } else if (result.success) {
          const response=await unAuthorizedPostRequest('auth/signup', formData);
          // console.log(response);
          if(response){
            setSuccessMsg(result.success);
            setErrors({ email: '', password: '',contact:'',full_name:'' });
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
        form.set('contact', formData.contact);
        form.set('full_name', formData.full_name);
        form.set(name, value); 
    
        const result = await signupUserAction(form);
      //  console.log(result)
        if (result.errors) {
    
          setErrors({
            email: result.errors.email ? result.errors.email.join(' ') : '',
            password: result.errors.password ? result.errors.password.join(' ') : '',
            contact: result.errors.contact ? result.errors.contact.join(' ') : '',
            full_name: result.errors.full_name? result.errors.full_name.join(' ') : '',
          });
        } else {
          setErrors({ email: '', password: '',contact:'',full_name:''  }); 
        }
      };

 
    const inputField = [
        {
          id: "full_name",
          field: "Full name",
          type: "text",
        },
        {
          id: "email",
          field: "Email",
          type: "text",
        },
        {
          id: "contact",
          field: "Contact",
          type: "text",
        },
        {
          id: "password",
          field: "Password",
          type: "password",
        },
      ];
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
       type='submit'
        className="w-full h-[48px] bg-blue-400 rounded-lg shadow-md text-white font-semibold text-lg mt-4 cursor-pointer"
      >
        {`Sign Up`} 
      </button>
    </div>
  </form>
  )
}

export default SignUpForm
