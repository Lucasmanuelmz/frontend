import { Outlet } from 'react-router-dom';
import DashboardHeader from '../../components/Header/header';
import { FooterPage } from '../../components/footer';
import { useEffect, useState } from 'react';
import SplashScreen from '../../components/splash';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
       setLoading(false);
    })
  })

  return (
    <div className='p-4'>
      {loading?(
        <SplashScreen/>
      ): (
        <div>
          <DashboardHeader />
          <Outlet />
          <FooterPage />
        </div>)}
       
    </div>
  );
}
