import { useContext, useState } from 'react';
import Layout from '../../Components/Layout';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';


function SignIn() {

  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');

  // Account 
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  //Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  function renderLogIn() {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link
          to="/">
          <button
            className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
            disabled={!hasUserAccount}
          >
            Log In
          </button>
        </Link>
        <div className='text-center'>
          <a
            className='font-light text-xs underline underline-offset-4'
            href="/">Forgot my password</a>
        </div>
        <button
          className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'
          disabled={hasUserAccount}
          onClick={() => setView('create-user-info')}
        >
          Sign up
        </button>
      </div>
    )
  };

  function renderCreateUserInfo() {
    return (
      <div>
        <h1 className='font-medium text-xl text-center mb-6 w-80'>Create your User</h1>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <input
            className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
            type="text"
            placeholder='Write your email' />
        </p>

        <p>
          <span className='font-light text-sm'>Password: </span>
          <input
            className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
            type="text"
            placeholder='write your password'
          />
        </p>
        <button
          className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
        >Create User</button>
      </div>
    )
  };

  const renderSignInView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn();

  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome</h1>
      {renderSignInView()}
    </Layout>
  )
}

export default SignIn
