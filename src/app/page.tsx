'use client';

import {Showcase} from '@/components/Showcase';
import {WebComponent} from '@/components/WebComponent';

const modelId = 'JGPnGQ6hosj';

const Home = () => {
  return (
    <main className='flex min-h-screen flex-col p-8'>
      {/* TODO: Avoid 2 instances loading */}
      {/* <Showcase modelId={modelId} containerClassName='showcase' className='relative w-[60rem] h-[40rem]' /> */}

      <WebComponent modelId={modelId} containerClassName='showcase' className='relative w-[60rem] h-[40rem]' />
    </main>
  );
};

export default Home;
