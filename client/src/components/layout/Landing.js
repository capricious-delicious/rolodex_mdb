import React from 'react';
import { Link } from 'react-router-dom';
import { Pane } from 'evergreen-ui';

export const Landing = () => {
  return (
    <section className='landing'>
      <Pane>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>RDex</h1>
            <p className='lead'>
              Keep track of your contacts and never let a relationship go stale.
            </p>
            <div className='buttons'>
              <Link to='register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link to='login' className='btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </Pane>
    </section>
  );
};
