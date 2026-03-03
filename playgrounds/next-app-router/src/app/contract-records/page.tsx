'use client';

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import {
  functionCall,
  useConnectedAccount,
  useContractReadFunction,
  useExecuteTransaction,
} from 'react-near-ts';
import styles from '@/app/_components/Topbar/Topbar.module.css';

const CONTRACT_ACCOUNT_ID = 'react-near-ts.lantstool.testnet';

const ContractRecords = () => {
  const { isConnectedAccount } = useConnectedAccount();
  const [recordInput, setRecordInput] = useState('');
  const records = useContractReadFunction({
    contractAccountId: CONTRACT_ACCOUNT_ID,
    functionName: 'get_records',
  });
  const addRecordMutation = useExecuteTransaction();
  const removeRecordMutation = useExecuteTransaction();

  const addRecord = () => {
    if (!recordInput.trim()) return;
    addRecordMutation.mutate(
      {
        intent: {
          action: functionCall({
            functionName: 'add_record',
            functionArgs: { record: recordInput.trim() },
            gasLimit: { teraGas: '10' },
          }),
          receiverAccountId: CONTRACT_ACCOUNT_ID,
        },
        query: { invalidateKeys: ['callContractReadFunction'] },
      },
      {
        onSuccess: () => setRecordInput(''),
      },
    );
  };

  const removeRecord = (index: number) => {
    removeRecordMutation.mutate({
      intent: {
        action: functionCall({
          functionName: 'remove_record',
          functionArgs: { index },
          gasLimit: { teraGas: '10' },
        }),
        receiverAccountId: CONTRACT_ACCOUNT_ID,
      },
      query: { invalidateKeys: ['callContractReadFunction'] },
    });
  };

  return (
    <Card padding="xl" radius="lg" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={3}>Contract Records</Title>
            <Text size="sm" c="dimmed">
              Reading from {CONTRACT_ACCOUNT_ID}.
            </Text>
          </div>
          <Badge variant="light" color="teal">
            {records.data?.result ? (records.data.result as any[]).length : 0}
          </Badge>
        </Group>
        <Divider />
        {records.isPending && (
          <Group gap="sm">
            <Loader size="sm" />
            <Text c="dimmed">Loading records...</Text>
          </Group>
        )}
        {records.isError && (
          <Text c="red">Failed to load contract records.</Text>
        )}
        {!records.isPending && !records.isError && (
          <Stack gap="xs">
            {(records.data.result as any[]).map((record, index) => (
              <Paper key={`${record}-${index}`} p="sm" radius="md" withBorder>
                <Group justify="space-between" align="center">
                  <Text>
                    #{index + 1}. {record}
                  </Text>
                  {isConnectedAccount && (
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => removeRecord(index)}
                      loading={removeRecordMutation.isPending}
                      aria-label="Remove record"
                    >
                      ×
                    </ActionIcon>
                  )}
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
        {isConnectedAccount ? (
          <Group align="flex-end">
            <TextInput
              label="New record"
              placeholder="Enter record text"
              value={recordInput}
              onChange={(event) => setRecordInput(event.currentTarget.value)}
              className={styles.recordInput}
            />
            <Button
              onClick={addRecord}
              disabled={!recordInput.trim()}
              loading={addRecordMutation.isPending}
            >
              Add
            </Button>
          </Group>
        ) : (
          <Text size="sm" c="dimmed">
            Connect your wallet to add or remove records.
          </Text>
        )}
        {addRecordMutation.isError && (
          <Text size="sm" c="red">
            {addRecordMutation.error.message}
          </Text>
        )}
        {removeRecordMutation.isError && (
          <Text size="sm" c="red">
            {removeRecordMutation.error.message}
          </Text>
        )}
      </Stack>
    </Card>
  );
};

export default ContractRecords;
