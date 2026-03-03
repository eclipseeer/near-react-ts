'use client';

import {
  Button,
  Card,
  Group,
  NumberInput,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import {
  transfer,
  useConnectedAccount,
  useExecuteTransaction,
} from 'react-near-ts';
import styles from '@/app/_components/Topbar/Topbar.module.css';

const SendNear = () => {
  const { isConnectedAccount } = useConnectedAccount();
  const executeTransaction = useExecuteTransaction();
  const [amount, setAmount] = useState<string | number>('');
  const [unit, setUnit] = useState<'near' | 'yoctoNear'>('near');
  const [receiverAccountId, setReceiverAccountId] = useState('');

  const isFormValid =
    !!amount && Number(amount) > 0 && receiverAccountId.trim().length > 2;

  const helperText = useMemo(() => {
    if (!amount) return 'Enter the amount you want to send.';
    if (!receiverAccountId)
      return 'Provide the receiver account ID (e.g. alice.testnet).';
    return 'Ready to send your transaction.';
  }, [amount, receiverAccountId]);

  const sendTokens = () => {
    if (!isFormValid) return;

    executeTransaction.mutate({
      intent: {
        action: transfer({
          amount:
            unit === 'near'
              ? { near: String(amount) }
              : { yoctoNear: BigInt(Math.floor(Number(amount))).toString() },
        }),
        receiverAccountId: receiverAccountId.trim(),
      },
    });
  };

  return (
    <Card padding="xl" radius="lg" withBorder>
      <Stack gap="md">
        <Title order={3}>Send Tokens</Title>
        <Text c="dimmed">Transfer NEAR or yoctoNEAR in one transaction.</Text>
        <Group align="flex-end" grow>
          <NumberInput
            label="Amount"
            placeholder="0.1"
            value={amount}
            onChange={setAmount}
            min={0}
            decimalScale={unit === 'near' ? 5 : 0}
            hideControls
          />
          <SegmentedControl
            data={[
              { label: 'NEAR', value: 'near' },
              { label: 'yoctoNEAR', value: 'yoctoNear' },
            ]}
            value={unit}
            onChange={(value) => setUnit(value as 'near' | 'yoctoNear')}
          />
        </Group>
        <TextInput
          label="Receiver"
          placeholder="receiver.testnet"
          value={receiverAccountId}
          onChange={(event) => setReceiverAccountId(event.currentTarget.value)}
        />
        <Paper radius="md" p="md" className={styles.helper}>
          <Text size="sm">{helperText}</Text>
        </Paper>
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            {isConnectedAccount
              ? 'Wallet connected. Transaction will open in your wallet.'
              : 'Connect your wallet to send.'}
          </Text>
          <Button
            radius="xl"
            onClick={sendTokens}
            disabled={!isConnectedAccount || !isFormValid}
            loading={executeTransaction.isPending}
          >
            Send Tokens
          </Button>
        </Group>
        {executeTransaction.isSuccess && (
          <Paper radius="md" p="md" className={styles.success}>
            <Text size="sm">Transaction submitted successfully.</Text>
            <Text size="xs" c="dimmed">
              Hash: {executeTransaction.data.rawRpcResult.transaction.hash}
            </Text>
          </Paper>
        )}
        {executeTransaction.isError && (
          <Paper radius="md" p="md" className={styles.error}>
            <Text size="sm">{executeTransaction.error.message}</Text>
          </Paper>
        )}
      </Stack>
    </Card>
  );
};

export default SendNear;
