import axios from 'axios';

export default function Home() {
  return (
    <div className='hero p-5'>
      <form className='w-full max-w-lg'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-xs font-bold mb-2'>
              First Name
            </label>
            <input
              className='appearance-none block w-full border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-first-name'
              type='text'
              placeholder='Jane'
            ></input>
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='block uppercase tracking-wide text-xs font-bold mb-2'>
              Last Name
            </label>
            <input
              className='appearance-none block w-fullrounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='grid-last-name'
              type='text'
              placeholder='Doe'
            ></input>
          </div>

          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
