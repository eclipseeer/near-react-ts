'use client';

import { Card, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { useAccountInfo, useConnectedAccount } from 'react-near-ts';
import styles from '@/app/_components/Topbar/Topbar.module.css';

const AccountInfo = () => {
  const { connectedAccountId, isConnectedAccount } = useConnectedAccount();
  const accountInfo = useAccountInfo({ accountId: connectedAccountId });

  if (!isConnectedAccount) {
    return (
      <Card padding="xl" radius="md" withBorder>
        <Stack gap="xs">
          <Title order={3}>Account Info</Title>
          <Text c="dimmed">
            Connect your wallet to see balances and storage usage.
          </Text>
        </Stack>
      </Card>
    );
  }

  if (accountInfo.isPending) {
    return (
      <Card padding="xl" radius="md" withBorder>
        <Group gap="sm">
          <Loader size="sm" />
          <Text c="dimmed">Loading account details...</Text>
        </Group>
      </Card>
    );
  }

  if (accountInfo.isError) {
    return (
      <Card padding="xl" radius="md" withBorder>
        <Text c="red">Failed to load account info.</Text>
      </Card>
    );
  }

  const { balance, usedStorageBytes } = accountInfo.data.accountInfo;

  return (
    <Card padding="xl" radius="md" withBorder>
      <Stack>
        <Title order={3}>Account Info</Title>

        <Paper radius="md" p="xs" withBorder>
          <Text size="xs" c="dimmed">
            Account ID
          </Text>
          <Text fw={600}>{accountInfo.data.accountId}</Text>
        </Paper>

        <Paper radius="md" p="xs" withBorder>
          <Text size="xs" c="dimmed">
            Storage Used
          </Text>
          <Text fw={600}>{usedStorageBytes} bytes</Text>
        </Paper>

        <Paper radius="md" p="xs" withBorder>
          <Text size="xs" c="dimmed">
            Total Balance
          </Text>
          <Text fw={600}>{balance.total.near} NEAR</Text>
        </Paper>

        <Paper radius="md" p="xs" withBorder>
          <Text size="xs" c="dimmed">
            Available Balance
          </Text>
          <Text fw={600}>{balance.available.near} NEAR</Text>
        </Paper>

        <Paper radius="md" p="xs" withBorder>
          <Text size="xs" c="dimmed">
            Locked Balance
          </Text>
          <Text fw={600}>{balance.locked.amount.near} NEAR</Text>
        </Paper>
      </Stack>
    </Card>
  );
};

export default AccountInfo;
