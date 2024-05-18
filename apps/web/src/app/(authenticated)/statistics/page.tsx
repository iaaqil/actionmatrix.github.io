'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Statistic } from 'antd'
import {
  SmileOutlined,
  BookOutlined,
  TagOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function StatisticsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      router.push('/home')
      return
    }

    const fetchData = async () => {
      try {
        const userData = await Api.User.findOne(userId, {
          includes: ['journals', 'goals', 'focusmodes'],
        })
        setUserDetails(userData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch user data.', { variant: 'error' })
      }
    }

    fetchData()
  }, [userId, router])

  return (
    <div style={{ margin: '24px' }}>
      <Title level={2}>Your Productivity Statistics</Title>
      <Text type="secondary">
        Overview of your productivity elements including journals, goals, and
        focus modes.
      </Text>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Journals"
              value={userDetails?.journals?.length || 0}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Goals Progress"
              value={
                userDetails?.goals?.filter(goal => goal.status === 'completed')
                  .length || 0
              }
              suffix={`/ ${userDetails?.goals?.length || 0}`}
              prefix={<TagOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Focus Mode Sessions"
              value={userDetails?.focusmodes?.length || 0}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
