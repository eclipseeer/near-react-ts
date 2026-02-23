import { Button } from '@mantine/core';
import cn from './Main.module.css';
import { useState } from 'react';
import { AccountCard } from './AccountCard/AccountCard.tsx';
import { SendNearTokens } from './SendNearTokens/SendNearTokens.tsx';

const NavButton = ({ title, value, setActiveTab, activeTab }: any) => {
  const isActive = activeTab === value;
  return (
    <Button
      color="blue"
      variant={isActive ? 'outline' : 'subtle'}
      fullWidth
      radius={8}
      onClick={() => setActiveTab(value)}
    >
      {title}
    </Button>
  );
};

export const Main = () => {
  const [activeTab, setActiveTab] = useState('send-near-tokens');

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
          title="Send Near Tokens"
          value="send-near-tokens"
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>
      <div className={cn.content}>
        {activeTab === 'selected-account' && <AccountCard />}
        {activeTab === 'send-near-tokens' && <SendNearTokens />}
      </div>
    </div>
  );
};
