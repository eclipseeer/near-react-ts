import { Button } from '@mantine/core';
import cn from './Main.module.css';
import { useState } from 'react';
import { AccountCard } from './AccountCard/AccountCard.tsx';

const NavButton = ({ title, value, setActiveTab, activeTab }: any) => {
  const isActive = activeTab === value;
  return (
    <Button
      variant={isActive ? 'filled' : 'subtle'}
      fullWidth
      radius={8}
      onClick={() => setActiveTab(value)}
    >
      {title}
    </Button>
  );
};

export const Main = () => {
  const [activeTab, setActiveTab] = useState('selected-account');

  return (
    <div className={cn.main}>
      <div className={cn.navbar}>
        <NavButton
          title="Selected Account"
          value="selected-account"
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <NavButton
          title="Add Account"
          value="add-account"
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>
      <div className={cn.content}>
        {activeTab === 'selected-account' && <AccountCard />}
        {activeTab === 'add-account' && (
          <div className={cn.content}>Add Account</div>
        )}
      </div>
    </div>
  );
};
