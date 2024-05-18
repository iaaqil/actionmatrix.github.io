'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, List } from 'antd'
import {
  UserOutlined,
  BookOutlined,
  AimOutlined,
  SyncOutlined,
  SmileOutlined,
  CalendarOutlined,
  EyeOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: [
          'journals',
          'goals',
          'habits',
          'hobbys',
          'schedules',
          'focusmodes',
          'hostviews',
        ],
      })
        .then(setUser)
        .catch(() =>
          enqueueSnackbar('Failed to fetch user data', { variant: 'error' }),
        )
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Dashboard</Title>
      <Text>Welcome to your productivity journal, {user?.name || 'User'}!</Text>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/journal')}>
            <Avatar size="large" icon={<BookOutlined />} />
            <Card.Meta
              title="Journals"
              description={`${user?.journals?.length || 0} entries`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/goals')}>
            <Avatar size="large" icon={<AimOutlined />} />
            <Card.Meta
              title="Goals"
              description={`${user?.goals?.length || 0} active`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/habits')}>
            <Avatar size="large" icon={<SyncOutlined />} />
            <Card.Meta
              title="Habits"
              description={`${user?.habits?.length || 0} tracking`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/hobbies')}>
            <Avatar size="large" icon={<SmileOutlined />} />
            <Card.Meta
              title="Hobbies"
              description={`${user?.hobbys?.length || 0} enjoyed`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/schedule')}>
            <Avatar size="large" icon={<CalendarOutlined />} />
            <Card.Meta title="Schedule" description="Manage your time" />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/focus-mode')}>
            <Avatar size="large" icon={<EyeOutlined />} />
            <Card.Meta title="Focus Mode" description="Stay productive" />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/host-view')}>
            <Avatar size="large" icon={<UserOutlined />} />
            <Card.Meta title="Host Views" description="Customize your view" />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
