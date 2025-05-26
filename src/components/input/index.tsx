import type { RegisterOptions, UseFormRegister } from "react-hook-form";


interface InputProps{
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}


const Input = ({name, placeholder, type, register, rules, error}: InputProps) => {
  return (
    <div>
      <input 
        className="w-full border-1 border-slate-300 rounded-md h-11 px-2"
        type={type} 
        placeholder={placeholder} 
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="my-1 text-red-400">{error}</p>}
    </div>
  )
}

export default Input