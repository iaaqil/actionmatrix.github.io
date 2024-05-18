'use client';

import { useEffect, useState } from 'react';
import { Typography, Switch, Row, Col, Card, Space } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { useAuthentication } from '@web/modules/authentication';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { Api } from '@web/domain';
import { PageLayout } from '@web/layouts/Page.layout';

export default function FocusModePage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const [focusModes, setFocusModes] = useState([]);
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchFocusModes();
    }
  }, [userId]);

  const fetchFocusModes = async () => {
    try {
      const focusModes = await Api.Focusmode.findManyByUserId(userId, {
        includes: ['user'],
      });
      setFocusModes(focusModes);
      const activeFocusMode = focusModes.find(fm => !fm.dateDeleted);
      setIsFocusModeActive(!!activeFocusMode);
    } catch (error) {
      enqueueSnackbar('Failed to fetch focus modes', { variant: 'error' });
    }
  };

  const handleToggleFocusMode = async checked => {
    setIsFocusModeActive(checked);
    if (checked) {
      try {
        await Api.Focusmode.createOneByUserId(userId, {
          lowPowerModeFlag: true,
          // Additional properties to reflect the description
          pausedApps: [], // List of apps to pause
          notificationSilenced: true, // Silencing notifications
          scheduledActivation: null, // Schedule for automatic activation
        });
        enqueueSnackbar('Focus mode activated', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to activate focus mode', { variant: 'error' });
      }
    } else {
      try {
        const activeFocusMode = focusModes.find(fm => !fm.dateDeleted);
        if (activeFocusMode) {
          await Api.Focusmode.deleteOne(activeFocusMode.id);
          enqueueSnackbar('Focus mode deactivated', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Failed to deactivate focus mode', { variant: 'error' });
      }
    }
  };

  // Additional functions to handle the new features
  const scheduleFocusMode = (days, times) => {
    // Implementation to schedule focus mode
  };

  const temporarilyExitFocusMode = () => {
    // Implementation to temporarily exit focus mode
  };

  const resumeFocusMode = () => {
    // Implementation to resume focus mode
  };

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <ThunderboltOutlined /> Focus Mode
      </Title>
      <Text type="secondary">
        Enhance your productivity by minimizing distractions.
      </Text>
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Space direction="vertical">
              <Text>Activate Focus Mode</Text>
              <Switch
                checked={isFocusModeActive}
                onChange={handleToggleFocusMode}
              />
              {/* Additional UI elements for new features */}
            </Space>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
}
